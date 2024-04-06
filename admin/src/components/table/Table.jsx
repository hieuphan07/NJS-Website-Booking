import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { useRouteLoaderData } from 'react-router-dom';

import './Table.css';

// Modify the columns for MUI-TABLE
const columns = [
	{
		field: 'id',
		headerName: 'ID',
		width: 200,
		sortable: false,
	},
	{ field: 'user', headerName: 'User', width: 200, sortable: false },
	{
		field: 'hotel',
		headerName: 'Hotel',
		width: 250,
		sortable: false,
	},
	{
		field: 'room',
		headerName: 'Room',
		type: 'number',
		width: 200,
		sortable: false,
		headerAlign: 'left',
		align: 'left',
	},
	{
		field: 'date',
		headerName: 'Date',
		width: 200,
		valueGetter: (value, row) => `${row.startDate} - ${row.endDate}`,
		sortable: false,
	},
	{
		field: 'price',
		headerName: 'Price',
		type: 'number',
		width: 90,
		sortable: false,
		headerAlign: 'left',
		align: 'left',
	},
	{
		field: 'payment',
		headerName: 'Payment Method',
		width: 150,
		sortable: false,
	},
	{
		field: 'status',
		headerName: 'Status',
		width: 90,
		sortable: false,
		cellClassName: (params) => {
			switch (params.value) {
				case 'Booked':
					return 'booked';
				case 'Checkin':
					return 'checkIn';
				case 'Checkout':
					return 'checkOut';
				default:
					break;
			}
		},
	},
];

const Table = () => {
	const { transactionsData } = useRouteLoaderData('root');

	const [rows, setRows] = useState([]);
	const [paginationModel] = useState({
		pageSize: 8,
		page: 0,
	});

	useEffect(() => {
		let dataRows = [];
		const optionDate = { year: 'numeric', month: '2-digit', day: '2-digit' };
		// Create data for table
		transactionsData.forEach((row) => {
			dataRows.push({
				id: row._id,
				hotel: row.hotelId.name,
				user: row.user.fullName,
				room: row.rooms.map((room) => {
					return room.roomNumbers.map((roomNumber) => {
						return ' ' + roomNumber;
					});
				}),
				startDate: new Intl.DateTimeFormat('en-GB', optionDate).format(
					new Date(row.startDate)
				),
				endDate: new Intl.DateTimeFormat('en-GB', optionDate).format(
					new Date(row.endDate)
				),
				price: `$${row.price}`,
				payment: row.payment,
				status: row.status,
			});
		});
		// Set data rows
		setRows(dataRows);
	}, [transactionsData]);

	return (
		<div className='table'>
			<Box
				sx={{
					height: 450,
					width: '100%',
					'& .checkIn': {
						backgroundColor: 'var(--light-green)',
						color: '#333',
					},
					'& .checkOut': {
						backgroundColor: 'var(--light-purple)',
						color: '#333',
					},
					'& .booked': {
						backgroundColor: 'var(--light-red)',
						color: '#fff',
					},
				}}
			>
				<DataGrid
					rows={rows}
					columns={columns}
					getRowHeight={() => 'auto'}
					paginationModel={paginationModel}
					initialState={{
						sorting: {
							sortModel: [{ field: 'date', sort: 'desc' }],
						},
					}}
					checkboxSelection
				/>
			</Box>
		</div>
	);
};

export default Table;

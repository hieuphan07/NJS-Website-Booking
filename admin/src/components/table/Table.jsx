import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { useLoaderData } from 'react-router-dom';

import './Table.css';

const Table = () => {
	// Modify the columns for MUI-TABLE
	const columns = [
		{
			field: 'id',
			headerName: 'ID',
			width: 150,
		},
		{ field: 'user', headerName: 'User', width: 200 },
		{ field: 'hotel', headerName: 'Hotel', width: 300 },
		{ field: 'room', headerName: 'Room', type: 'number', width: 160 },
		{
			field: 'date',
			headerName: 'Date',
			width: 180,
			valueGetter: (value, row) => `${row.startDate} - ${row.endDate}`,
		},
		{ field: 'price', headerName: 'Price', type: 'number', width: 90 },
		{ field: 'payment', headerName: 'Payment Method', width: 150 },
		{
			field: 'status',
			headerName: 'Status',
			width: 90,
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

	const data = useLoaderData();

	const [rows, setRows] = useState([]);

	useEffect(() => {
		let dataRows = [];
		const optionDate = { year: 'numeric', month: '2-digit', day: '2-digit' };
		// Create data for table
		data.forEach((row) => {
			dataRows.push({
				id: row._id,
				hotel: row.hotelId.name,
				user: row.user.fullName,
				room: row.rooms.flatMap((room) => room.roomNumbers),
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
	}, [data]);

	return (
		<div className='table'>
			<Box
				sx={{
					height: 300,
					width: '100%',
					'& .checkIn': {
						backgroundColor: 'rgba(157, 255, 118, 0.49)',
						color: '#1a3e72',
						fontWeight: '600',
					},
					'& .checkOut': {
						backgroundColor: '#b299e6',
						color: '#1a3e72',
						fontWeight: '600',
					},
					'& .booked': {
						backgroundColor: '#d47483',
						color: '#1a3e72',
						fontWeight: '600',
					},
				}}
			>
				<DataGrid
					rows={rows}
					columns={columns}
					initialState={{
						pagination: {
							paginationModel: { proom: 0, proomSize: 8 },
						},
					}}
					pageSizeOptions={[8, 100]}
					checkboxSelection
				/>
			</Box>
		</div>
	);
};

export default Table;

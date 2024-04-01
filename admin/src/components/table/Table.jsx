import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useLoaderData } from 'react-router-dom';

import './Table.css';

const Table = () => {
	// Modify the columns for MUI-TABLE
	const columns = [
		{ field: 'id', headerName: 'ID', width: 150 },
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
		{ field: 'status', headerName: 'Status', width: 90 },
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
	}, []);

	return (
		<div className='table'>
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
		</div>
	);
};

export default Table;

import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

import './Table.css';

const Table = () => {
	const columns = [
		{ field: 'id', headerName: 'ID', width: 70 },
		{ field: 'user', headerName: 'User', width: 130 },
		{ field: 'hotel', headerName: 'Hotel', width: 300 },
		{ field: 'room', headerName: 'Room', type: 'number', width: 90 },
		{ field: 'date', headerName: 'Date', type: 'date', width: 230 },
		{ field: 'price', headerName: 'Price', type: 'number', width: 90 },
		{ field: 'payment', headerName: 'Payment Method', width: 150 },
		{ field: 'status', headerName: 'Status', width: 90 },
	];

	const rows = [
		{ id: 1, hotel: 'Snow', user: 'Jon', room: 35 },
		{ id: 2, hotel: 'Lannister', user: 'Cersei', room: 42 },
		{ id: 3, hotel: 'Lannister', user: 'Jaime', room: 45 },
		{ id: 4, hotel: 'Stark', user: 'Arya', room: 16 },
		{ id: 5, hotel: 'Targaryen', user: 'Daenerys', room: null },
		{ id: 6, hotel: 'Melisandre', user: null, room: 150 },
		{ id: 7, hotel: 'Clifford', user: 'Ferrara', room: 44 },
		{ id: 8, hotel: 'Frances', user: 'Rossini', room: 36 },
		{ id: 9, hotel: 'Roxie', user: 'Harvey', room: 65 },
	];

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
				checkboxSelection
			/>
		</div>
	);
};

export default Table;

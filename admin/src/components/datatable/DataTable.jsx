import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import './DataTable.css';

const DataTable = ({ columns, list }) => {
	const location = useLocation();
	const path = location.pathname.split('/')[1];
	const navigate = useNavigate();

	// Delete data handle
	const handleDelete = async (id) => {
		try {
			const deleteConfirmation = window.confirm(
				'Are you sure to delete this item?'
			);

			if (deleteConfirmation) {
				const response = await fetch(`http://localhost:5500/${path}/${id}`, {
					method: 'DELETE',
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem('token'),
					},
				});

				// Response if try to delete booked hotel
				if (path === 'hotels') {
					if (response.status === 500) {
						return alert('Can not be deleted. (This hotel is booked)');
					}
				}

				if (!response.ok) {
					return console.log(
						'Something went wrong! Failed to fetch delete the item'
					);
				}

				console.log('Successfully deleted !!!');
				navigate(`/${path}`);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const actionColumn = [
		{
			field: 'action',
			headerName: 'Action',
			width: 200,
			sortable: false,
			renderCell: (params) => {
				return (
					<div className='cellAction'>
						<Link to={`${params.row._id}`} style={{ textDecoration: 'none' }}>
							<div className='viewButton'>View</div>
						</Link>
						<div
							className='deleteButton'
							onClick={() => handleDelete(params.row._id)}
						>
							Delete
						</div>
					</div>
				);
			},
		},
	];

	return (
		<div className='datatable'>
			<div className='datatableTitle'>
				{path.toUpperCase()}
				{(path === 'hotels' || path === 'rooms') && (
					<Link to={`/${path}/new`} className='link'>
						Add New
					</Link>
				)}
			</div>
			<DataGrid
				className='datagrid'
				rows={list || []}
				columns={
					path === 'hotels' || path === 'rooms'
						? columns.concat(actionColumn)
						: columns
				}
				pageSize={9}
				rowsPerPageOptions={[9]}
				checkboxSelection
				getRowId={(row) => row._id}
				disableRowSelectionOnClick
			/>
		</div>
	);
};

export default DataTable;

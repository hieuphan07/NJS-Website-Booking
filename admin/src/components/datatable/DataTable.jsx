import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useLocation } from 'react-router-dom';

import './DataTable.css';

const DataTable = ({ columns, list }) => {
	const location = useLocation();
	const path = location.pathname.split('/')[1];

	// Delete data handle
	const handleDelete = async () => {};

	const actionColumn = [
		{
			field: 'action',
			headerName: 'Action',
			width: 200,
			sortable: false,
			renderCell: (params) => {
				return (
					<div className='cellAction'>
						<Link to='/users/test' style={{ textDecoration: 'none' }}>
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
				<Link to={`/${path}/new`} className='link'>
					Add New
				</Link>
			</div>
			<DataGrid
				className='datagrid'
				rows={list || []}
				columns={columns.concat(actionColumn)}
				pageSize={9}
				rowsPerPageOptions={[9]}
				checkboxSelection
				getRowId={(row) => row._id}
			/>
		</div>
	);
};

export default DataTable;

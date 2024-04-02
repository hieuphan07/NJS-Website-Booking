import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import DataTable from '../../datatable/DataTable';

import './Users.css';

const Users = ({ columns }) => {
	const data = useLoaderData();
	const [list, setList] = useState([]);

	useEffect(() => {
		let dataRow = [];
		data.forEach((row) => {
			dataRow.push({
				_id: row._id,
				user: row.username,
				email: row.email,
				fullname: row.fullName,
				phone: row.phoneNumber,
			});
		});
		setList(dataRow);
	}, [data]);
	return (
		<div>
			<DataTable columns={columns} list={list} />
		</div>
	);
};

export default Users;

export async function loader() {
	const response = await fetch('http://localhost:5500/users');
	if (!response.ok) console.log('Something went wrong!');
	return response;
}

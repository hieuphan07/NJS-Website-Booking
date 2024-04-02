import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import DataTable from '../../datatable/DataTable';

import './Rooms.css';

const Rooms = ({ columns }) => {
	const data = useLoaderData();
	const [list, setList] = useState([]);

	useEffect(() => {
		let dataRow = [];
		data.forEach((row) => {
			dataRow.push({
				_id: row._id,
				title: row.title,
				desc: row.desc,
				price: row.price,
				maxPeople: row.maxPeople,
			});
		});
		setList(dataRow)
	}, [data]);
	return (
		<div>
			<DataTable columns={columns} list={list} />
		</div>
	);
};

export default Rooms;

export async function loader() {
	const response = await fetch('http://localhost:5500/rooms');
	if (!response.ok) console.log('Something went wrong!');
	return response;
}

import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import DataTable from '../../datatable/DataTable';

import './Hotels.css';

const Hotels = ({ columns }) => {
	const data = useLoaderData();
	const [list, setList] = useState([]);

	useEffect(() => {
		let dataRow = [];
		data.forEach((row) => {
			dataRow.push({
				_id: row._id,
				name: row.name,
				type: row.type,
				title: row.title,
				city: row.city,
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

export default Hotels;

export async function loader() {
	const response = await fetch('http://localhost:5500/hotels');
	if (!response.ok) console.log('Something went wrong!');
	return response;
}

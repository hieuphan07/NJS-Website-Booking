import React, { useState, useEffect } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import DataTable from '../../datatable/DataTable';

import './Rooms.css';

const Rooms = ({ columns }) => {
	const { roomsData } = useRouteLoaderData('root');

	const [list, setList] = useState([]);

	useEffect(() => {
		let dataRow = [];
		roomsData.forEach((row) => {
			dataRow.push({
				_id: row._id,
				title: row.title,
				desc: row.desc,
				price: row.price,
				maxPeople: row.maxPeople,
			});
		});
		setList(dataRow);
	}, [roomsData]);
	return (
		<div>
			<DataTable columns={columns} list={list} />
		</div>
	);
};

export default Rooms;

import React, { useState, useEffect } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import DataTable from '../../datatable/DataTable';

import './Hotels.css';

const Hotels = ({ columns }) => {
	const {hotelsData} = useRouteLoaderData('root');
	const [list, setList] = useState([]);

	useEffect(() => {
		let dataRow = [];
		hotelsData.forEach((row) => {
			dataRow.push({
				_id: row._id,
				name: row.name,
				type: row.type,
				title: row.title,
				city: row.city,
			});
		});
		setList(dataRow);
	}, [hotelsData]);
	return (
		<div>
			<DataTable columns={columns} list={list} />
		</div>
	);
};

export default Hotels;

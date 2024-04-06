import React from 'react';
import SideBar from '../../sidebar/SideBar';
import { Outlet } from 'react-router-dom';

import './Root.css';

const Root = () => {
	return (
		<div className='rootLayout'>
			<SideBar />
			<main>
				<hr />
				<Outlet />
			</main>
		</div>
	);
};

export default Root;

export async function loader() {
	const hotelsFetcher = () => fetch('http://localhost:5500/hotels');
	const roomsFetcher = () => fetch('http://localhost:5500/rooms');
	const transactionFetcher = () => fetch('http://localhost:5500/transactions');

	try {
		const [hotelsRes, roomsRes, transactionsRes] = await Promise.all([
			hotelsFetcher(),
			roomsFetcher(),
			transactionFetcher(),
		]);
		if (!hotelsRes.ok)
			console.log('Something went wrong! Failed to fetch hotels');
		if (!roomsRes.ok)
			console.log('Something went wrong! Failed to fetch rooms');
		if (!transactionsRes.ok)
			console.log('Something went wrong! Failed to fetch transactions');

		return {
			hotelsData: await hotelsRes.json(),
			roomsData: await roomsRes.json(),
			transactionsData: await transactionsRes.json(),
		};
	} catch (err) {
		console.log(err);
	}
}

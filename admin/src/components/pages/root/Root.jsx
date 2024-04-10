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

	try {
		const [hotelsRes, roomsRes] = await Promise.all([
			hotelsFetcher(),
			roomsFetcher(),
		]);
		if (!hotelsRes.ok)
			console.log('Something went wrong! Failed to fetch hotels');
		if (!roomsRes.ok)
			console.log('Something went wrong! Failed to fetch rooms');

		return {
			hotelsData: await hotelsRes.json(),
			roomsData: await roomsRes.json(),
		};
	} catch (err) {
		console.log(err);
	}
}

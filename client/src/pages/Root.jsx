import React from 'react';
import { Outlet } from 'react-router-dom';

import NavBar from '../components/navbar/NavBar';

export async function loader() {
	const fetchedToken = localStorage.getItem('token');
	const fetchedUser = localStorage.getItem('loginedUser');
	const fetchedExpiration = localStorage.getItem('expiration');
	const hotelsResponse = await fetch('http://localhost:5500/hotels');

	return {
		fetchedToken,
		fetchedUser,
		fetchedExpiration,
		fetchedHotels: await hotelsResponse.json(),
	};
}

const RootLayout = () => {
	return (
		<div>
			<NavBar />
			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default RootLayout;

import React from 'react';
import { Outlet } from 'react-router-dom';

import NavBar from '../components/navbar/NavBar';

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

export async function loader() {
	let fetchedToken, fetchedUser, fetchedExpiration, fetchedHotels;
	try {
		const [token, user, expiration, hotelsResponse] = await Promise.all([
			localStorage.getItem('token'),
			localStorage.getItem('loginedUser'),
			localStorage.getItem('expiration'),
			fetch('http://localhost:5500/hotels'),
		]);
		fetchedToken = token;
		fetchedUser = user;
		fetchedExpiration = expiration;

		if (!hotelsResponse.ok) {
			throw new Error(`${hotelsResponse.status} ${hotelsResponse.statusText}`);
		} else {
			fetchedHotels = await hotelsResponse.json();
		}
		return { fetchedToken, fetchedUser, fetchedExpiration, fetchedHotels };
	} catch (err) {
		throw new Error(err);
	}
}

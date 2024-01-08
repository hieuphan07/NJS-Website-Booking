import React from 'react';
import { Outlet, useRouteLoaderData } from 'react-router-dom';

import NavBar from '../components/navbar/NavBar';

const RootLayout = () => {
	const { fetchedToken } = useRouteLoaderData('root');
	return (
		<div>
			<NavBar token={fetchedToken} />
			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default RootLayout;

export async function loader() {
	let fetchedToken, fetchedHotels;
	try {
		const [token, hotelsResponse] = await Promise.all([
			localStorage.getItem('token'),
			fetch('http://localhost:5500/hotels'),
		]);
		fetchedToken = token;
		if (!hotelsResponse.ok) {
			throw new Error(`${hotelsResponse.status} ${hotelsResponse.statusText}`);
		} else {
			fetchedHotels = await hotelsResponse.json();
		}
		return { fetchedToken, fetchedHotels };
	} catch (err) {
		throw new Error(err);
	}
}

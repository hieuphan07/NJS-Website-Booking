import React from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';

import NavBar from '../components/navbar/NavBar';

const RootLayout = () => {
	const token = useLoaderData();
	return (
		<div>
			<NavBar token={token} />
			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default RootLayout;

export function loader() {
	const token = localStorage.getItem('token');

	if (!token) {
		return null;
	}

	return token;
}

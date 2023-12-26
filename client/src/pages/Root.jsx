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

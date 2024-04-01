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

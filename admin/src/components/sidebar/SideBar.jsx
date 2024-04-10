import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import StoreIcon from '@mui/icons-material/Store';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import './SideBar.css';

const SideBar = () => {
	const navigate = useNavigate();
	const logoutHandler = () => {
		localStorage.clear();
		navigate('/login');
	};

	useEffect(() => {
		const expiration = parseInt(localStorage.getItem('expiration')) * 1000;
		const now = new Date().getTime();
		const duration = expiration - now;

		setTimeout(() => {
			logoutHandler();
		}, duration);
	}, []);

	return (
		<div className='sidebar'>
			{/* Logo Admin Page */}
			<div className='top'>
				<Link to='/' style={{ textDecoration: 'none' }}>
					<span className='logo'>Admin Page</span>
				</Link>
			</div>
			<hr />
			{/* List */}
			<div className='center'>
				<ul>
					{/* MAIN */}
					<p className='title'>MAIN</p>
					<li>
						<Link to='/' style={{ textDecoration: 'none' }}>
							<DashboardIcon className='icon' />
							<span>Dashboard</span>
						</Link>
					</li>

					{/* LISTS */}
					<p className='title'>LISTS</p>
					<li>
						<Link to='users' style={{ textDecoration: 'none' }}>
							<PersonOutlineIcon className='icon' />
							<span>Users</span>
						</Link>
					</li>
					<li>
						<Link to='hotels' style={{ textDecoration: 'none' }}>
							<StoreIcon className='icon' />
							<span>Hotels</span>
						</Link>
					</li>
					<li>
						<Link to='rooms' style={{ textDecoration: 'none' }}>
							<CreditCardIcon className='icon' />
							<span>Rooms</span>
						</Link>
					</li>
					<li>
						<Link to='transactions' style={{ textDecoration: 'none' }}>
							<LocalShippingIcon className='icon' />
							<span>Transaction</span>
						</Link>
					</li>
					<p className='title'>NEW</p>
					<li>
						<StoreIcon className='icon' />
						<span>New Hotel</span>
					</li>
					<li>
						<CreditCardIcon className='icon' />
						<span>New Room</span>
					</li>

					{/* USER */}
					<p className='title'>USER</p>
					<li>
						<ExitToAppIcon className='icon' />
						<span onClick={logoutHandler}>Logout</span>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default SideBar;

import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import StoreIcon from '@mui/icons-material/Store';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import './SideBar.css';

const SideBar = () => {
	return (
		<div className='sidebar'>
			{/* Logo Admin Page */}
			<div className='top'>
				<span className='logo'>Admin Page</span>
			</div>
			<hr />
			{/* List */}
			<div className='center'>
				<ul>
					{/* MAIN */}
					<p className='title'>MAIN</p>
					<li>
						<DashboardIcon className='icon' />
						<span>Dashboard</span>
					</li>

					{/* LISTS */}
					<p className='title'>LISTS</p>
					<li>
						<PersonOutlineIcon className='icon' />
						<span>Users</span>
					</li>
					<li>
						<StoreIcon className='icon' />
						<span>Hotels</span>
					</li>
					<li>
						<CreditCardIcon className='icon' />
						<span>Rooms</span>
					</li>
					<li>
						<LocalShippingIcon className='icon' />
						<span>Transaction</span>
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
						<span>Logout</span>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default SideBar;

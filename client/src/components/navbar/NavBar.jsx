import React from 'react';
import { Link } from 'react-router-dom';
import NavBarItem from './NavBarItem';

import './NavBar.css';

const NavBar = () => {
	return (
		<div className='nav-bar'>
			<div className='nav-bar__container'>
				<span className='nav-bar__logo'>
					<Link to='/'>Booking Website</Link>
				</span>
				<div>
					<button className='nav-bar__button'>
						<Link to='/signup'>Register</Link>
					</button>
					<button className='nav-bar__button'>
						<Link to='/login'>Login</Link>
					</button>
				</div>
			</div>
			<NavBarItem />
		</div>
	);
};

export default NavBar;

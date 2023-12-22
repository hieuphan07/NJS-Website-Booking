import React from 'react';
import NavBarItem from './NavBarItem';

import './NavBar.css';

const NavBar = ({ onGoToHome }) => {
	return (
		<div className='nav-bar'>
			<div className='nav-bar__container'>
				{/* Click "Booking Website" logo to go to Home page */}
				<span className='nav-bar__logo' onClick={onGoToHome}>
					Booking Website
				</span>
				<div>
					<button className='nav-bar__button'>Register</button>
					<button className='nav-bar__button'>Login</button>
				</div>
			</div>
			<NavBarItem />
		</div>
	);
};

export default NavBar;

import React from 'react';
import navBar from '../../data/navBar.json';

import './NavBarItem.css';

const NavBarItem = () => {
	return (
		<div className='nav-items'>
			<div className='nav-items__container'>
				{/* Render navBar items from given data */}
				{navBar.map((curr, index) => (
					<div
						className={`nav-items__item${curr.active ? ' active' : ''}`}
						key={index}
					>
						<i className={curr.icon}></i>
						<span>{curr.type}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default NavBarItem;

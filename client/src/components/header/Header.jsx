import React from 'react';
import HeaderSearch from './HeaderSearch';

import './Header.css';

const Header = () => {
	return (
		<div className='header'>
			<div className='header__container'>
				<h1 className='header__title'>A lifetime of discounts? It's Genius</h1>
				<p className='header__description'>
					Get rewarded for your travels - unlock unstant saving of 10% or more
					with a free account
				</p>
				<button className='header__button'>Sign in / Register</button>
			</div>
			<HeaderSearch />
		</div>
	);
};

export default Header;

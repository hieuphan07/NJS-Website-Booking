import React, { useState, useEffect } from 'react';
import { Link, useRouteLoaderData } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux-store/features/auth/authSlice';

import NavBarItem from './NavBarItem';

import './NavBar.css';

const NavBar = () => {
	const data = useRouteLoaderData('root');

	const [authToken, setAuthToken] = useState('');
	const [loginEmail, setLoginEmail] = useState('');

	const dispatch = useDispatch();
	const logoutHandler = () => {
		dispatch(logout());
		setAuthToken('');
	};

	useEffect(() => {
		if (data.fetchedToken) setAuthToken(data.fetchedToken);
		if (data.fetchedUser) setLoginEmail(data.fetchedUser);
	}, [data.fetchedToken, data.fetchedUser]);

	return (
		<div className='nav-bar'>
			<div className='nav-bar__container'>
				<span className='nav-bar__logo'>
					<Link to='/'>Booking Website</Link>
				</span>
				{!authToken && (
					<div>
						<button className='nav-bar__button'>
							<Link to='/signup'>Register</Link>
						</button>
						<button className='nav-bar__button'>
							<Link to='/login'>Login</Link>
						</button>
					</div>
				)}
				{authToken && (
					<div>
						<span>{loginEmail}</span>
						<button className='nav-bar__button'>
							<Link to='/transaction'>Transactions</Link>
						</button>
						<button className='nav-bar__button' onClick={logoutHandler}>
							<Link>Logout</Link>
						</button>
					</div>
				)}
			</div>
			<NavBarItem />
		</div>
	);
};

export default NavBar;

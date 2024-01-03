import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux-store/features/auth/authSlice';

import NavBarItem from './NavBarItem';

import './NavBar.css';

const NavBar = ({ token }) => {
	const [authToken, setAuthToken] = useState('');
	const [loginEmail, setLoginEmail] = useState('');
	const dispatch = useDispatch();
	const logoutHandler = () => {
		dispatch(logout());
		setAuthToken('');
	};

	useEffect(() => {
		setAuthToken(token);
		const fetchUser = async () => {
			const response = await fetch('http://localhost:5500/login', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const user = await response.json();
			return setLoginEmail(user.email);
		};
		if (token) {
			fetchUser();
		}
	}, [token]);

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
							<Link>Transactions</Link>
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

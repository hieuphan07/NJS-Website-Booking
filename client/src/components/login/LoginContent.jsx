import React from 'react';

import './LoginContent.css';

const LoginContent = () => {
	return (
		<div className='login-container'>
			<h1>Login</h1>
			<form>
				<input placeholder='Email' type='text' />
				<input placeholder='Password' type='password' />
				<button>Login</button>
			</form>
		</div>
	);
};

export default LoginContent;

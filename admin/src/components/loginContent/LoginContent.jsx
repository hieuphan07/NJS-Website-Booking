import React from 'react';
import { Form, redirect, useActionData } from 'react-router-dom';

import './LoginContent.css';

const LoginContent = () => {
	const data = useActionData();
	return (
		<div className='login-container'>
			<h1>Login</h1>
			<Form method='post'>
				<label>
					Email <br />
					<input
						name='email'
						type='text'
						placeholder='Enter your email'
						required
						defaultValue='test01@test.com'
					/>
				</label>
				<label>
					Password <br />
					<input
						name='password'
						type='password'
						placeholder='Enter your password'
						required
						defaultValue='Phathahi1405'
					/>
				</label>
				{data && data.errors && (
					<div className='error-message'>
						{Object.values(data.errors).map((error) => {
							return <li key={error}>{error}</li>;
						})}
					</div>
				)}
				<button>Login</button>
			</Form>
		</div>
	);
};

export default LoginContent;

export async function action({ request }) {
	const data = await request.formData();

	const enteredEmail = data.get('email');
	const enteredPassword = data.get('password');

	const enteredUser = { email: enteredEmail, password: enteredPassword };

	const response = await fetch('http://localhost:5500/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(enteredUser),
	});
	if (response.status === 422) {
		return response;
	}
	if (!response.ok) {
		console.log('Something went wrong!');
	}

	const resData = await response.json();
	const { token, expiration, user } = resData;

	localStorage.setItem('token', token);
	localStorage.setItem('expiration', expiration);
	localStorage.setItem('loginedUser', user.email);

	return redirect('/');
}

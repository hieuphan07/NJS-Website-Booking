import React from 'react';
import { Form, redirect, useActionData } from 'react-router-dom';

import './LoginContent.css';

const LoginContent = () => {
	const data = useActionData();
	console.log(data);

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
					/>
				</label>
				<label>
					Password <br />
					<input
						name='password'
						type='password'
						placeholder='Enter your password'
						required
					/>
				</label>
				<button>Login</button>
			</Form>
		</div>
	);
};

export default LoginContent;

export async function action({ request, params }) {
	const data = await request.formData();
	const enteredEmail = data.get('email');
	const enteredPassword = data.get('password');
	const enteredUser = {
		email: enteredEmail,
		password: enteredPassword,
	};
	const response = await fetch('http://localhost:5500/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(enteredUser),
	});
	if (!response.ok) console.log('Something went wrong');
	if (response.status === 422) {
		return response;
	}
	const resData = await response.json();
	const token = resData.token;
	localStorage.setItem('token', token);
	return redirect('/');
}

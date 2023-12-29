import React from 'react';
import { Form, redirect, useActionData } from 'react-router-dom';

import './SignupContent.css';

const SignupContent = () => {
	const data = useActionData();

	return (
		<div>
			<div className='signup-container'>
				<h1>Sign Up</h1>
				<Form method='post'>
					<div className='row-1'>
						<label>
							First name <br />
							<input
								name='firstName'
								type='text'
								placeholder='Enter your first name'
								required
							/>
						</label>
						<label>
							Last name <br />
							<input
								name='lastName'
								type='text'
								placeholder='Enter your last name'
								required
							/>
						</label>
					</div>
					<div className='row-2'>
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
							Phone number <br />
							<input
								name='phoneNumber'
								type='tel'
								placeholder='Enter your phone number'
								required
							/>
						</label>
					</div>
					<div className='row-3'>
						<label>
							Username <br />
							<input
								name='username'
								type='text'
								placeholder='Enter your username'
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
					</div>
					{data && data.errors && (
						<div className='error-message'>
							{Object.values(data.errors).map((error) => {
								return <li key={error}>{error}</li>;
							})}
						</div>
					)}
					<button type='submit'>Create Account</button>
				</Form>
			</div>
		</div>
	);
};

export default SignupContent;

export async function action({ request, params }) {
	const data = await request.formData();
	const user = {
		fullName: data.get('firstName') + ' ' + data.get('lastName'),
		email: data.get('email'),
		phoneNumber: data.get('phoneNumber'),
		username: data.get('username'),
		password: data.get('password'),
		isAdmin: false,
	};
	console.log(user);
	const response = await fetch('http://localhost:5500/sign-up', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	});
	if (response.status === 422) {
		return response;
	}
	if (!response.ok) {
		console.log('Something went wrong!');
	}
	const resData = await response.json();
	const token = resData.token;
	console.log(token);
	return redirect('/login');
}

import React from 'react';
import { Form, useActionData } from 'react-router-dom';

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

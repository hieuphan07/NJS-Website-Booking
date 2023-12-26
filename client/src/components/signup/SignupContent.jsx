import React from 'react';

import './SignupContent.css';

const SignupContent = () => {
	return (
		<div>
			<div className='signup-container'>
				<h1>Sign Up</h1>
				<form>
					<input placeholder='Email' type='text' />
					<input placeholder='Password' type='password' />
					<button>Create Account</button>
				</form>
			</div>
		</div>
	);
};

export default SignupContent;

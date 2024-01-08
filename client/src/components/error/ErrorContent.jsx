import React from 'react';
import NavBar from '../navbar/NavBar';
import './ErrorContent.css';

const ErrorContent = ({ error }) => {
	return (
		<>
			<NavBar />
			<h1>{error}</h1>
		</>
	);
};

export default ErrorContent;

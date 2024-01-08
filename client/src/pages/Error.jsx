import React from 'react';
import { useRouteError } from 'react-router-dom';
import ErrorContent from '../components/error/ErrorContent';

const Error = () => {
	const error = useRouteError();

	return <ErrorContent error={error.message} />;
};

export default Error;

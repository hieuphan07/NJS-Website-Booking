import { useState, useEffect } from 'react';

const useFetch = (url) => {
	const [fetchedData, setFetchedData] = useState([]);
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(url);
				if (!response.ok) throw new Error('Something went wrong!');
				const data = await response.json();
				setFetchedData(data);
			} catch (err) {
				setError(err);
			}
		};
		fetchData();
	}, [url]);

	const reFetch = async () => {
		try {
			const response = await fetch(url);
			if (!response.ok) throw new Error('Something went wrong!');
			const data = await response.json();
			setFetchedData(data);
		} catch (err) {
			setError(err);
		}
	};

	return { fetchedData, error, reFetch };
};

export default useFetch;

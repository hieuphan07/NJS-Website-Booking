import React from 'react';
import { useLoaderData } from 'react-router-dom';

import City from '../city/City';
import Type from '../type/Type';
import HotelList from '../hotelList/HotelList';

import './Features.css';

const Features = () => {
	const data = useLoaderData();

	return (
		<div className='features'>
			<div className='features__container'>
				<City />
				<Type />
				<HotelList data={data} />
			</div>
		</div>
	);
};

export default Features;

export async function loader() {
	try {
		const response = await fetch('http://localhost:5500/hotels');
		if (!response.ok) {
			throw new Error(`${response.status} ${response.statusText}`);
		}
		return response;
	} catch (err) {
		throw new Error(err);
	}
}

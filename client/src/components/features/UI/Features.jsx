import React from 'react';
import { useLoaderData } from 'react-router-dom';

import City from '../city/City';
import Type from '../type/Type';
import HotelList from '../hotelList/HotelList';

import './Features.css';

const Features = (props) => {
	const data = useLoaderData();

	return (
		<div className='features'>
			<div className='features__container'>
				<City cities={props.cities} />
				<Type types={props.types} />
				<HotelList hotelLists={props.hotelLists} />
			</div>
		</div>
	);
};

export default Features;

export async function loader() {
	const response = await fetch('http://localhost:5500/hotels');
	if (!response.ok) {
		console.log('Something went wrong!');
	}
	return response;
}

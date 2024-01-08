import React from 'react';

import City from '../city/City';
import Type from '../type/Type';
import HotelList from '../hotelList/HotelList';

import './Features.css';

const Features = () => {
	return (
		<div className='features'>
			<div className='features__container'>
				<City />
				<Type />
				<HotelList />
			</div>
		</div>
	);
};

export default Features;

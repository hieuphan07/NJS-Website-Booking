import React from 'react';
import danangImg from '../../../data-2/city-image/Da Nang.jpg';
import hanoiImg from '../../../data-2/city-image/Ha Noi.jpg';
import hcmImg from '../../../data-2/city-image/HCM.jpg';

import './City.css';

const City = ({ data }) => {
	const cityImgs = [danangImg, hanoiImg, hcmImg];
	// count property each city
	const properties = [
		{ city: 'Da Nang', count: 0 },
		{ city: 'Ha Noi', count: 0 },
		{ city: 'Ho Chi Minh', count: 0 },
	];
	data.forEach((hotel) => {
		properties.forEach((property, index) => {
			if (hotel.city === property.city) {
				properties[index].count++;
			}
		});
	});

	return (
		<div className='cities'>
			<div className='cities__container'>
				{/* Render cites from given data */}
				{properties.map((property, index) => (
					<div key={property.city} className='city'>
						<img src={cityImgs[index]} alt='city' className='city__img' />
						<div className='city__text'>
							<h3 className='city__name'>{property.city}</h3>
							<p className='city__sub-text'>{property.count}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default City;

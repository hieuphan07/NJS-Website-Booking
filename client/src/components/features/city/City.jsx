import React from 'react';
import useFetch from '../../hooks/useFetch';

import './City.css';

const City = () => {
	const { fetchedData, error } = useFetch(
		'http://localhost:5500/hotels/countByCity?cities=Da%20Nang,Ha%20Noi,Ho%20Chi%20Minh'
	);
	const cityImgs = [
		'https://hanoitourist.com.vn/images/destination/2018/11/30/original/danang_1543552135.jpeg',
		'https://dntt.mediacdn.vn/197608888129458176/2022/9/21/ho-guom-du-lich-ha-noi-ivivu-16637590508811726461079.jpg',
		'https://www.tripsavvy.com/thmb/ugtvj-nkELZnHrsozm7hyomFtmU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/traffic-on-the-road-at-front-of-ho-chi-minh-city-hall-in-ho-chi-minh-city-capital-of-vietnam-1095880968-76f846acd05f4968ba245528c3abc460.jpg',
	];
	const properties = [
		{ city: 'Da Nang', count: 0 },
		{ city: 'Ha Noi', count: 0 },
		{ city: 'Ho Chi Minh', count: 0 },
	];

	properties.forEach((prop, ind) => {
		prop.count = fetchedData[ind];
	});

	return (
		<div className='cities'>
			<div className='cities__container'>
				{fetchedData &&
					!error &&
					properties.map((property, index) => (
						<div key={property.city} className='city'>
							<img src={cityImgs[index]} alt='city' className='city__img' />
							<div className='city__text'>
								<h3 className='city__name'>{property.city}</h3>
								<p className='city__sub-text'>{property.count}</p>
							</div>
						</div>
					))}
				{error && <h1>{error}</h1>}
			</div>
		</div>
	);
};

export default City;

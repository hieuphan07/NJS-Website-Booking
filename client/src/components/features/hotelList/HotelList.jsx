import React from 'react';

import './HotelList.css';

const HotelList = ({ data }) => {
	const highRatedHotels = data
		.sort((a, b) => {
			return b.rating - a.rating;
		})
		.slice(0, 3);

	return (
		<div className='hotel-list'>
			<h2 className='hotel-list__title'>Homes guest love</h2>
			<div className='hotel-list__container'>
				{/* Render hotel list from given data */}
				{highRatedHotels.map((hotel, index) => (
					<div className='hotel-list__item' key={index}>
						<img
							src={hotel.photos[0]}
							alt='hotels'
							className='hotel-list__img'
						/>
						<div className='hotel-list__information'>
							<h3 className='hotel-list__name'>{hotel.name}</h3>
							<p className='hotel-list__city'>{hotel.city}</p>
							<p className='hotel-list__price'>{`Starting from $${hotel.cheapestPrice}`}</p>
							<div className='hotel-list__review'>
								<span className='hotel-list__rate'>{hotel.rating}</span>
								<span className='hotel-list__type'>{hotel.type}</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default HotelList;

import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import Reserve from '../../reserve/Reserve';

import './DetailPage.css';

const DetailPage = () => {
	const params = useParams();
	const hotelId = params.id;
	const { fetchedData: detailHotel, error } = useFetch(
		`http://localhost:5500/hotels/find/${hotelId}`
	);

	const reserveRef = useRef();
	const [isReserveOpen, setIsReserveOpen] = useState(false);
	const reverseOpenHandler = () => {
		setIsReserveOpen((prev) => {
			prev = !prev;
			if (prev === true) {
				setTimeout(() => {
					window.scrollTo({
						top: reserveRef.current.offsetTop,
						behavior: 'smooth',
					});
				}, 300);
			}
			return prev;
		});
	};

	return (
		<div className='detail-page'>
			{error && <h1>{error.message}</h1>}
			{!error && (
				<div className='detail-page__container'>
					{/* Detail title container */}
					<div className='detail-page__wrap-title'>
						<div className='detail-page__name-info'>
							<h3 className='detail-page__name'>{detailHotel.name}</h3>
							<span className='detail-page__adddress'>
								<i className='fa fa-map-marker'></i>
								<span>{detailHotel.address}</span>
							</span>
							<span className='detail-page__distance'>
								Excellent location - {detailHotel.distance}m from center
							</span>
							<span className='detail-page__price'>
								Book a stay over ${detailHotel.cheapestPrice} at this property
								and get a free airport taxi
							</span>
						</div>
						<button
							className='detail-page__button'
							onClick={reverseOpenHandler}
						>
							Reserve or Book Now!
						</button>
					</div>
					{/* Detail photoes container */}
					<div className='detail-page__imgs'>
						{/* Render photo gallery */}
						{detailHotel.photos?.map((curr, index) => (
							<img key={index} src={curr} alt='' className='detail-page__img' />
						))}
					</div>
					{/* Detail description container */}
					<div className='detail-page__wrap-description'>
						{/* Text description container */}
						<div className='detail-page__main-description'>
							<h4 className='detail-page__title'>{detailHotel.title}</h4>
							<p className='detail-page__description'>{detailHotel.desc}</p>
						</div>
						{/* Highlight description container */}
						<div className='detail-page__highlight-property'>
							{/* <h5 className='detail-page__highlight-choice'>
							Perfect for a 9-nights stay!
						</h5>
						<p className='detail-page__highlight-description'>
							Located in the real heart of Krakow, this property has an
							excellent location score of 9.8!
						</p> */}
							<span className='detail-page__highlight-price'>
								<strong>${detailHotel.cheapestPrice}</strong> (1 nights)
							</span>
							<button
								className='detail-page__highlight-button'
								onClick={reverseOpenHandler}
							>
								Reserve or Book Now!
							</button>
						</div>
					</div>
				</div>
			)}
			{isReserveOpen && (
				<Reserve
					ref={reserveRef}
					rooms={detailHotel.rooms}
					hotelId={detailHotel?._id}
				/>
			)}
		</div>
	);
};

export default DetailPage;

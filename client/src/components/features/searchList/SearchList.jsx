import React from 'react';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';

import './SearchList.css';

const SearchList = () => {
	const { fetchedHotels } = useRouteLoaderData('root');

	const navigate = useNavigate();
	const goToDetail = () => {
		navigate('/detail');
	};

	const freeCancel = (
		<p className='search-list__free-cancel'>
			Free cancellation
			<span>You can cancel later, so lock in this great price today!</span>
		</p>
	);

	return (
		<div className='search-list'>
			<div className='search-list__container'>
				{/* Render search result from given data */}
				{fetchedHotels.map((curr, index) => (
					<div className='search-list__wrapper' key={curr._id}>
						<img
							src={curr.photos[0]}
							alt='hotel'
							className='search-list__img'
						/>
						{/* Hotel detail container */}
						<div className='search-list__detail'>
							<h4 className='search-list__name' onClick={goToDetail}>
								{curr.title}
							</h4>
							<p className='search-list__distance'>
								{curr.distance}m from center
							</p>
							<span className='search-list__tag'>Free airport taxi</span>
							<p className='search-list__title'>{curr.title}</p>
							<p className='search-list__description'>{curr.desc}</p>
							{true && freeCancel}
						</div>
						{/* Hotel information container */}
						<div className='search-list__info'>
							<div className='search-list__review'>
								<span className='search-list__rate-text'>Excellent</span>
								<span className='search-list__rate'>{curr.rating}</span>
							</div>
							<div className='search-list__price-wrapper'>
								<p className='search-list__price'>${curr.cheapestPrice}</p>
								<p className='search-list__price-info'>
									Includes taxex and fees
								</p>
								<button className='search-list__button' onClick={goToDetail}>
									See availability
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default SearchList;

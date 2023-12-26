import React from 'react';
import danangImg from '../../../data-2/city-image/Da Nang.jpg';
import hanoiImg from '../../../data-2/city-image/Ha Noi.jpg';
import hcmImg from '../../../data-2/city-image/HCM.jpg';

import './City.css';

const City = (props) => {
	const cityImgs = [danangImg, hanoiImg, hcmImg];

	return (
		<div className='cities'>
			<div className='cities__container'>
				{/* Render cites from given data */}
				{props.cities.map((curr, index) => (
					<div key={index} className='city'>
						<img src={cityImgs[index]} alt='city' className='city__img' />
						<div className='city__text'>
							<h3 className='city__name'>{curr.name}</h3>
							<p className='city__sub-text'>{curr.subText}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default City;

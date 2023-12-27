import React from 'react';

import './Type.css';

import localType from '../../../data/type.json';

const Type = ({ data }) => {
	const typeArr = [
		{ name: 'Hotels', count: 0 },
		{ name: 'Apartments', count: 0 },
		{ name: 'Resorts', count: 0 },
		{ name: 'Villas', count: 0 },
		{ name: 'Cabins', count: 0 },
	];
	data.forEach((hotel) => {
		typeArr.forEach((type, index) => {
			if (hotel.type.toLowerCase() + 's' === type.name.toLowerCase()) {
				typeArr[index].count++;
			}
		});
	});

	return (
		<div className='types'>
			<h2 className='types-title'>Browse by property type</h2>
			<div className='types__container'>
				{/* Render properties by type from given data */}
				{typeArr.map((curr, index) => (
					<div key={index} className='type'>
						<img src={localType[index].image} alt='type' className='type-img' />
						<p className='type-name'>{curr.name}</p>
						<p className='type-count'>
							{curr.count} {curr.name.toLowerCase()}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Type;

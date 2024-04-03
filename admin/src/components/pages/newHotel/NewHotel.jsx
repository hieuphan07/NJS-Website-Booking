import React from 'react';

import './NewHotel.css';

const NewHotel = () => {
	const features = [
		{ label: 'Yes', value: true },
		{ label: 'No', value: false },
	];
	return (
		<div className='hotelForm'>
			<div className='title'>Add New Product</div>
			<form>
				<div className='top'>
					<div className='left'>
						<label htmlFor='name'>Name</label>
						<input id='name' type='text' placeholder='My Hotel' />
						<label htmlFor='city'>City</label>
						<input id='city' type='text' placeholder='Da Nang' />
						<label htmlFor='distance'>Distance From City Center</label>
						<input id='distance' type='text' placeholder='500' />
						<label htmlFor='description'>Description</label>
						<input id='description' type='text' placeholder='Description' />
						<label htmlFor='images'>Images</label>
						<input
							id='images'
							type='text'
							style={{ border: '1px solid #333' }}
						/>
					</div>
					<div className='right'>
						<label htmlFor='type'>Type</label>
						<input id='type' type='text' placeholder='Hotel' />
						<label htmlFor='address'>Address</label>
						<input
							id='address'
							type='text'
							placeholder='Vo Nguyen Giap Street, Son Tra District'
						/>
						<label htmlFor='title'>Title</label>
						<input id='title' type='text' placeholder='Title' />
						<label htmlFor='price'>Price</label>
						<input id='price' type='text' placeholder='Price' />
						<label htmlFor='featured'>Featured</label>
						<select id='featured' style={{ width: '50px', height: '30px' }}>
							{features.map((option) => (
								<option value={option.value}>{option.label}</option>
							))}
						</select>
					</div>
				</div>
				<div className='center'>
					<label htmlFor='rooms'>Rooms</label>
					<textarea id='rooms' rows='5'>
						Room 1, Room 2
					</textarea>
				</div>
				<div className='bottom'>
					<button className='btn'>Send</button>
				</div>
			</form>
		</div>
	);
};

export default NewHotel;

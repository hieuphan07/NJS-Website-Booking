import React from 'react';
import { useForm } from 'react-hook-form';

import './NewHotel.css';

const NewHotel = () => {
	const features = [
		{ label: 'Yes', value: true },
		{ label: 'No', value: false },
	];

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: 'Four Points',
		},
	});

	const onSubmit = (data) => {
		console.log(data);
	};

	console.log(errors);

	return (
		<div className='hotelForm'>
			<div className='title'>
				<h1>Add New Product</h1>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='top'>
					<div className='left'>
						{/* Hotel name */}
						<label htmlFor='name'>Name</label>
						<input
							id='name'
							type='text'
							placeholder='My Hotel'
							{...register('name', { pattern: /^[A-Za-z\s]+$/i })}
						/>
						<p>{errors.name?.message}</p>
						{/* City */}
						<label htmlFor='city'>City</label>
						<input
							id='city'
							type='text'
							placeholder='Da Nang'
							{...register('city')}
						/>
						{/* Distance */}
						<label htmlFor='distance'>Distance From City Center</label>
						<input
							id='distance'
							type='number'
							placeholder='500'
							{...register('distance')}
						/>
						{/* Description */}
						<label htmlFor='description'>Description</label>
						<input
							id='description'
							type='text'
							placeholder='Description'
							{...register('description')}
						/>
						{/* Images */}
						<label htmlFor='images'>Images</label>
						<input
							type='text'
							style={{ border: '1px solid #333' }}
							{...register('images')}
						/>
					</div>
					<div className='right'>
						{/* Type of accommodation */}
						<label htmlFor='type'>Type</label>
						<input
							id='type'
							type='text'
							placeholder='Hotel'
							{...register('type')}
						/>
						{/* Address */}
						<label htmlFor='address'>Address</label>
						<input
							id='address'
							type='text'
							placeholder='Vo Nguyen Giap Street, Son Tra District'
							{...register('address')}
						/>
						{/* Title */}
						<label htmlFor='title'>Title</label>
						<input
							id='title'
							type='text'
							placeholder='Title'
							{...register('title')}
						/>
						{/* Price */}
						<label htmlFor='price'>Price</label>
						<input
							id='price'
							type='number'
							placeholder='Price'
							{...register('price')}
						/>
						{/* Featured */}
						<label htmlFor='featured'>Featured</label>
						<select id='featured' style={{ width: '50px', height: '30px' }}>
							{features.map((option) => (
								<option value={option.value} key={option.label}>
									{option.label}
								</option>
							))}
						</select>
					</div>
				</div>
				<div className='center'>
					{/* Rooms */}
					<label htmlFor='rooms'>Rooms</label>
					<select id='rooms' multiple>
						<option value='Room 1'>Room 1</option>
						<option value='Room 2'>Room 2</option>
						<option value='Room 3'>Room 3</option>
					</select>
				</div>
				<div className='bottom'>
					<button className='btn' type='submit'>
						Send
					</button>
				</div>
			</form>
		</div>
	);
};

export default NewHotel;

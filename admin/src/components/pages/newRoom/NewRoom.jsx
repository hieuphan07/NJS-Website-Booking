import React from 'react';
import { useRouteLoaderData, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import './NewRoom.css';

const NewRoom = () => {
	const { hotelsData } = useRouteLoaderData('root');
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: '1 King Bed',
			price: '80',
			desc: 'Just steps from the beach',
			maxPeople: '2',
			roomNumbers: [],
		},
	});

	console.log(errors);

	const onSubmit = async (data) => {
		const roomNumbersArr = data.roomNumbers.split(',').map((roomNumber) => {
			return {
				number: parseInt(roomNumber.trim()),
				unavailableDates: [],
			};
		});
		const parsedRoom = { ...data, roomNumbers: roomNumbersArr };

		const response = await fetch('http://localhost:5500/rooms', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(parsedRoom),
		});
		if (!response.ok)
			return alert('Something went wrong! Failed to create new room.');

		alert('Successfully created new room!');

		return navigate('/rooms');
	};

	return (
		<div className='newRoom'>
			<div className='top'>
				<h1>Add New Room</h1>
			</div>
			<div className='center'>
				<form onSubmit={handleSubmit(onSubmit)}>
					{/* Title */}
					<div className='inputContainer'>
						<label htmlFor='title'>Title</label>
						<input
							id='title'
							type='text'
							{...register('title', { required: 'Please enter title' })}
						/>
						<p className='errors-msg'>{errors.title?.message}</p>
					</div>
					{/* Price */}
					<div className='inputContainer'>
						<label htmlFor='price'>Price</label>
						<input
							id='price'
							type='number'
							{...register('price', {
								required: 'Please enter price',
								valueAsNumber: true,
							})}
						/>
						<p className='errors-msg'>{errors.price?.message}</p>
					</div>
					{/* Description */}
					<div className='inputContainer'>
						<label htmlFor='desc'>Description</label>
						<input
							id='desc'
							type='text'
							{...register('desc', {
								required: 'Please enter description',
							})}
						/>
						<p className='errors-msg'>{errors.description?.message}</p>
					</div>
					{/* Max people */}
					<div className='inputContainer'>
						<label htmlFor='maxPeople'>Max People</label>
						<input
							id='maxPeople'
							type='number'
							{...register('maxPeople', {
								required: 'Please enter max people',
								valueAsNumber: true,
							})}
						/>
						<p className='errors-msg'>{errors.maxPeople?.message}</p>
					</div>
					{/* Room numbers */}
					<div className='inputContainer'>
						<label htmlFor='roomNumbers'>Room numbers</label>
						<textarea
							id='roomNumbers'
							placeholder='give comma between room numbers.'
							{...register('roomNumbers', {
								required: 'Please enter room numbers',
							})}
						></textarea>
						<p className='errors-msg'>{errors.roomNumbers?.message}</p>
					</div>
					{/* Hotel */}
					<div className='inputContainer'>
						<label htmlFor='hotel'>Choose a hotel</label>
						<select id='hotel' {...register('hotelId')}>
							<option value='Select hotel'>Select hotel</option>
							{hotelsData.map((hotel) => (
								<option key={hotel._id} value={hotel._id}>
									{hotel.name}
								</option>
							))}
						</select>
					</div>
					{/* Action button */}
					<button type='submit'>Send</button>
				</form>
			</div>
		</div>
	);
};

export default NewRoom;

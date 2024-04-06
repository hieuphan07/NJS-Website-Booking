import React from 'react';
import { useForm } from 'react-hook-form';

import './NewRoom.css';

const NewRoom = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: 'One King Bed',
			price: '100',
			desc: 'Free parking',
			maxPeople: '2',
			roomNumbers: [],
		},
	});

	console.log(errors);

	const onSubmit = (data) => {
		const roomNumbersArr = data.roomNumbers.split(',').map((roomNumber) => {
			return {
				number: parseInt(roomNumber.trim()),
				unavailableDates: [],
			};
		});
		console.log(roomNumbersArr);
		console.log('data', { ...data, roomNumbers: roomNumbersArr });
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
							{...register('roomNumbers')}
						></textarea>
					</div>
					{/* Hotel */}
					<div className='inputContainer'>
						<label htmlFor='hotel'>Choose a hotel</label>
						<select id='hotel'>
							<option value='hotel 1'>Hotel 1</option>
							<option value='hotel 2'>Hotel 2</option>
							<option value='hotel 3'>Hotel 3</option>
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

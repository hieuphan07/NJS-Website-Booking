import React from 'react';
import { useRouteLoaderData, useNavigate, useParams } from 'react-router-dom';
import { useFieldArray, useForm } from 'react-hook-form';

import './NewRoom.css';

const NewRoom = () => {
	const { roomId } = useParams();

	const { hotelsData } = useRouteLoaderData('root');
	const navigate = useNavigate();

	const roomIsAssignedToHotel = hotelsData.find((hotel) => {
		const existedRoomIndex = hotel.rooms.findIndex(
			(room) => room._id.toString() === roomId?.toString()
		);
		if (existedRoomIndex >= 0) {
			return hotel;
		} else {
			return null;
		}
	});

	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: !roomId
			? {
					title: '1 King Bed',
					price: '80',
					desc: 'Just steps from the beach',
					maxPeople: '2',
					roomNumbers: [],
			  }
			: async () => {
					const response = await fetch(`http://localhost:5500/rooms/${roomId}`);
					return await response.json();
			  },
	});

	const {
		fields: roomNumberFields,
		append,
		remove,
	} = useFieldArray({
		control,
		name: 'roomNumbers',
	});

	const onSubmit = async (data) => {
		if (!roomId) {
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
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
				body: JSON.stringify(parsedRoom),
			});
			if (!response.ok)
				return alert('Something went wrong! Failed to create new room.');

			alert('Successfully created new room!');

			return navigate('/rooms');
		} else {
			const response = await fetch(`http://localhost:5500/rooms/${roomId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
				body: JSON.stringify(data),
			});
			if (!response.ok) {
				return alert('Something went wrong! Failed to update the room');
			}

			alert('Successfully updated the room!');
			return navigate('/rooms');
		}
	};

	return (
		<div className='newRoom'>
			<div className='top'>
				<h1>{roomId ? 'Edit Room' : 'Add New Room'}</h1>
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
						{/* Textarea for typing the new room number while creating a new room */}
						{!roomId && (
							<textarea
								id='roomNumbers'
								placeholder='give comma between room numbers.'
								{...register('roomNumbers', {
									required: 'Please enter room numbers',
								})}
							></textarea>
						)}
						{!roomId && (
							<p className='errors-msg'>{errors.roomNumbers?.message}</p>
						)}
						{/* Room numbers list to view while editting room */}
						{roomId && (
							<ul id='roomNumbers'>
								{roomNumberFields.map((field, index) => {
									return (
										<li key={field.id}>
											<input {...register(`roomNumbers.${index}.number`)} />
											<button
												className='rm-btn'
												type='button'
												onClick={() => {
													const isConfirmed = window.confirm(
														'Are you sure to delete this item?'
													);
													if (isConfirmed) {
														remove(index);
													}
												}}
											>
												Remove
											</button>
										</li>
									);
								})}
							</ul>
						)}
						{roomId && (
							<button
								className='rn-btn'
								type='button'
								onClick={() => {
									append({
										number: 'Insert a new room number',
										unavailableDates: [],
									});
								}}
							>
								Insert more room number
							</button>
						)}
					</div>
					{/* Hotel */}
					{!roomIsAssignedToHotel && (
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
					)}
					{/* Action button */}
					<button type='submit'>Send</button>
				</form>
			</div>
		</div>
	);
};

export default NewRoom;

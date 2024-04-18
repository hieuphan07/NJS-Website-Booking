import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate, useRouteLoaderData, useParams } from 'react-router-dom';

import './NewHotel.css';

const NewHotel = () => {
	const features = [
		{ label: 'Yes', value: true },
		{ label: 'No', value: false },
	];

	const navigate = useNavigate();
	const { hotelsData, roomsData } = useRouteLoaderData('root');

	// Find room not contain to any hotel
	const filteredRooms = roomsData.filter((roomData) => {
		const exsitedHotelContainRoom = hotelsData.find((hotelData) => {
			const existedRoom = hotelData.rooms.find(
				(room) => room._id === roomData._id
			);
			return existedRoom;
		});

		if (exsitedHotelContainRoom) {
			return false;
		} else {
			return true;
		}
	});

	const [rooms, setRooms] = useState(filteredRooms);

	const { hotelId } = useParams();

	// Register fields for input form
	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: !hotelId
			? {
					name: 'Four Point by Sheraton Da Nang',
					city: 'Da Nang',
					distance: '700',
					desc: 'A 5-star hotel nestled along the picturesque beach in Da Nang City',
					photos: ['https://'],
					type: 'hotel',
					address: 'Vo Nguyen Giap Street',
					title: 'Four Points By Sheraton Da Nang',
					cheapestPrice: '80',
					featured: true,
					rooms: [],
			  } // Default value for NewHotel page
			: async () => {
					const response = await fetch(
						`http://localhost:5500/hotels/find/${hotelId}`
					);
					return await response.json();
			  }, // Fetch hotel data for DetailHotel page
	});

	const {
		fields: photoFields,
		append,
		remove,
	} = useFieldArray({ control, name: 'photos' });
	const {
		fields: roomFields,
		append: roomAppend,
		remove: roomRemove,
	} = useFieldArray({
		control,
		name: 'rooms',
	});

	// Submit handler
	const onSubmit = async (data) => {
		const parsedData = {
			...data,
			rooms: data.rooms.map((room) => room?._id),
		};

		const response = await fetch(
			`http://localhost:5500/hotels/${hotelId ? hotelId : ''}`,
			{
				method: hotelId ? 'PUT' : 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
				body: JSON.stringify(parsedData),
			}
		);
		if (!response.ok) {
			return alert(
				`Something went wrong! ${
					hotelId ? '(Failed to update hotel.)' : 'Failed to create new hotel.'
				} `
			);
		}

		alert(
			hotelId ? 'Successfully updated hotel' : 'Successfully created new hotel!'
		);
		return navigate('/hotels');
	};

	return (
		<div className='hotelForm'>
			<div className='title'>
				<h1>{hotelId ? 'Edit Hotel' : 'Add New Product'}</h1>
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
							{...register('name', { required: 'Please enter hotel name' })}
						/>
						<p className='errors-msg'>{errors.name?.message}</p>
						{/* City */}
						<label htmlFor='city'>City</label>
						<input
							id='city'
							type='text'
							placeholder='Da Nang'
							{...register('city', { required: 'Please enter city' })}
						/>
						<p className='errors-msg'>{errors.city?.message}</p>
						{/* Distance */}
						<label htmlFor='distance'>Distance From City Center</label>
						<input
							id='distance'
							type='number'
							placeholder='500'
							{...register('distance', { required: 'Please enter distance' })}
						/>
						<p className='errors-msg'>{errors.distance?.message}</p>
						{/* Description */}
						<label htmlFor='desc'>Description</label>
						<input
							id='desc'
							type='text'
							placeholder='Description'
							{...register('desc', {
								required: 'Please enter description',
							})}
						/>
						<p className='errors-msg'>{errors.description?.message}</p>
						{/* Images */}
						<label htmlFor='photos'>Images</label>
						<ul id='photos'>
							{photoFields.map((field, index) => {
								return (
									<li key={field.id}>
										<input
											{...register(`photos.${index}`)}
											style={{ border: '1px solid #333' }}
										/>
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
						<button
							className='img-btn'
							type='button'
							onClick={() => {
								append('https://');
							}}
						>
							Insert more image address
						</button>
					</div>
					<div className='right'>
						{/* Type */}
						<label htmlFor='type'>Type</label>
						<input
							id='type'
							type='text'
							placeholder='Hotel'
							{...register('type', { required: 'Please enter type' })}
						/>
						<p className='errors-msg'>{errors.type?.message}</p>
						{/* Address */}
						<label htmlFor='address'>Address</label>
						<input
							id='address'
							type='text'
							placeholder='Vo Nguyen Giap Street, Son Tra District'
							{...register('address', { required: 'Please enter address' })}
						/>
						<p className='errors-msg'>{errors.address?.message}</p>
						{/* Title */}
						<label htmlFor='title'>Title</label>
						<input
							id='title'
							type='text'
							placeholder='Title'
							{...register('title', { required: 'Please enter title' })}
						/>
						<p className='errors-msg'>{errors.title?.message}</p>
						{/* Price */}
						<label htmlFor='cheapestPrice'>Price</label>
						<input
							id='cheapestPrice'
							type='number'
							placeholder='Price'
							{...register('cheapestPrice', { required: 'Please enter price' })}
						/>
						<p className='errors-msg'>{errors.price?.message}</p>
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
					{/* Room list: if hotel contain at least a room of after adding from available room list */}
					<ul id='rooms'>
						{roomFields.map((field, index) => {
							return (
								<li key={field.id}>
									<input {...register(`rooms.${index}.title`)} />
									<button
										className='rm-btn'
										type='button'
										onClick={() => {
											const isConfirmed = window.confirm(
												'Are you sure to delete this item'
											);
											if (isConfirmed) {
												roomRemove(index);
												rooms.push(field);
												setRooms(rooms);
											}
										}}
									>
										Remove
									</button>
								</li>
							);
						})}
						{/* Unassigned rooms which are not belong to any hotel */}
						<p style={{ marginTop: '10px' }}>Unassigned rooms</p>
						{rooms.map((room, index) => (
							<li key={room?._id}>
								<input defaultValue={room?.title} />
								<button
									className='apd-btn'
									type='button'
									onClick={() => {
										roomAppend(room);
										rooms.splice(index, 1);
										setRooms(rooms);
									}}
								>
									Add
								</button>
							</li>
						))}
					</ul>
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

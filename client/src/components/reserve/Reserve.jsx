import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectDates } from '../../redux-store/features/search/searchSlice';
import { DateRange } from 'react-date-range';

import './Reserve.css';

const Reserve = React.forwardRef(({ rooms }, ref) => {
	const dates = useSelector(selectDates);
	const [state, setState] = useState([
		{
			startDate: new Date(dates[0].startDate),
			endDate: new Date(dates[0].endDate),
			key: 'selection',
		},
	]);
	const countDate = Math.round(
		(state[0].endDate - state[0].startDate) / (1000 * 3600 * 24)
	);
	const [totalBill, setTotalBill] = useState(0);
	const checkboxHandler = (roomPrice, isChecked) => {
		if (isChecked) {
			setTotalBill((prevPrice) => prevPrice + roomPrice);
		} else {
			setTotalBill((prevPrice) => prevPrice - roomPrice);
		}
	};
	const [transaction, setTransaction] = useState({
		user: '',
		hotel: '',
		room: [],
		startDate: '',
		endDate: '',
		price: 0,
		payment: 'Cash',
		status: 'Booked',
	});

	return (
		<div className='reserve-container' ref={ref}>
			{/* Date range picker */}
			<div className='date-picker'>
				<h2>Dates</h2>
				<DateRange
					editableDateInputs={true}
					onChange={(item) => setState([item.selection])}
					moveRangeOnFirstSelection={false}
					ranges={state}
				/>
			</div>

			{/* Reserve info */}
			<div className='reserve-info'>
				<h2>Reserve Info</h2>
				<form>
					<label htmlFor='fullName'>Your Full Name:</label>
					<input type='test' id='fullName' placeholder='Full Name' required />
					<label htmlFor='email'>Your Email:</label>
					<input type='email' id='email' placeholder='Email' required />
					<label htmlFor='phoneNumber'>Your Phone Number:</label>
					<input
						type='number'
						id='phoneNumber'
						placeholder='Phone Number'
						required
					/>
					<label htmlFor='cardNumber'>Your Identity Card Number:</label>
					<input
						type='number'
						id='cardNumber'
						placeholder='Card Number'
						required
					/>
				</form>
			</div>

			{/* Select room */}
			<div className='select-room'>
				<h2>Selects Room</h2>
				{(!rooms || rooms?.length === 0) && <p>No rooms available.</p>}
				{rooms?.length > 0 &&
					rooms.map((room, index) => {
						return (
							<div className='room-wrapper' key={room._id}>
								<h4 className='room__title'>{room.title}</h4>
								<div className='room__info'>
									<p className='room__desc'>{room.desc}</p>
									<p className='room__maxPeople'>
										Max people: <strong>{room.maxPeople}</strong>
									</p>
									<p className='room__price'>${room.price}</p>
								</div>
								<ul className='room__roomNumbers'>
									{room.roomNumbers.map((roomNumber, index) => {
										return (
											<li key={roomNumber._id}>
												<label htmlFor={`room${roomNumber.number}`}>
													{roomNumber.number}
												</label>
												<input
													type='checkbox'
													id={`room${roomNumber.number}`}
													name={`room${roomNumber.number}`}
													value={roomNumber.number}
													onChange={(e) =>
														checkboxHandler(room.price, e.target.checked)
													}
												/>
											</li>
										);
									})}
								</ul>
							</div>
						);
					})}
			</div>

			{/* Total bill */}
			<div className='total-bill'>
				<h2>Total Bill: ${totalBill * countDate}</h2>
				<select
					className='payment-method'
					onChange={(e) => setTransaction({ payment: e.target.value })}
				>
					<option value='Select Payment Method'>Select Payment Method</option>
					<option value='Credit Card'>Credit Card</option>
					<option value='Cash'>Cash</option>
				</select>
			</div>

			{/* Button actions */}
			<div className='action'>
				<button className='btn'>Reserve Now</button>
			</div>
		</div>
	);
});

export default Reserve;

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectDates } from '../../redux-store/features/search/searchSlice';
import { setDates } from '../../redux-store/features/search/searchSlice';
import { DateRange } from 'react-date-range';

import './Reserve.css';

const Reserve = React.forwardRef(({ rooms, hotelId }, ref) => {
	const dispatch = useDispatch();
	const dates = useSelector(selectDates);
	const [date, setDate] = useState([
		{
			startDate: new Date(dates[0].startDate),
			endDate: new Date(dates[0].endDate),
			key: 'selection',
		},
	]);
	const countDate = Math.round(
		(date[0].endDate - date[0].startDate) / (1000 * 3600 * 24)
	);

	const [totalBill, setTotalBill] = useState(0);

	const [transaction, setTransaction] = useState({
		user: '',
		hotel: hotelId,
		rooms: [],
		startDate: dates[0].startDate,
		endDate: dates[0].endDate,
		price: 0,
		payment: '',
		status: 'Booked',
	});
	console.log(transaction);

	// Handle checkbox rooms
	const selectRoomNumberHandler = (
		roomPrice,
		isChecked,
		roomId,
		roomNumber
	) => {
		if (isChecked) {
			setTotalBill((prevPrice) => {
				prevPrice = prevPrice + roomPrice;
				setTransaction({ ...transaction, price: prevPrice * countDate });
				return prevPrice;
			});
			setTransaction((prevTransaction) => {
				const roomArr = prevTransaction.rooms;
				const roomIndex = roomArr.findIndex((room) => room.roomId === roomId);

				if (roomIndex !== -1) {
					roomArr[roomIndex].roomNumbers.push(roomNumber);
				} else {
					roomArr.push({ roomId: roomId, roomNumbers: [roomNumber] });
				}

				return { ...prevTransaction, rooms: roomArr };
			});
		} else {
			setTotalBill((prevPrice) => {
				prevPrice = prevPrice - roomPrice;
				setTransaction({ ...transaction, price: prevPrice * countDate });
				return prevPrice;
			});
			setTransaction((prevTransaction) => {
				const roomArr = prevTransaction.rooms;
				const roomIndex = roomArr.findIndex((room) => room.roomId === roomId);

				if (roomArr[roomIndex].roomNumbers.length === 1) {
					roomArr.splice(roomIndex, 1);
				} else {
					const updatedRoomNumbers = roomArr[roomIndex].roomNumbers.filter(
						(currRoomNumber) => currRoomNumber !== roomNumber
					);
					roomArr[roomIndex].roomNumbers = updatedRoomNumbers;
				}

				return { ...prevTransaction, rooms: roomArr };
			});
		}
	};

	return (
		<div className='reserve-container' ref={ref}>
			{/* Date range picker */}
			<div className='date-picker'>
				<h2>Dates</h2>
				<DateRange
					editableDateInputs={true}
					moveRangeOnFirstSelection={false}
					ranges={date.map(({ startDate, endDate, key }) => ({
						startDate: new Date(startDate),
						endDate: new Date(endDate),
						key,
					}))}
					minDate={new Date()}
					onChange={(item) => {
						const newDate = {
							...item.selection,
							startDate: item.selection.startDate.getTime(),
							endDate: item.selection.endDate.getTime(),
						};
						const newCountDate = Math.round(
							(newDate.endDate - newDate.startDate) / (1000 * 3600 * 24)
						);
						setDate([newDate]);
						dispatch(setDates([newDate]));
						setTransaction({
							...transaction,
							startDate: newDate.startDate,
							endDate: newDate.endDate,
							price: totalBill * newCountDate,
						});
					}}
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
														selectRoomNumberHandler(
															room.price,
															e.target.checked,
															room._id,
															roomNumber.number
														)
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
					onChange={(e) =>
						setTransaction({ ...transaction, payment: e.target.value })
					}
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

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectDates } from '../../redux-store/features/search/searchSlice';
import { setDates } from '../../redux-store/features/search/searchSlice';
import { useNavigate } from 'react-router-dom';
import { DateRange } from 'react-date-range';

import './Reserve.css';

const Reserve = React.forwardRef(({ rooms, hotelId }, ref) => {
	const loginedUser = localStorage.getItem('loginedUser');

	const navigate = useNavigate();
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

	// Filter room numbers by selecting date
	const isRoomAvailable = (roomNumber, startDate, endDate) => {
		return !roomNumber.unavailableDates.some((unavailableDate) => {
			const unavailableStart = new Date(unavailableDate.startDate).getTime();
			const unavailableEnd = new Date(unavailableDate.endDate).getTime();
			return (
				(startDate >= unavailableStart && startDate < unavailableEnd) ||
				(endDate > unavailableStart && endDate <= unavailableEnd) ||
				(startDate <= unavailableStart && endDate >= unavailableEnd)
			);
		});
	};

	const initialRooms = rooms.map((room) => {
		return {
			...room,
			roomNumbers: room.roomNumbers.filter((roomNumber) =>
				isRoomAvailable(roomNumber, dates[0].startDate, dates[0].endDate)
			),
		};
	});

	const [filteredRooms, setFilteredRooms] = useState(initialRooms);

	const [totalBill, setTotalBill] = useState(0);

	const [transaction, setTransaction] = useState({
		user: loginedUser || '',
		contact: { fullName: '', email: '', phoneNumber: '', identityNumber: '' },
		hotelId: hotelId,
		rooms: [],
		startDate: dates[0].startDate,
		endDate: dates[0].endDate,
		price: 0,
		payment: '',
		status: 'Booked',
	});

	// Handle checkbox rooms
	const selectRoomNumberHandler = (
		roomPrice,
		isChecked,
		roomId,
		roomNumber
	) => {
		if (isChecked) {
			// Calc the total bill
			setTotalBill((prevPrice) => {
				prevPrice = prevPrice + roomPrice;
				setTransaction({ ...transaction, price: prevPrice * countDate });
				return prevPrice;
			});

			// Set room numbers
			setTransaction((prevTransaction) => {
				const roomArr = prevTransaction.rooms;
				// check exist
				const roomIndex = roomArr.findIndex((room) => room.roomId === roomId);

				// update exist
				if (roomIndex !== -1) {
					roomArr[roomIndex].roomNumbers.push(roomNumber);
				} else {
					// push new
					roomArr.push({ roomId: roomId, roomNumbers: [roomNumber] });
				}

				return { ...prevTransaction, rooms: roomArr };
			});
		} else {
			// Calc the total bill
			setTotalBill((prevPrice) => {
				prevPrice = prevPrice - roomPrice;
				setTransaction({ ...transaction, price: prevPrice * countDate });
				return prevPrice;
			});

			// Set room numbers
			setTransaction((prevTransaction) => {
				const roomArr = prevTransaction.rooms;
				// check exist index
				const roomIndex = roomArr.findIndex((room) => room.roomId === roomId);

				// remove room if no roomNumber chosen
				if (roomArr[roomIndex].roomNumbers.length === 1) {
					roomArr.splice(roomIndex, 1);
				} else {
					// remove roomNumber unchecked
					const updatedRoomNumbers = roomArr[roomIndex].roomNumbers.filter(
						(currRoomNumber) => currRoomNumber !== roomNumber
					);
					roomArr[roomIndex].roomNumbers = updatedRoomNumbers;
				}

				return { ...prevTransaction, rooms: roomArr };
			});
		}
	};

	// Check input fields valid
	const [isValid, setIsValid] = useState(false);
	useEffect(() => {
		if (
			transaction.contact.fullName !== '' &&
			transaction.contact.email !== '' &&
			transaction.contact.phoneNumber !== '' &&
			transaction.contact.identityNumber !== '' &&
			transaction.price !== 0 &&
			transaction.payment !== '' &&
			transaction.payment !== 'Select Payment Method'
		) {
			setIsValid(true);
		} else {
			setIsValid(false);
		}
	}, [
		transaction.contact.fullName,
		transaction.contact.email,
		transaction.contact.phoneNumber,
		transaction.contact.identityNumber,
		transaction.price,
		transaction.payment,
	]);

	// Modify the DateRange onChange handler to filter rooms based on the selected date
	const handleDateChange = (item) => {
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

		// Filter rooms based on the new date
		const filteredRooms = rooms.map((room) => {
			return {
				...room,
				roomNumbers: room.roomNumbers.filter((roomNumber) =>
					isRoomAvailable(roomNumber, newDate.startDate, newDate.endDate)
				),
			};
		});

		// Update the state with the filtered rooms
		setFilteredRooms(filteredRooms);
	};

	// Reserve submit
	const reserveHandler = () => {
		if (isValid) {
			fetch('http://localhost:5500/hotels/reserve', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(transaction),
			});
			navigate(`/transactions/${loginedUser}`);
		} else {
			alert('Check validation of input fields');
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
					onChange={handleDateChange}
				/>
			</div>

			{/* Reserve info */}
			<div className='reserve-info'>
				<h2>Reserve Info</h2>
				<form>
					{/* Full name */}
					<label htmlFor='fullName'>Your Full Name:</label>
					<input
						type='test'
						id='fullName'
						placeholder='Full Name'
						required
						onChange={(e) =>
							setTransaction((prev) => {
								return {
									...prev,
									contact: { ...prev.contact, fullName: e.target.value },
								};
							})
						}
					/>
					{/* Email */}
					<label htmlFor='email'>Your Email:</label>
					<input
						type='email'
						id='email'
						placeholder='Email'
						required
						onChange={(e) =>
							setTransaction((prev) => {
								return {
									...prev,
									contact: { ...prev.contact, email: e.target.value },
								};
							})
						}
					/>
					{/* Phone number */}
					<label htmlFor='phoneNumber'>Your Phone Number:</label>
					<input
						type='number'
						id='phoneNumber'
						placeholder='Phone Number'
						required
						onChange={(e) =>
							setTransaction((prev) => {
								return {
									...prev,
									contact: { ...prev.contact, phoneNumber: e.target.value },
								};
							})
						}
					/>
					{/* Identity card number */}
					<label htmlFor='cardNumber'>Your Identity Card Number:</label>
					<input
						type='number'
						id='cardNumber'
						placeholder='Card Number'
						required
						onChange={(e) =>
							setTransaction((prev) => {
								return {
									...prev,
									contact: { ...prev.contact, identityNumber: e.target.value },
								};
							})
						}
					/>
				</form>
			</div>

			{/* Select room */}
			<div className='select-room'>
				<h2>Selects Room</h2>
				{(!filteredRooms || filteredRooms?.length === 0) && (
					<p>No rooms available.</p>
				)}
				{filteredRooms?.length > 0 &&
					filteredRooms.map((room, index) => {
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
													value={roomNumber._id}
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
			<div className='action' onClick={reserveHandler}>
				<button className='btn'>Reserve Now</button>
			</div>
		</div>
	);
});

export default Reserve;

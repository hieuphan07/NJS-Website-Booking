import React, { useState, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';

import './HeaderSearch.css';
import './Header.css';

const HeaderSearch = () => {
	const navigate = useNavigate();
	const goToSearch = () => {
		navigate('/search', { state: { destination, date, optionState } });
	};

	const [date, setDate] = useState([
		{
			startDate: new Date(),
			endDate: new Date(),
			key: 'selection',
		},
	]);
	const [destination, setDestination] = useState('');

	// Reducer hanlde quantity of people and room
	const initialOptionState = {
		adult: 2,
		children: 0,
		room: 1,
	};
	const quantityReducer = (state, action) => {
		switch (action.type) {
			case 'adultIncrement':
				return { ...state, adult: state.adult + 1 };
			case 'adultDecrement':
				return { ...state, adult: state.adult === 1 ? 1 : state.adult - 1 };
			case 'childrenIncrement':
				return { ...state, children: state.children + 1 };
			case 'childrenDecrement':
				return {
					...state,
					children: state.children === 0 ? 0 : state.children - 1,
				};
			case 'roomIncrement':
				return { ...state, room: state.room + 1 };
			case 'roomDecrement':
				return { ...state, room: state.room === 1 ? 1 : state.room - 1 };
			default:
				return state;
		}
	};
	const [optionState, dispatch] = useReducer(
		quantityReducer,
		initialOptionState
	);
	const adultIncrementHandler = () => {
		dispatch({ type: 'adultIncrement' });
	};
	const adultDecrementHandler = () => {
		dispatch({ type: 'adultDecrement' });
	};
	const childrenIncrementHandler = () => {
		dispatch({ type: 'childrenIncrement' });
	};
	const childrenDecrementHandler = () => {
		dispatch({ type: 'childrenDecrement' });
	};
	const roomIncrementHandler = () => {
		dispatch({ type: 'roomIncrement' });
	};
	const roomDecrementHandler = () => {
		dispatch({ type: 'roomDecrement' });
	};

	const startDate = format(date[0].startDate, 'MM/dd/yyyy');
	const endDate = format(date[0].endDate, 'MM/dd/yyyy');

	// useState for Opening/Hiding the date range picker
	const [calendarIsOpen, setCalendarIsOpen] = useState(false);
	const [quantityIsOpen, setQuantityIsOpen] = useState(false);
	const setCalendarIsOpenHandler = () => {
		setCalendarIsOpen((prev) => !prev);
	};
	const setQuantityIsOpenHandler = () => {
		setQuantityIsOpen((prev) => !prev);
	};

	return (
		<div className='header__search'>
			<div className='header__search-item'>
				<i className='fa fa-bed'></i>
				<input
					type='text'
					name='location'
					placeholder='Where are you going?'
					value={destination}
					onChange={(e) => setDestination(e.target.value)}
				/>
			</div>

			<div className='header__search-item'>
				<i className='fa fa-calendar'></i>
				<span
					onClick={setCalendarIsOpenHandler}
				>{`${startDate} - ${endDate} `}</span>
				{/* Open/Hide date range picker */}
				{calendarIsOpen && (
					<DateRange
						className='header-search__date'
						editableDateInputs={true}
						onChange={(item) => {
							setDate([item.selection]);
						}}
						moveRangeOnFirstSelection={false}
						ranges={date}
						minDate={new Date()}
					/>
				)}
			</div>

			<div className='header__search-item'>
				<i className='fa fa-female'></i>
				<span onClick={setQuantityIsOpenHandler}>
					{optionState.adult} adult &middot; {optionState.children} children
					&middot; {optionState.room} room
				</span>

				{/* Adjust quantity */}
				{quantityIsOpen && (
					<div className='quantity-container'>
						<div className='adult-wrapper'>
							<span>Adult</span>
							<div className='quantity__action'>
								<button onClick={adultDecrementHandler}>-</button>
								<span>{optionState.adult}</span>
								<button onClick={adultIncrementHandler}>+</button>
							</div>
						</div>
						<div className='children-wrapper'>
							<span>Children</span>
							<div className='quantity__action'>
								<button onClick={childrenDecrementHandler}>-</button>
								<span>{optionState.children}</span>
								<button onClick={childrenIncrementHandler}>+</button>
							</div>
						</div>
						<div className='room-wrapper'>
							<span>Room</span>
							<div className='quantity__action'>
								<button onClick={roomDecrementHandler}>-</button>
								<span>{optionState.room}</span>
								<button onClick={roomIncrementHandler}>+</button>
							</div>
						</div>
					</div>
				)}
			</div>

			<div className='header__search-item'>
				<button onClick={goToSearch} className='header__search-button'>
					Search
				</button>
			</div>
		</div>
	);
};

export default HeaderSearch;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import {
	selectCity,
	selectDates,
	selectOptions,
} from '../../redux-store/features/search/searchSlice';
import {
	setDestination,
	setDates,
	adultIncrement,
	adultDecrement,
	childrenIncrement,
	childrenDecrement,
	roomIncrement,
	roomDecrement,
} from '../../redux-store/features/search/searchSlice';

import './HeaderSearch.css';
import './Header.css';

const HeaderSearch = () => {
	const city = useSelector(selectCity);
	const dates = useSelector(selectDates);
	const options = useSelector(selectOptions);
	const dispatch = useDispatch();

	const [date, setDate] = useState([
		{
			startDate: new Date(),
			endDate: new Date().setDate(new Date().getDate() + 1),
			key: 'selection',
		},
	]);
	const startDate = format(dates[0].startDate, 'MM/dd/yyyy');
	const endDate = format(dates[0].endDate, 'MM/dd/yyyy');

	// Openi/Hide the date range picker
	const [calendarIsOpen, setCalendarIsOpen] = useState(false);
	const [quantityIsOpen, setQuantityIsOpen] = useState(false);
	const setCalendarIsOpenHandler = () => {
		setCalendarIsOpen((prev) => !prev);
	};
	const setQuantityIsOpenHandler = () => {
		setQuantityIsOpen((prev) => !prev);
	};

	// Navigate to specific search page
	const navigate = useNavigate();
	const goToSearch = () => {
		navigate('/search', { state: { city, dates, options } });
	};

	return (
		<div className='header__search'>
			{/* Destination */}
			<div className='header__search-item'>
				<i className='fa fa-bed'></i>
				<input
					type='text'
					name='destination'
					placeholder='Where are you going?'
					value={city}
					onChange={(e) => dispatch(setDestination(e.target.value))}
				/>
			</div>

			{/* Date */}
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
							setDate([newDate]);
							dispatch(setDates([newDate]));
						}}
					/>
				)}
			</div>

			{/* Option */}
			<div className='header__search-item'>
				<i className='fa fa-female'></i>
				<span onClick={setQuantityIsOpenHandler}>
					{options.adult} adult &middot; {options.children} children &middot;{' '}
					{options.room} room
				</span>
				{/* Adjust option */}
				{quantityIsOpen && (
					<div className='quantity-container'>
						<div className='adult-wrapper'>
							<span>Adult</span>
							<div className='quantity__action'>
								<button onClick={() => dispatch(adultDecrement())}>-</button>
								<span>{options.adult}</span>
								<button onClick={() => dispatch(adultIncrement())}>+</button>
							</div>
						</div>
						<div className='children-wrapper'>
							<span>Children</span>
							<div className='quantity__action'>
								<button onClick={() => dispatch(childrenDecrement())}>-</button>
								<span>{options.children}</span>
								<button onClick={() => dispatch(childrenIncrement())}>+</button>
							</div>
						</div>
						<div className='room-wrapper'>
							<span>Room</span>
							<div className='quantity__action'>
								<button onClick={() => dispatch(roomDecrement())}>-</button>
								<span>{options.room}</span>
								<button onClick={() => dispatch(roomIncrement())}>+</button>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Button action */}
			<div className='header__search-item'>
				<button onClick={goToSearch} className='header__search-button'>
					Search
				</button>
			</div>
		</div>
	);
};

export default HeaderSearch;

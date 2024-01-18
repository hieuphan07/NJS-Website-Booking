import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	selectCity,
	selectDates,
	selectOptions,
} from '../../../redux-store/features/search/searchSlice';
import {
	setDestination,
	setDates,
	setAdultByAmount,
	setChildrenByAmount,
	setRoomByAmount,
} from '../../../redux-store/features/search/searchSlice';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';

import './SearchPopup.css';

const SearchPopup = ({ enteredCity, enteredDates, enteredOptions }) => {
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const city = useSelector(selectCity);
	const dates = useSelector(selectDates);
	const options = useSelector(selectOptions);

	const [date, setDate] = useState([
		{
			startDate: enteredDates ? enteredDates[0].startDate : new Date(),
			endDate: enteredDates ? enteredDates[0].endDate : new Date(),
			key: 'selection',
		},
	]);
	const startDate = format(dates[0].startDate, 'MM/dd/yyyy');
	const endDate = format(dates[0].endDate, 'MM/dd/yyyy');

	const [min, setMin] = useState('');
	const [max, setMax] = useState('');

	// useState for Opening/Hiding the date range picker
	const [isOpen, setIsOpen] = useState(false);
	const setIsOpenHandler = () => setIsOpen(!isOpen);

	const searchHandler = () => {
		navigate('/search', {
			state: { city, dates, options, min, max },
		});
	};

	return (
		<div className='search-popup'>
			<div className='search-popup__container'>
				<form action='' className='search-popup__form'>
					<h2>Search</h2>
					{/* Destination */}
					<div className='destination-wrapper'>
						<label htmlFor='destination' className='search-popup__label'>
							Destination
						</label>
						<br />
						<input
							type='text'
							id='destination'
							name='destination'
							placeholder={enteredCity}
							value={city}
							onChange={(e) => dispatch(setDestination(e.target.value))}
						/>
						<br />
					</div>

					{/* Check-in Date */}
					<div className='check-in-wrapper'>
						<label htmlFor='check-in' className='search-popup__label'>
							Check-in Date
						</label>
						<br />
						<input
							type='text'
							id='check-in'
							placeholder={`${format(
								enteredDates[0].startDate,
								'MM/dd/yyy'
							)} - ${format(enteredDates[0].endDate, 'MM/dd/yyy')}`}
							value={`${startDate} - ${endDate}`}
							onClick={setIsOpenHandler}
							readOnly
						/>
						{isOpen && (
							<DateRange
								className='search-popup__date'
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

					{/* Options */}
					<div className='search-popup__options'>
						<p className='search-popup__label'>Options</p>
						<div className='search-popup__option-wrapper'>
							{/* Min price */}
							<div className='search-popup__option'>
								<span className='search-popup__key'>Min price per night</span>
								<input
									type='number'
									className='search-popup__input'
									value={min}
									onChange={(e) => setMin(e.target.value)}
								/>
							</div>
							{/* Max price */}
							<div className='search-popup__option'>
								<span className='search-popup__key'>Max price per night</span>
								<input
									type='number'
									className='search-popup__input'
									value={max}
									onChange={(e) => setMax(e.target.value)}
								/>
							</div>
							{/* Number of adult */}
							<div className='search-popup__option'>
								<span className='search-popup__key'>Adult</span>
								<input
									type='number'
									min='1'
									placeholder={enteredOptions.adult}
									className='search-popup__input'
									value={options.adult}
									onChange={(e) => dispatch(setAdultByAmount(e.target.value))}
								/>
							</div>
							{/* Number of children */}
							<div className='search-popup__option'>
								<span className='search-popup__key'>Children</span>
								<input
									type='number'
									min='0'
									placeholder={enteredOptions.children}
									className='search-popup__input'
									value={options.children}
									onChange={(e) =>
										dispatch(setChildrenByAmount(e.target.value))
									}
								/>
							</div>
							{/* Number of room */}
							<div className='search-popup__option'>
								<span className='search-popup__key'>Room</span>
								<input
									type='number'
									min='1'
									placeholder={enteredOptions.room}
									className='search-popup__input'
									value={options.room}
									onChange={(e) => dispatch(setRoomByAmount(e.target.value))}
								/>
							</div>
						</div>
					</div>
					<button
						className='search-popup__button'
						type='button'
						onClick={searchHandler}
					>
						Search
					</button>
				</form>
			</div>
		</div>
	);
};

export default SearchPopup;

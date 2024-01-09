import React, { useState } from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';

import './SearchPopup.css';

const SearchPopup = ({ destination, selectedDate, option }) => {
	const [date, setDate] = useState([
		{
			startDate: selectedDate ? selectedDate[0].startDate : new Date(),
			endDate: selectedDate ? selectedDate[0].endDate : new Date(),
			key: 'selection',
		},
	]);
	const startDate = format(date[0].startDate, 'MM/dd/yyyy');
	const endDate = format(date[0].endDate, 'MM/dd/yyyy');

	// useState for Opening/Hiding the date range picker
	const [isOpen, setIsOpen] = useState(false);
	const setIsOpenHandler = () => setIsOpen(!isOpen);

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
							placeholder={destination}
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
								selectedDate[0].startDate,
								'MM/dd/yyy'
							)} - ${format(selectedDate[0].endDate, 'MM/dd/yyy')}`}
							value={`${startDate} - ${endDate}`}
							onClick={setIsOpenHandler}
							readOnly
						/>
						{isOpen && (
							<DateRange
								className='search-popup__date'
								editableDateInputs={true}
								moveRangeOnFirstSelection={false}
								ranges={date}
								onChange={(item) => {
									setDate([item.selection]);
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
								<input type='number' className='search-popup__input' />
							</div>
							{/* Max price */}
							<div className='search-popup__option'>
								<span className='search-popup__key'>Max price per night</span>
								<input type='number' className='search-popup__input' />
							</div>
							{/* Number of adult */}
							<div className='search-popup__option'>
								<span className='search-popup__key'>Adult</span>
								<input
									type='number'
									placeholder={option.adult}
									className='search-popup__input'
								/>
							</div>
							{/* Number of children */}
							<div className='search-popup__option'>
								<span className='search-popup__key'>Children</span>
								<input
									type='number'
									placeholder={option.children}
									className='search-popup__input'
								/>
							</div>
							{/* Number of room */}
							<div className='search-popup__option'>
								<span className='search-popup__key'>Room</span>
								<input
									type='number'
									placeholder={option.room}
									className='search-popup__input'
								/>
							</div>
						</div>
					</div>
					<button className='search-popup__button'>Search</button>
				</form>
			</div>
		</div>
	);
};

export default SearchPopup;

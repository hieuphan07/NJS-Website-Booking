import React from 'react';
import { useLocation } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

import Register from '../components/features/register/Register';
import Footer from '../components/footer/Footer';
import SearchPopup from '../components/features/searchPopup/SearchPopup';
import SearchList from '../components/features/searchList/SearchList';

import './Search.css';

const Search = () => {
	const location = useLocation();

	const enteredCity = location.state.city;
	const enteredDates = location.state.dates;
	const enteredStartDate = enteredDates[0].startDate;
	const enteredEndDate = enteredDates[0].endDate;
	const enteredOptions = location.state.options;
	const enteredNumberOfPeople =
		parseInt(enteredOptions.adult) + parseInt(enteredOptions.children);
	const enteredNumberOfRoom = enteredOptions.room;
	const enteredMin = location.state.min || 0;
	const enteredMax = location.state.max || 999;

	const { fetchedData: searchingHotels, error } = useFetch(
		`http://localhost:5500/hotels/search?city=${enteredCity}&startDate=${enteredStartDate}&endDate=${enteredEndDate}&numberOfPeople=${enteredNumberOfPeople}&numberOfRoom=${enteredNumberOfRoom}&minPrice=${enteredMin}&maxPrice=${enteredMax}`
	);

	return (
		<div>
			<div className='search-container'>
				<div className='search-wrapper'>
					<SearchPopup
						enteredCity={enteredCity}
						enteredDates={enteredDates}
						enteredOptions={enteredOptions}
					/>
					<SearchList searchingHotels={searchingHotels} error={error} />
				</div>
			</div>
			<Register />
			<Footer />
		</div>
	);
};

export default Search;

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
	const enteredOptions = location.state.options;

	const { fetchedData: searchingHotels, error } = useFetch(
		`http://localhost:5500/hotels/search?city=${enteredCity}&date=${enteredDates}&option=${enteredOptions}`
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

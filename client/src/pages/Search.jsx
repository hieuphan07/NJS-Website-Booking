import React from 'react';
import { useLocation } from 'react-router-dom';

import Register from '../components/features/register/Register';
import Footer from '../components/footer/Footer';
import SearchPopup from '../components/features/searchPopup/SearchPopup';
import SearchList from '../components/features/searchList/SearchList';

import './Search.css';
import useFetch from '../hooks/useFetch';

const Search = () => {
	const location = useLocation();
	const destination = location.state.city;
	const selectedDate = location.state.dates;
	const option = location.state.options;

	const {
		fetchedData: searchingHotels,
		error,
		reFetch: reSearch,
	} = useFetch(
		`http://localhost:5500/hotels/search?city=${destination}&date=${selectedDate}&option=${option}`
	);

	return (
		<div>
			<div className='search-container'>
				<div className='search-wrapper'>
					<SearchPopup
						destination={destination}
						selectedDate={selectedDate}
						option={option}
						searchHandler={reSearch}
					/>
					<SearchList searchingHotels={searchingHotels} />
				</div>
			</div>
			<Register />
			<Footer />
		</div>
	);
};

export default Search;

import React from 'react';
import { useLocation } from 'react-router-dom';

import Register from '../components/features/register/Register';
import Footer from '../components/footer/Footer';
import SearchPopup from '../components/features/searchPopup/SearchPopup';
import SearchList from '../components/features/searchList/SearchList';

import './Search.css';

const Search = () => {
	const location = useLocation();

	return (
		<div>
			<div className='search-container'>
				<div className='search-wrapper'>
					<SearchPopup
						destination={location.state.destination}
						selectedDate={location.state.date}
						option={location.state.optionState}
					/>
					<SearchList />
				</div>
			</div>
			<Register />
			<Footer />
		</div>
	);
};

export default Search;

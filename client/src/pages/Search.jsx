import React from 'react';

import Register from '../components/features/register/Register';
import Footer from '../components/footer/Footer';
import SearchPopup from '../components/features/searchPopup/SearchPopup';
import SearchList from '../components/features/searchList/SearchList';

import './Search.css';

const Search = () => {
	return (
		<div>
			<div className='search-container'>
				<div className='search-wrapper'>
					<SearchPopup />
					<SearchList />
				</div>
			</div>
			<Register />
			<Footer />
		</div>
	);
};

export default Search;

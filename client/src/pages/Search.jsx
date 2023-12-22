import React from 'react';
import { useNavigate } from 'react-router-dom';

import search from '../data/search.json';

import NavBar from '../components/navbar/NavBar';
import Register from '../components/features/register/Register';
import Footer from '../components/footer/Footer';
import SearchPopup from '../components/features/searchPopup/SearchPopup';
import SearchList from '../components/features/searchList/SearchList';

import './Search.css';

const Search = () => {
	const navigate = useNavigate();

	const goToHome = () => {
		navigate('/');
	};
	const goToDetail = () => {
		navigate('/detail');
	};

	return (
		<div>
			<NavBar onGoToHome={goToHome} />
			<div className='search-container'>
				<div className='search-wrapper'>
					<SearchPopup />
					<SearchList results={search} onGoToDetail={goToDetail} />
				</div>
			</div>
			<Register />
			<Footer />
		</div>
	);
};

export default Search;

import { useNavigate } from 'react-router-dom';

import NavBar from '../components/navbar/NavBar';
import Header from '../components/header/Header';
import Features from '../components/features/UI/Features';
import Register from '../components/features/register/Register';
import Footer from '../components/footer/Footer';

import city from '../data/city.json';
import type from '../data/type.json';
import hotel_list from '../data/hotel_list.json';

const Home = () => {
	const navigate = useNavigate();

	const goToHome = () => {
		navigate('/');
	};
	const goToSearch = () => {
		navigate('/search');
	};

	return (
		<div>
			<NavBar onGoToHome={goToHome} />
			<Header onGoToSearch={goToSearch} />
			<Features cities={city} types={type} hotelLists={hotel_list} />
			<Register />
			<Footer />
		</div>
	);
};

export default Home;

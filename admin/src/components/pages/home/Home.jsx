import React from 'react';

import InfoBoard from '../../infoboard/InfoBoard';
import Table from '../../table/Table';

import './Home.css';

const Home = () => {
	return (
		<div className='home'>
			<div className='widgets'>
				<InfoBoard type='user' />
				<InfoBoard type='order' />
				<InfoBoard type='earning' />
				<InfoBoard type='balance' />
			</div>
			<Table />
		</div>
	);
};

export default Home;

export async function loader() {
	const response = await fetch('http://localhost:5500/transactions/');
	if (!response.ok) return;
	return response;
}

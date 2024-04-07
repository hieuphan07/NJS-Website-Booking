import React from 'react';
import Table from '../../table/Table';

import './Transaction.css';

const Transaction = () => {
	return (
		<div className='transactionsContainer'>
			<div className='title'>Transactions List</div>
			<Table />
		</div>
	);
};

export default Transaction;

import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { format } from 'date-fns';

import './TransactionContent.css';

const TransactionContent = () => {
	const user = useParams().id;
	const { fetchedData: transactions } = useFetch(
		`http://localhost:5500/transactions/${user}`
	);

	return (
		<div className='transaction-container'>
			<h1>Your Transacations</h1>
			<table>
				<thead>
					<tr>
						<th>#</th>
						<th>Hotel</th>
						<th>Room</th>
						<th>Date</th>
						<th>Price</th>
						<th>Payment Method</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{transactions.map((item, index) => {
						return (
							<tr key={item._id}>
								<td>{index + 1}</td>
								<td>{item.hotelId.title}</td>
								<td>
									{item.rooms.map((room, roomId) => {
										return room.roomNumbers.map((roomNumber, roomNumberId) => {
											if (
												roomId === item.rooms.length - 1 &&
												roomNumberId === room.roomNumbers.length - 1
											) {
												return roomNumber;
											} else {
												return roomNumber + ', ';
											}
										});
									})}
								</td>
								<td>
									{format(new Date(item.startDate), 'dd/MM/yyyy')} -{' '}
									{format(new Date(item.endDate), 'dd/MM/yyyy')}
								</td>
								<td>${item.price}</td>
								<td>{item.payment}</td>
								<td>{item.status}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default TransactionContent;

import React, { useState } from 'react';
import { DateRange } from 'react-date-range';

import './Reserve.css';

const Reserve = React.forwardRef((props, ref) => {
	const [state, setState] = useState([
		{
			startDate: new Date(),
			endDate: new Date(),
			key: 'selection',
		},
	]);

	return (
		<div className='reserve-container' ref={ref}>
			<div className='date-picker'>
				<h2>Dates</h2>
				<DateRange
					editableDateInputs={true}
					onChange={(item) => setState([item.selection])}
					moveRangeOnFirstSelection={false}
					ranges={state}
				/>
			</div>
			<div className='reserve-info'>
				<h2>Reserve Info</h2>
				<form>
					<label htmlFor='fullName'>Your Full Name:</label>
					<input type='test' id='fullName' placeholder='Full Name' required />
					<label htmlFor='email'>Your Email:</label>
					<input type='email' id='email' placeholder='Email' required />
					<label htmlFor='phoneNumber'>Your Phone Number:</label>
					<input
						type='number'
						id='phoneNumber'
						placeholder='Phone Number'
						required
					/>
					<label htmlFor='cardNumber'>Your Identity Card Number:</label>
					<input
						type='number'
						id='cardNumber'
						placeholder='Card Number'
						required
					/>
				</form>
			</div>
			<div className='select-room'>
				<h2>Selects Room</h2>
				<div className='room-wrapper'>
					<h4 className='room__title'>Budget Double Room</h4>
					<div className='room__info'>
						<p className='room__desc'>Pay nothing until September 04, 2022</p>
						<p className='room__maxPeople'>
							Max people: <strong>2</strong>
						</p>
						<p className='room__price'>$350</p>
					</div>
					<ul className='room__roomNumbers'>
						<li>
							<label htmlFor='room101'>101</label>
							<input type='checkbox' id='room101' name='room101' value='101' />
						</li>
						<li>
							<label htmlFor='room201'>201</label>
							<input type='checkbox' id='room201' name='room201' value='201' />
						</li>
						<li>
							<label htmlFor='room202'>202</label>
							<input type='checkbox' id='room202' name='room202' value='202' />
						</li>
						<li>
							<label htmlFor='room301'>301</label>
							<input type='checkbox' id='room301' name='room301' value='301' />
						</li>
					</ul>
				</div>
				<div className='room-wrapper'>
					<h4 className='room__title'>Budget Twin Room</h4>
					<div className='room__info'>
						<p className='room__desc'>
							Free cancellation before September 06, 2022
						</p>
						<p className='room__maxPeople'>
							Max people: <strong>2</strong>
						</p>
						<p className='room__price'>$350</p>
					</div>
					<ul className='room__roomNumbers'>
						<li>
							<label htmlFor='room401'>401</label>
							<input type='checkbox' id='room401' name='room401' value='401' />
						</li>
						<li>
							<label htmlFor='room402'>402</label>
							<input type='checkbox' id='room402' name='room402' value='402' />
						</li>
						<li>
							<label htmlFor='room404'>404</label>
							<input type='checkbox' id='room404' name='room404' value='404' />
						</li>
					</ul>
				</div>
				<div className='room-wrapper'>
					<h4 className='room__title'>Budget Double Room</h4>
					<div className='room__info'>
						<p className='room__desc'>Pay nothing until September 04, 2022</p>
						<p className='room__maxPeople'>
							Max people: <strong>2</strong>
						</p>
						<p className='room__price'>$350</p>
					</div>
					<ul className='room__roomNumbers'>
						<li>
							<label htmlFor='room101'>101</label>
							<input type='checkbox' id='room101' name='room101' value='101' />
						</li>
						<li>
							<label htmlFor='room201'>201</label>
							<input type='checkbox' id='room201' name='room201' value='201' />
						</li>
						<li>
							<label htmlFor='room202'>202</label>
							<input type='checkbox' id='room202' name='room202' value='202' />
						</li>
						<li>
							<label htmlFor='room301'>301</label>
							<input type='checkbox' id='room301' name='room301' value='301' />
						</li>
					</ul>
				</div>
				<div className='room-wrapper'>
					<h4 className='room__title'>Budget Twin Room</h4>
					<div className='room__info'>
						<p className='room__desc'>
							Free cancellation before September 06, 2022
						</p>
						<p className='room__maxPeople'>
							Max people: <strong>2</strong>
						</p>
						<p className='room__price'>$350</p>
					</div>
					<ul className='room__roomNumbers'>
						<li>
							<label htmlFor='room401'>401</label>
							<input type='checkbox' id='room401' name='room401' value='401' />
						</li>
						<li>
							<label htmlFor='room402'>402</label>
							<input type='checkbox' id='room402' name='room402' value='402' />
						</li>
						<li>
							<label htmlFor='room404'>404</label>
							<input type='checkbox' id='room404' name='room404' value='404' />
						</li>
					</ul>
				</div>
			</div>
			<div className='total-bill'>
				<h2>Total Bill: $700</h2>
				<select className='payment-method'>
					<option value='Select Payment Method'>Select Payment Method</option>
					<option value='Credit Card'>Credit Card</option>
					<option value='Cash'>Cash</option>
				</select>
			</div>
			<div className='action'>
				<button className='btn'>Reserve Now</button>
			</div>
		</div>
	);
});

export default Reserve;

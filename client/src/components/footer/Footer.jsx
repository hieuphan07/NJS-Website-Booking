import React from 'react';
import footer from '../../data/footer.json';

import './Footer.css';

const Footer = () => {
	return (
		<div className='footer'>
			<div className='footer__container'>
				{/* Render footer columns */}
				{footer.map((curr) => (
					<ul className='footer__column' key={curr.col_number}>
						{/* Render footer values each column */}
						{curr.col_values.map((value, index) => (
							<li key={index} className='footer__column__value'>
								<a href='#bot'>{value}</a>
							</li>
						))}
					</ul>
				))}
			</div>
		</div>
	);
};

export default Footer;

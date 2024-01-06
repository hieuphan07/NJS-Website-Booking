import detail from '../data/detail.json';

import Register from '../components/features/register/Register';
import Footer from '../components/footer/Footer';
import DetailPage from '../components/features/detailPage/DetailPage';

const Detail = () => {
	return (
		<>
			<DetailPage detailResults={detail} />
			<Register />
			<Footer />
		</>
	);
};

export default Detail;

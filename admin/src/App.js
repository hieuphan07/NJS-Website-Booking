import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root, { loader as propertyLoader } from './components/pages/root/Root';
import Home from './components/pages/home/Home';
import Users, { loader as usersLoader } from './components/pages/user/Users';
import Hotels from './components/pages/hotel/Hotels';
import Rooms from './components/pages/room/Rooms';
import {
	userColumns,
	hotelColumns,
	roomColumns,
} from './components/style/datatablesource.js';
import { loader as transactionLoader } from './components/pages/home/Home.jsx';
import Transaction from './components/pages/transaction/Transaction.jsx';
import NewHotel from './components/pages/newHotel/NewHotel.jsx';
import NewRoom from './components/pages/newRoom/NewRoom.jsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		id: 'root',
		loader: propertyLoader,
		children: [
			{
				index: true,
				element: <Home />,
				loader: transactionLoader,
			},
			{
				path: 'users',
				children: [
					{
						index: true,
						element: <Users columns={userColumns} />,
						loader: usersLoader,
					},
				],
			},
			{
				path: 'hotels',
				children: [
					{
						index: true,
						element: <Hotels columns={hotelColumns} />,
					},
					{ path: 'new', element: <NewHotel /> },
				],
			},
			{
				path: 'rooms',
				children: [
					{
						index: true,
						element: <Rooms columns={roomColumns} />,
					},
					{ path: 'new', element: <NewRoom /> },
				],
			},
			{ path: 'transactions', element: <Transaction /> },
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;

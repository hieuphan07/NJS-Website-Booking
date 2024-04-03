import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './components/pages/root/Root';
import Home from './components/pages/home/Home';
import Users, { loader as usersLoader } from './components/pages/user/Users';
import Hotels, {
	loader as hotelsLoader,
} from './components/pages/hotel/Hotels';
import Rooms, { loader as roomsLoader } from './components/pages/room/Rooms';
import {
	userColumns,
	hotelColumns,
	roomColumns,
} from './components/style/datatablesource.js';
import { loader as transactionLoader } from './components/pages/home/Home.jsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
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
						loader: hotelsLoader,
					},
				],
			},
			{
				path: 'rooms',
				children: [
					{
						index: true,
						element: <Rooms columns={roomColumns} />,
						loader: roomsLoader,
					},
				],
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;

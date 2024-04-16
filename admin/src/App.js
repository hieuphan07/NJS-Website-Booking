import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root, { loader as propertyLoader } from './components/pages/root/Root';
import Login from './components/pages/login/Login.jsx';
import Home from './components/pages/home/Home';
import Users, { loader as usersLoader } from './components/pages/user/Users';
import Hotels from './components/pages/hotel/Hotels';
import Rooms from './components/pages/room/Rooms';
import Error from './components/pages/error/Error.jsx';
import {
	userColumns,
	hotelColumns,
	roomColumns,
} from './components/style/datatablesource.js';
import Transaction from './components/pages/transaction/Transaction.jsx';
import NewHotel from './components/pages/newHotel/NewHotel.jsx';
import NewRoom from './components/pages/newRoom/NewRoom.jsx';
import HotelDetail from './components/pages/hotelDetail/HotelDetail.jsx';
import RoomDetail from './components/pages/roomDetail/RoomDetail.jsx';
import { action as loginAction } from './components/loginContent/LoginContent.jsx';
import ProtectedRoute from './components/util/ProtectedRoute.jsx';

const router = createBrowserRouter([
	{
		path: '/',
		errorElement: <Error />,
		element: <Root />,
		id: 'root',
		loader: propertyLoader,
		children: [
			{
				index: true,
				element: (
					<ProtectedRoute>
						<Home />
					</ProtectedRoute>
				),
			},
			{
				path: 'users',
				children: [
					{
						index: true,
						element: (
							<ProtectedRoute>
								<Users columns={userColumns} />
							</ProtectedRoute>
						),
						loader: usersLoader,
					},
				],
			},
			{
				path: 'hotels',
				children: [
					{
						children: [
							{
								index: true,
								element: (
									<ProtectedRoute>
										<Hotels columns={hotelColumns} />
									</ProtectedRoute>
								),
							},
							{
								path: 'new',
								element: (
									<ProtectedRoute>
										<NewHotel />
									</ProtectedRoute>
								),
							},
							{
								path: ':hotelId',
								element: (
									<ProtectedRoute>
										<HotelDetail />
									</ProtectedRoute>
								),
							},
						],
					},
				],
			},
			{
				path: 'rooms',
				children: [
					{
						children: [
							{
								index: true,
								element: (
									<ProtectedRoute>
										<Rooms columns={roomColumns} />
									</ProtectedRoute>
								),
							},
							{
								path: 'new',
								element: (
									<ProtectedRoute>
										<NewRoom />
									</ProtectedRoute>
								),
							},
							{
								path: ':roomId',
								element: (
									<ProtectedRoute>
										<RoomDetail />
									</ProtectedRoute>
								),
							},
						],
					},
				],
			},
			{
				path: 'transactions',
				element: (
					<ProtectedRoute>
						<Transaction />
					</ProtectedRoute>
				),
			},
		],
	},
	{
		path: 'login',
		element: <Login />,
		action: loginAction,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;

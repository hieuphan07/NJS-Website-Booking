import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './components/pages/root/Root';
import Home from './components/pages/home/Home';
import Users from './components/pages/user/Users';
import Hotels from './components/pages/hotel/Hotels';
import Rooms from './components/pages/room/Rooms';

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
				path: '/users',
				element: <Users />,
			},
			{
				path: '/hotels',
				element: <Hotels />,
			},
			{
				path: '/rooms',
				element: <Rooms />,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;

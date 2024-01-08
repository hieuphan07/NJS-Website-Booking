import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout, { loader as tokenLoader } from './pages/Root';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Search from './pages/Search';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Transaction from './pages/Transaction';
import Error from './pages/Error';
import { loader as hotelLoader } from '../src/components/features/UI/Features';
import { action as authManipulateAction } from '../src/components/auth-action/auth-action';

const router = createBrowserRouter([
	{
		path: '/',
		errorElement: <Error />,
		element: <RootLayout />,
		loader: tokenLoader,
		children: [
			{ index: true, element: <Home />, loader: hotelLoader },
			{ path: 'login', element: <Login />, action: authManipulateAction },
			{ path: 'signup', element: <Signup />, action: authManipulateAction },
			{ path: 'search', element: <Search /> },
			{ path: 'detail', element: <Detail /> },
			{ path: 'transaction', element: <Transaction /> },
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;

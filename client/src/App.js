import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout, { loader as coupleLoader } from './pages/Root';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Search from './pages/Search';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Transaction from './pages/Transaction';
import Error from './pages/Error';
import { action as authManipulateAction } from '../src/components/auth-action/auth-action';

const router = createBrowserRouter([
	{
		path: '/',
		errorElement: <Error />,
		element: <RootLayout />,
		id: 'root',
		loader: coupleLoader,
		children: [
			{ index: true, element: <Home /> },
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

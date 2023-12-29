import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/Root';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Search from './pages/Search';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { loader as hotelLoader } from '../src/components/features/UI/Features';
import { action as signUpAction } from '../src/components/signup/SignupContent';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{ index: true, element: <Home />, loader: hotelLoader },
			{ path: 'login', element: <Login /> },
			{ path: 'signup', element: <Signup />, action: signUpAction },
			{ path: 'search', element: <Search /> },
			{ path: 'detail', element: <Detail /> },
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;

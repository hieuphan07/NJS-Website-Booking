import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/Root';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Search from './pages/Search';
import { loader as hotelLoader } from '../src/components/features/UI/Features';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{ index: true, element: <Home />, loader: hotelLoader },
			{ path: 'search', element: <Search /> },
			{ path: 'detail', element: <Detail /> },
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;

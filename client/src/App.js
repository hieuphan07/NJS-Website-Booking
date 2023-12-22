import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Search from './pages/Search';

const router = createBrowserRouter([
	{
		path: '/',
		children: [
			{ index: true, element: <Home /> },
			{ path: 'search', element: <Search /> },
			{ path: 'detail', element: <Detail /> },
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;

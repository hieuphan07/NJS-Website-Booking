import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './components/pages/root/Root';
import Home from './components/pages/home/Home';

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
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;

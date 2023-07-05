import { RouterProvider } from 'react-router-dom';
import { getRouter, Pages } from '@/routes/getRouter';
import { AppProvider } from '@/providers/AppProvider';
import './App.css';

// ----------------------------------------------------------------------

const App = () => {
	const pages: Pages = import.meta.glob('./pages/**/*.tsx', { eager: true });
	const router = getRouter(pages);

	return (
		<AppProvider>
			<RouterProvider router={router} />
		</AppProvider>
	);
};

export default App;

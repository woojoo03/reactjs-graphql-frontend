import { RouterProvider } from 'react-router-dom';
import { getRouter, Pages } from '@/routes/getRouter';
import { AppProvider } from '@/providers/AppProvider';
import './App.css';

// ----------------------------------------------------------------------

const pages: Pages = import.meta.glob('./pages/**/*.tsx', { eager: true });
const router = getRouter(pages);

const App = () => (
	<AppProvider>
		<RouterProvider router={router} />
	</AppProvider>
);

export default App;

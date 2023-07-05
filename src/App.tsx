import { RouterProvider } from 'react-router-dom';
import { getRouter, Pages } from '@/routes/getRouter';
import { AppProvider } from '@/providers/AppProvider';
import './App.css';

// NextJS 처럼 라우팅..
const pages: Pages = import.meta.glob('./pages/**/*.tsx', { eager: true });
const router = getRouter(pages);
console.log('router -----------------------------------------------');
console.log(router);

const App = () => (
	<AppProvider>
		<RouterProvider router={router} />
	</AppProvider>
);

export default App;

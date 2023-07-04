import { useAuth } from '@/interactions';
import { Navigate } from 'react-router-dom';
import { Spinner } from '@/components/elements/Spinner';
//import { authStore } from '@/infra/stores/authStore';

interface PrivateRouteProps {
	children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
	const { models, loading } = useAuth();
	//const loginId = authStore();
	console.log('PrivateRoute : loginId :', models.user);

	if (loading) return <Spinner />;

	return models.user ? <Navigate to="/" /> : <>{children}</>;
};

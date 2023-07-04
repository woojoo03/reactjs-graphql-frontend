import { useAuth } from '@/interactions';
import { authStore } from '@/infra/stores/authStore';
import { Navigate } from 'react-router-dom';
import { Spinner } from '@/components/elements/Spinner';

interface PrivateRouteProps {
	children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
	const { loading } = useAuth();
	const loginId = authStore();
	console.log('PrivateRoute : loginId :', loginId);

	if (loading) return <Spinner />;

	return loginId ? <Navigate to="/" /> : <>{children}</>;
};

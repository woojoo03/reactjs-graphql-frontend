import { Navigate } from 'react-router-dom';
import { authStore } from '@/infra/stores/authStore';
import { useAuth } from '@/interactions';
import { Spinner } from '@/components/elements/Spinner';
import { useReactiveVar } from '@apollo/client';

interface AuthGuardLayoutProps {
	children: React.ReactNode;
}

export const AuthGuardLayout: React.FC<AuthGuardLayoutProps> = ({ children }) => {
	const { loading } = useAuth();
	const loginId = useReactiveVar(authStore);
	console.log('AuthGuardLayout : loginId :', loginId);

	if (loading) return <Spinner />;

	return loginId ? <>{children}</> : <Navigate to="/login" />;
};

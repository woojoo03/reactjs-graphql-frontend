import { useAuth } from '@/interactions';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@/components/elements/Spinner';
import { useEffect } from 'react';
import { useReactiveVar } from '@apollo/client';
import { authStore } from '@/infra/stores/authStore';

interface PrivateRouteProps {
	children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
	const navigate = useNavigate();
	const { models, loading } = useAuth();
	const loginId = useReactiveVar(authStore);
	console.log('PrivateRoute : useReactiveVar :', loginId);

	useEffect(() => {
		if (models.user) navigate('/');
	}, [models.user]);

	if (loading) return <Spinner />;

	return <>{children}</>;
};

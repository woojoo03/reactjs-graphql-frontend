import { Navigate } from 'react-router-dom';
import { useAuth } from '@/interactions';
import { Spinner } from '@/components/elements/Spinner';
import { useEffect } from 'react';
//import { useReactiveVar } from '@apollo/client';
//import { authStore } from '@/infra/stores/authStore';

interface AuthGuardLayoutProps {
	children: React.ReactNode;
}

export const AuthGuardLayout: React.FC<AuthGuardLayoutProps> = ({ children }) => {
	const { models, loading } = useAuth();
	//const loginId = useReactiveVar(authStore);
	console.log('AuthGuardLayout : loginId :', models.user);

	useEffect(() => {
		if (!models.user) {
			// 로그인 상태가 아니라면 로그인 페이지로 리다이렉트 등 상태 변경 로직을 수행합니다.
			// 예: history.push('/login') 등
		}
	}, [models.user]);

	if (loading) return <Spinner />;

	return models.user ? <>{children}</> : <Navigate to="/login" />;
};

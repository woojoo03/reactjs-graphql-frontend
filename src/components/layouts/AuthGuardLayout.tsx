import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/interactions';
import { Spinner } from '@/components/elements/Spinner';
import { useEffect } from 'react';
import { useReactiveVar } from '@apollo/client';
import { authStore } from '@/infra/stores/authStore';

// ----------------------------------------------------------------------

interface AuthGuardLayoutProps {
	children: React.ReactNode;
}

export const AuthGuardLayout: React.FC<AuthGuardLayoutProps> = ({ children }) => {
	const navigate = useNavigate();
	const { models, loading } = useAuth();
	const loginId = useReactiveVar(authStore);
	console.log('AuthGuardLayout : useReactiveVar :', loginId);

	// 인증 안된 사용자 자동 로그인 페이지 이동
	useEffect(() => {
		if (!models.user) navigate('/login');
	}, [models.user]);

	if (loading) return <Spinner />;

	return <>{children}</>;
};

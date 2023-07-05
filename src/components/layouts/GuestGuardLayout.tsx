import { useAuth } from '@/interactions';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@/components/elements/Spinner';
import { useEffect } from 'react';
import { useReactiveVar } from '@apollo/client';
import { authStore } from '@/infra/stores/authStore';

// ----------------------------------------------------------------------

interface GuestGuardLayoutProps {
	children: React.ReactNode;
}

export const GuestGuardLayout: React.FC<GuestGuardLayoutProps> = ({ children }) => {
	const navigate = useNavigate();
	const { models, loading } = useAuth();
	const loginId = useReactiveVar(authStore);
	console.log('GuestGuardLayout : useReactiveVar :', loginId);

	// 인증된 사용자 자동 메인 페이지 이동
	useEffect(() => {
		if (models.user) navigate('/');
	}, [models.user]);

	if (loading) return <Spinner />;

	return <>{children}</>;
};

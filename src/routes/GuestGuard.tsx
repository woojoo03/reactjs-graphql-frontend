import { useNavigate } from 'react-router-dom';
//import { useAuth } from '@/interactions';
//import { Spinner } from '@/components/elements/Spinner';
import { useEffect } from 'react';
import { useReactiveVar } from '@apollo/client';
import { authStore } from '@/infra/stores/authStore';

// ----------------------------------------------------------------------

interface GuestGuardProps {
	children: React.ReactNode;
}

export const GuestGuard: React.FC<GuestGuardProps> = ({ children }) => {
	const navigate = useNavigate();
	//const { models, loading } = useAuth();
	const loginId = useReactiveVar(authStore);
	console.log('GuestGuard : useReactiveVar ::::::::::::::::>', loginId);

	// 인증된 사용자 자동 메인 페이지 이동
	useEffect(() => {
		if (loginId) navigate('/');
	}, [loginId]);

	return <>{children}</>;
};

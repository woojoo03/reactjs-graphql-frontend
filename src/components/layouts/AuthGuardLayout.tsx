import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
//import { Spinner } from '@/components/elements/Spinner';

interface AuthGuardLayoutProps {
  children: React.ReactNode;
}

export const AuthGuardLayout: React.FC<AuthGuardLayoutProps> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<string | null>(null);

  useEffect(() => {
    setUserProfile("Guest");
  }, []);
  console.log('userProfile :', userProfile);

  // 유저 정보 확인 로직
  //if (userProfile === null) return <Spinner />;

  return userProfile ? (
      <>{children}</>
  ) : (
      <Navigate to="/login" />
  );
};
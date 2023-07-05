import { useAuth } from '@/interactions';
import { LoginSection } from '@/components/sections/auth';

// ----------------------------------------------------------------------

export default function Login() {
	const { error, operations } = useAuth();
	const { login } = operations;

	return <LoginSection actions={{ login }} error={error} />;
}

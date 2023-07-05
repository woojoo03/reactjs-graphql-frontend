import { useAuth } from '@/interactions';
import { SignUpSection } from '@/components/sections/auth';

// ----------------------------------------------------------------------

export default function Join() {
	const { error, operations } = useAuth();
	const { signUp } = operations;

	return <SignUpSection actions={{ signUp }} error={error} />;
}

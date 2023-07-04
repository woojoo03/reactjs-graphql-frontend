import { useAuth, useUser } from '@/interactions';
import { AccountSection } from '@/components/sections/user';

export default function Account() {
	const { operations: authOperations } = useAuth();
	const { error, operations: userOperations } = useUser();
	const { signOut } = authOperations;
	const { changePassword } = userOperations;

	const id = 0;

	return <AccountSection actions={{ signOut, changePassword }} id={id} error={error} />;
}

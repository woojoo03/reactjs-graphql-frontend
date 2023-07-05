import { useAuth, usePost } from '@/interactions';
import { Spinner } from '@/components/elements';
import { ProfileSection } from '@/components/sections/user';

// ----------------------------------------------------------------------

export default function Profile() {
	const { models, loading } = useAuth();
	const { operations } = usePost();
	const { postOnThread } = operations;

	if (!models.user) throw new Error('User are undefined');
	if (loading) return <Spinner />;

	return <ProfileSection user={models.user} actions={{ postOnThread }} />;
}

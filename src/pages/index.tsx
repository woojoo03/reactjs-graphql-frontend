import { useAuth } from '@/interactions';
import { MainSection } from '@/components/sections/main';

// ----------------------------------------------------------------------

export default function Main() {
	const { error } = useAuth();

	return <MainSection error={error} />;
}

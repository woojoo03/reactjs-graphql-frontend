import { useCallback, useState } from 'react';
import { Button, Center, Layout, VStack, Text } from '@/components/elements';
import { theme } from '@/utils/theme';
import { useNavigate } from 'react-router-dom';
import reactLogo from '@/assets/images/react.svg';
import { useReactiveVar } from '@apollo/client';
import { authStore } from '@/infra/stores/authStore';

const useMain = () => {
	const [count, setCount] = useState(0);

	const navigate = useNavigate();

	const handleLink = useCallback(async (page: string) => {
		navigate(page);
	}, []);

	return {
		models: { count },
		operations: { setCount, handleLink },
	};
};

type Props = {
	error: string;
};

export const MainSection: React.FC<Props> = ({ error }) => {
	const { models, operations } = useMain();

	const loginId = useReactiveVar(authStore);
	console.log('MainSection : useReactiveVar :', loginId);

	if (error) return <div>Error !!!</div>;

	return (
		<Center h={theme.h.full}>
			<VStack mb={100} w={theme.w.mobile}>
				<Text fontSize={theme.fs.h3}>
					<img src={reactLogo} className="logo react" alt="React logo" />
					Main
				</Text>
				<Layout borderRadius={theme.borderRadius.md} border={theme.border}>
					<div>&nbsp;</div>
					{loginId ? (
						<>
							<Button onClick={() => operations.handleLink('/account')}>Account</Button>
							<br />
							<br />
							<Button onClick={() => operations.handleLink('/profile')}>Profile</Button>
							<br />
							<br />
						</>
					) : (
						<>
							<Button onClick={() => operations.handleLink('/login')}>Login</Button>
							<br />
							<br />
							<Button onClick={() => operations.handleLink('/join')}>Join</Button>
							<br />
							<br />
						</>
					)}
					<div className="card">
						<button onClick={() => operations.setCount((count) => count + 1)}>count is {models.count}</button>
					</div>
				</Layout>
			</VStack>
		</Center>
	);
};

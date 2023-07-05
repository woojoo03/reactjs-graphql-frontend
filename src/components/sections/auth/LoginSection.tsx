import { useCallback, useState } from 'react';
import { Button, Center, Layout, Divider, VStack, Text } from '@/components/elements';
import { Form } from '@/components/form';
import { theme } from '@/utils/theme';
import { Link, useNavigate } from 'react-router-dom';
import { Login } from '@/types/async';
import useSettingContext from '@/hooks/useSettingContext';
import useUserContext from '@/hooks/useUserContext';
import { useReactiveVar } from '@apollo/client';
import { userStore } from '@/infra/stores/authStore';

// ----------------------------------------------------------------------

type Input = {
	actions: {
		login: Login;
	};
};

const useLogin = ({ actions }: Input) => {
	const list = [
		{
			id: 'email',
			text: 'Email',
			placeholder: 'mail@example.com',
		},
		{
			id: 'password',
			text: 'Password(min 6 letters)',
			placeholder: 'abc123',
		},
	];

	const [state, setState] = useState({
		email: '',
		password: '',
	});

	const navigate = useNavigate();

	const handleFormInput = useCallback((value: string, id: string) => {
		setState((prevState) => {
			return { ...prevState, [id]: value };
		});
	}, []);

	const handleLogin = useCallback(async () => {
		await actions.login({
			...state,
		});
		window.location.reload();
	}, [state, actions]);

	const handleSignUp = useCallback(() => {
		navigate('/join');
	}, [navigate]);

	return {
		models: { list, state },
		operations: { handleFormInput, handleLogin, handleSignUp },
	};
};

// ----------------------------------------------------------------------

type Props = {
	actions: {
		login: Login;
	};
	error: string;
};

export const LoginSection: React.FC<Props> = ({ actions, error }) => {
	const { models, operations } = useLogin({ actions });
	const setting = useSettingContext();
	console.log('LoginSection : useSettingContext :', setting);
	const userContext = useUserContext();
	console.log('LoginSection : useUserContext :', userContext);
	const userInfo = useReactiveVar(userStore);
	console.log('LoginSection : useReactiveVar :', userInfo);

	return (
		<Center h={theme.h.full}>
			<VStack mb={100} w={theme.w.mobile}>
				<Text fontSize={theme.fs.h3}>
					<Link to="/">Login</Link>
				</Text>
				<Layout borderRadius={theme.borderRadius.md} border={theme.border}>
					<Form list={models.list} onChange={operations.handleFormInput} values={models.state} error={error} />
					<Button w={'100%'} mb={theme.m.sm} onClick={operations.handleLogin}>
						Login
					</Button>
					<Divider mb={theme.m.sm} />
					<Center>
						<Text cursor={'pointer'} mb={theme.m.sm} borderBottom={theme.border} onClick={operations.handleSignUp}>
							Sign up
						</Text>
						<div>&nbsp;</div>
						<Text cursor={'pointer'} mb={theme.m.sm} borderBottom={theme.border} onClick={setting.toggleTheme}>
							ThemeChange
						</Text>
					</Center>
				</Layout>
			</VStack>
		</Center>
	);
};

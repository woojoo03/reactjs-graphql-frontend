import { useCallback, useState } from 'react';
import { Button, Center, Layout, Divider, VStack, Text } from '@/components/elements';
import { Form } from '@/components/form';
import { theme } from '@/utils/theme';
import { Link, useNavigate } from 'react-router-dom';
import { SignUp } from '@/types/async';
import useSettingContext from '@/hooks/useSettingContext';
import useUserContext from '@/hooks/useUserContext';
import { useReactiveVar } from '@apollo/client';
import { userStore } from '@/infra/stores/authStore';

// ----------------------------------------------------------------------

type Input = {
	actions: {
		signUp: SignUp;
	};
};

const useSignUp = ({ actions }: Input) => {
	const list = [
		{
			id: 'nickName',
			text: 'Nick name',
			placeholder: 'Nick name',
		},
		{
			id: 'country',
			text: 'Country',
			placeholder: 'Country',
		},
		{
			id: 'city',
			text: 'City',
			placeholder: 'City',
		},
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
		nickName: '',
		country: '',
		city: '',
		email: '',
		password: '',
	});

	const navigate = useNavigate();
	const handleFormInput = useCallback((value: string, id: string) => {
		setState((prevState) => {
			return { ...prevState, [id]: value };
		});
	}, []);

	const handleRegister = useCallback(async () => {
		await actions.signUp({ ...state });
		window.location.reload();
	}, [state, actions]);

	const handleLogin = useCallback(() => {
		navigate('/login');
	}, [navigate]);

	return {
		models: { list, state },
		operations: { handleFormInput, handleRegister, handleLogin },
	};
};

// ----------------------------------------------------------------------

type Props = {
	actions: {
		signUp: SignUp;
	};
	error: string;
};

export const SignUpSection: React.FC<Props> = ({ actions, error }) => {
	const { models, operations } = useSignUp({ actions });
	const setting = useSettingContext();
	console.log('SignUpSection : useSettingContext :', setting);
	const userContext = useUserContext();
	console.log('SignUpSection : useUserContext :', userContext);
	const userInfo = useReactiveVar(userStore);
	console.log('SignUpSection : useReactiveVar :', userInfo);

	return (
		<Center h={theme.h.full}>
			<VStack mb={100} w={theme.w.mobile}>
				<Text fontSize={theme.fs.h3}>
					<Link to="/">SignUp</Link>
				</Text>
				<Layout borderRadius={theme.borderRadius.md} border={theme.border}>
					<Form list={models.list} values={models.state} onChange={operations.handleFormInput} error={error} />
					<Button w={'100%'} mb={theme.m.sm} onClick={operations.handleRegister}>
						Resister
					</Button>
					<Divider mb={theme.m.sm} />
					<Center>
						<Text cursor={'pointer'} mb={theme.m.sm} borderBottom={theme.border} onClick={operations.handleLogin}>
							Login
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

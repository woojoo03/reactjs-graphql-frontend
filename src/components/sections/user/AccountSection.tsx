import { useCallback, useState } from 'react';
import { Box, Button, Center, Text } from '@/components/elements';
import { theme } from '@/utils/theme';
import { ThreadLayout } from '@/components/layouts';
import { Form } from '@/components/form';
import { ChangePassword, SignOut } from '@/types/async';
import useCustomToast from '@/hooks/useCustomToast';
import useUserContext from '@/hooks/useUserContext';
import { Link } from 'react-router-dom';

// ----------------------------------------------------------------------

type Input = {
	id: number;
	actions: {
		signOut: SignOut;
		changePassword: ChangePassword;
	};
};

const useAccount = ({ id, actions }: Input) => {
	const list = [
		{
			id: 'oldPassword',
			text: 'Old password(min 6 letters)',
			placeholder: 'abc123',
		},
		{
			id: 'newPassword',
			text: 'New password(min 6 letters)',
			placeholder: 'abc123',
		},
	];

	const initValue = {
		oldPassword: '',
		newPassword: '',
	};
	const [state, setState] = useState(initValue);

	const { setSuccess } = useCustomToast();

	const handleFormInput = useCallback((value: string, id: string) => {
		setState((prevState) => ({ ...prevState, [id]: value }));
	}, []);

	const handleUpdatePassword = async () => {
		await actions.changePassword({
			id: id,
			...state,
		});
		setSuccess({ title: 'Password changed ', description: '' });
		setState(initValue);
	};

	const handleSignOut = useCallback(async () => {
		await actions.signOut({ id: id });
		//window.location.reload();
	}, [actions, id]);
	return {
		models: { list, state },
		operations: { handleFormInput, handleUpdatePassword, handleSignOut },
	};
};

// ----------------------------------------------------------------------

type Props = {
	id: number;
	actions: {
		signOut: SignOut;
		changePassword: ChangePassword;
	};
	error: string;
};

export const AccountSection: React.FC<Props> = ({ id, actions, error }) => {
	const { models, operations } = useAccount({ id, actions });
	const userContext = useUserContext();
	console.log('AccountSection : useUserContext :', userContext);

	return (
		<ThreadLayout page="Account">
			<Text fontSize={theme.fs.h3}>
				<Link to="/">Account</Link>
			</Text>
			<Box w={theme.w.mobile}>
				<Form error={error} list={models.list} onChange={operations.handleFormInput} values={models.state} />
				<Button onClick={operations.handleUpdatePassword} w={'100%'} mb={theme.m.md}>
					Update Password
				</Button>
				<Center>
					<Text display={'inline-block'} cursor="pointer" onClick={operations.handleSignOut}>
						Sign out
					</Text>
				</Center>
			</Box>
		</ThreadLayout>
	);
};

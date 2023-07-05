import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { theme } from '@/utils/theme';
import { Text, Grid } from '@/components/elements';

// ----------------------------------------------------------------------

const useHeader = () => {
	const navigate = useNavigate();
	const handleClick = useCallback(
		(path: string) => {
			navigate(`/${path}`);
		},
		[navigate],
	);

	return { operations: { handleClick } };
};

// ----------------------------------------------------------------------

type Props = { page: 'Profile' | 'Account' };

export const Header: React.FC<Props> = ({ page }) => {
	const textH = '40px';
	const list = [
		{ text: 'Profile', path: 'profile' },
		{ text: 'Account', path: 'account' },
	];
	const { operations } = useHeader();

	return (
		<Grid templateColumns="repeat(2, 1fr)" w={theme.w.thread}>
			{list.map((ele, index) => (
				<Text
					key={ele.text}
					cursor="pointer"
					bg={ele.text === page ? 'blue.100' : 'initial'}
					h={textH}
					lineHeight={textH}
					border={theme.border}
					borderRight={index === list.length - 1 ? theme.border : ''}
					margin={8}
					textAlign={'center'}
					onClick={() => operations.handleClick(ele.path)}
				>
					{ele.text}
				</Text>
			))}
		</Grid>
	);
};

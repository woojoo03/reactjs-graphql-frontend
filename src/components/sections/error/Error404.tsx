import { useEffect } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';

// ----------------------------------------------------------------------

type Props = {
	id: number | undefined;
	loading: boolean;
};

export const Error404: React.FC<Props> = ({ id, loading }) => {
	const navigate = useNavigate();
	const error = useRouteError();
	console.log('Error404 :', error);

	useEffect(() => {
		if (!loading) {
			if (id) navigate('/');
			else navigate('/login');
		}
	}, [navigate, id, loading]);

	return <>404 Not Found !!</>;
};

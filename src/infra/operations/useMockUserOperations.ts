import { MutationUpdatePasswordArgs, QueryFetchUserByEmailArgs } from '@/infra/codegen';
import { User } from '@/types/models';

// ----------------------------------------------------------------------

type Models = {
	user: User | undefined;
};

type Queries = {
	fetchUserByEmail: (args: QueryFetchUserByEmailArgs) => Promise<void>;
};

type Mutations = {
	updatePassword: (args: MutationUpdatePasswordArgs) => Promise<void>;
};

export const useMockUserOperations: () => {
	models: Models;
	queries: Queries;
	mutations: Mutations;
} = () => {
	const user = {
		id: '11',
		email: 'danny@comets.kr',
		country: 'korea',
		city: 'busan',
		nickName: 'danny',
		posts: [
			{
				id: '11',
				body: '안녕하세요. 반갑습니다.',
				createdAt: 1677777777,
				senderEmail: 'danny@comets.kr',
				date: '2023-07-08 14:22:11',
			},
			{
				id: '10',
				body: '두번째 글 작성입니다.',
				createdAt: 1677777777,
				senderEmail: 'danny@comets.kr',
				date: '2023-07-07 11:11:11',
			},
		],
	};

	const fetchUserByEmail = async (args: QueryFetchUserByEmailArgs) => {
		console.log('fetchUserByEmail :', args);
	};

	const updatePassword = async (args: MutationUpdatePasswordArgs) => {
		console.log('updatePassword :', args);
	};

	return {
		models: { user },
		queries: { fetchUserByEmail },
		mutations: { updatePassword },
	};
};

export default useMockUserOperations;

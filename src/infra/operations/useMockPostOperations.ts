import { MutationCreatePostArgs } from '@/infra/codegen';
import { User } from '@/types/models';

// ----------------------------------------------------------------------

type Mutations = {
	createPost: (
		args: MutationCreatePostArgs,
		user: User,
		queryName: 'fetchUserByToken' | 'fetchUserByEmail',
	) => Promise<void>;
};

export const useMockPostOperations: () => { mutations: Mutations } = () => {
	const createPost: (
		args: MutationCreatePostArgs,
		user: User,
		queryName: 'fetchUserByToken' | 'fetchUserByEmail',
	) => Promise<void> = async (args, user, queryName) => {
		console.log('createPost : args :', args);
		console.log('createPost : user :', user);
		console.log('createPost : queryName :', queryName);

		const newUser = {
			...user,
			nickname: user.nickName + '!',
			posts: [
				{
					body: args.body,
					createAt: 1677777777,
					date: '2023-07-08 14:22:11',
					id: args.senderId,
					senderEmail: args.senderEmail,
				},
				...user.posts,
			],
		};
		console.log(newUser);
	};

	return { mutations: { createPost } };
};

export default useMockPostOperations;

import { MutationCreatePostArgs } from '@/infra/codegen';
import { useMockPostOperations as usePostOperations } from '@/infra/operations/useMockPostOperations';
import { User } from '@/types/models';

export const usePost = () => {
	const { mutations } = usePostOperations();

	const postOnThread = async (
		args: MutationCreatePostArgs,
		user: User,
		queryName: 'fetchUserByToken' | 'fetchUserByEmail',
	) => {
		await mutations.createPost(args, user, queryName);
	};

	return { operations: { postOnThread } };
};

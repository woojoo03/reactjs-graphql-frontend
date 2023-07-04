import { MutationCreateUserArgs, MutationUpdateTokenByLoginArgs, MutationUpdateTokenToNullArgs } from '@/infra/codegen';
import { authStore, userStore } from '@/infra/stores/authStore';
import { User } from '@/types/models/User';
import storage from '@/utils/storage';

type Mutations = {
	updateTokenByLogin: (args: MutationUpdateTokenByLoginArgs) => Promise<void>;
	createUser: (args: MutationCreateUserArgs) => Promise<void>;
	updateTokenToNull: (args: MutationUpdateTokenToNullArgs) => Promise<void>;
};

export const useMockAuthOperations: () => {
	user: User | undefined;
	loading: boolean;
	mutations: Mutations;
} = () => {
	// Token 값으로 유저 체크..
	let user;
	if (storage.getToken() === 'TEST_TOKEN') {
		user = {
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
	}
	const loading = false;

	if (!authStore() && user) {
		const id = parseInt(user.id);

		authStore(id);
		userStore({
			id: user.id,
			email: user.email,
			country: user.country,
			city: user.city,
			nickname: user.nickName,
		});
	}

	const updateTokenByLogin = async (args: MutationUpdateTokenByLoginArgs) => {
		console.log('updateTokenByLogin : args :', args);
		storage.setToken('TEST_TOKEN');
	};

	const createUser = async (args: MutationCreateUserArgs) => {
		console.log('createUser : args :', args);
		storage.setToken('TEST_TOKEN');
	};

	const updateTokenToNull = async (args: MutationUpdateTokenToNullArgs) => {
		console.log('updateTokenToNull : args :', args);
		storage.clearToken();

		authStore(undefined);
		userStore(undefined);
	};

	return {
		user,
		loading,
		mutations: { updateTokenByLogin, createUser, updateTokenToNull },
	};
};

export default useMockAuthOperations;

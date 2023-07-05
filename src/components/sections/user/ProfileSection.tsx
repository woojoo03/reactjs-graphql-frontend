import { Box, VStack, Text, Divider } from '@/components/elements';
import { ThreadLayout } from '@/components/layouts';
import { UserInfoList } from '@/components/list';
import { Post } from '@/components/post';
import { theme } from '@/utils/theme';
import { Posts } from '@/components/post';
import { PostOnThread } from '@/types/async';
import { User } from '@/types/models';
import { userStore } from '@/infra/stores/authStore';
import { useReactiveVar } from '@apollo/client';
import { Link } from 'react-router-dom';
import useSettingContext from '@/hooks/useSettingContext';
import useUserContext from '@/hooks/useUserContext';

// ----------------------------------------------------------------------

type Props = {
	user: User;
	actions: {
		postOnThread: PostOnThread;
	};
};

export const ProfileSection: React.FC<Props> = ({ user, actions }) => {
	const setting = useSettingContext();
	console.log('ProfileSection : useSettingContext :', setting);
	const userContext = useUserContext();
	console.log('ProfileSection : useUserContext :', userContext);
	const userInfo = useReactiveVar(userStore);
	console.log('ProfileSection : useReactiveVar :', userInfo);

	return (
		<ThreadLayout page="Profile">
			<Box pt={theme.m.md}>
				<VStack spacing={theme.m.md}>
					<Text fontSize={theme.fs.h3}>
						<Link to="/">Profile</Link>
					</Text>
					<Text textAlign="center">Write a post to your thread</Text>
					<UserInfoList user={user} /> <Divider />
					<Posts posts={user.posts} />
					<Post actions={actions} receiver={user} sender={user} queryName={'fetchUserByToken'} />
				</VStack>
			</Box>
		</ThreadLayout>
	);
};

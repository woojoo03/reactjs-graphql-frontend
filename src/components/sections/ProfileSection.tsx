import { Box, VStack, Text, Divider } from '@/components/elements';
import { ThreadLayout } from '@/components/layouts';
import { UserInfoList } from '@/components/list';
import { Post } from '@/components/post';
import { theme } from '@/utils/theme';
import { Posts } from '@/components/post';
import { PostOnThread, User } from '@/types';

type Props = {
  user: User;
  actions: {
    postOnThread: PostOnThread;
  };
};

export const ProfileSection: React.FC<Props> = ({ user, actions }) => {
  return (
    <ThreadLayout page="Profile">
      <Box pt={theme.m.md}>
        <VStack spacing={theme.m.md}>
          <Text textAlign="center">Write a post to your thread</Text>
          <UserInfoList user={user} /> <Divider />
          <Posts posts={user.posts} />
          <Post actions={actions} receiver={user} sender={user} queryName={'fetchUserByToken'} />
        </VStack>
      </Box>
    </ThreadLayout>
  );
};

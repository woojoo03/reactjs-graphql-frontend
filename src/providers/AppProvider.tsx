import { Suspense } from 'react';
import { IconContext } from 'react-icons';
import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@/utils/theme';
import useClient from '@/hooks/useClient';
import { SettingProvider, UserProvider } from '@/providers/ContextProvider';
import { defaultCookieSettings } from '@/config';

type Props = {
	children: React.ReactNode;
};

export const AppProvider = ({ children }: Props) => {
	const { client } = useClient();

	return (
		<Suspense fallback={<>Loading</>}>
			<ChakraProvider>
				<SettingProvider defaultCookies={defaultCookieSettings}>
					<UserProvider>
						<ApolloProvider client={client}>
							<IconContext.Provider value={{ color: theme.color.blue, size: '32px' }}>{children}</IconContext.Provider>
						</ApolloProvider>
					</UserProvider>
				</SettingProvider>
			</ChakraProvider>
		</Suspense>
	);
};

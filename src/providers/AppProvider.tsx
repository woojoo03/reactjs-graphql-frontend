import { ChakraProvider } from '@chakra-ui/react';
import { Suspense } from 'react';
import { IconContext } from 'react-icons';
import { theme } from '@/utils/theme';
import { ApolloProvider } from '@apollo/client';
import useClient from '@/hooks/useClient';

type Props = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: Props) => {
  const { client } = useClient();
  return (
    <Suspense fallback={<>Loading</>}>
      <ChakraProvider>
        <ApolloProvider client={client}>
          <IconContext.Provider value={{ color: theme.color.blue, size: '32px' }}>{children}</IconContext.Provider>
        </ApolloProvider>
      </ChakraProvider>
    </Suspense>
  );
};

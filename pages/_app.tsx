import React, { ReactElement, ReactNode } from 'react';
import { AppProps } from 'next/app';
import { ChakraProvider, useToast } from '@chakra-ui/react';
import theme from '@definitions/chakra/theme';
import '@styles/global.scss';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { Provider } from 'react-redux';
import store from '@redux/store';
import { appWithTranslation } from '@i18n';
import { SessionProvider } from 'next-auth/react';
import { NextPage } from 'next';
import Auth from 'src/layouts/Auth';
import Layout from 'src/layouts/Layout';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RoleEnum } from '.prisma/client';

// remove focus for non-keyboard interactions
import 'focus-visible/dist/focus-visible';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
  auth?: boolean;
  authRoles?: RoleEnum[];
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function AppQueryAndLayout({ Component, pageProps }: AppPropsWithLayout) {
  const toast = useToast();
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error: any) =>
        toast({
          position: 'top-right',
          status: 'error',
          isClosable: true,
          title: error?.response?.data?.message || error.message || 'Unknown error',
        }),
    }),
    mutationCache: new MutationCache({
      onError: (error: any) =>
        toast({
          position: 'top-right',
          status: 'error',
          isClosable: true,
          title: error?.response?.data?.message || error.message || 'Unknown error',
        }),
    }),
  });

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Provider store={store}>
          <Layout>
            {Component.auth ? (
              <Auth authRoles={Component.authRoles}>{getLayout(<Component {...pageProps} />)}</Auth>
            ) : (
              getLayout(<Component {...pageProps} />)
            )}
          </Layout>
        </Provider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

function MyApp(props: AppPropsWithLayout): JSX.Element {
  return (
    <SessionProvider session={props.pageProps.session}>
      <ChakraProvider theme={theme}>
        <AppQueryAndLayout {...props} />
      </ChakraProvider>
    </SessionProvider>
  );
}

export default appWithTranslation(MyApp);

import React, { ReactElement, ReactNode } from 'react';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@definitions/chakra/theme';
import '@styles/global.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { Provider } from 'react-redux';
import store from '@redux/store';
import { appWithTranslation } from '@i18n';
import { SessionProvider } from 'next-auth/react';
import { NextPage } from 'next';
import PrivateLayout from 'src/layouts/AuthLayout';
import Layout from 'src/layouts/Layout';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
  auth?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const queryClient = new QueryClient();

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Provider store={store}>
              {Component.auth ? (
                <PrivateLayout>{getLayout(<Component {...pageProps} />)}</PrivateLayout>
              ) : (
                <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
              )}
            </Provider>
          </Hydrate>
        </QueryClientProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default appWithTranslation(MyApp);

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
import { Provider as AuthProvider } from 'next-auth/client';
import { NextPage } from 'next';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const queryClient = new QueryClient();

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <AuthProvider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>
          </Hydrate>
        </QueryClientProvider>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default appWithTranslation(MyApp);

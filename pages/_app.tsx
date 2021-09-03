import React from "react";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@definitions/chakra/theme";
import "@styles/global.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { Provider } from "react-redux";
import store from "@redux/store";
import { appWithTranslation } from "@i18n";
import { Provider as AuthProvider } from "next-auth/client";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const queryClient = new QueryClient();
    return (
        <AuthProvider session={pageProps.session}>
            <ChakraProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <Hydrate state={pageProps.dehydratedState}>
                        <Provider store={store}>
                            <Component {...pageProps} />
                        </Provider>
                    </Hydrate>
                </QueryClientProvider>
            </ChakraProvider>
        </AuthProvider>
    );
}

export default appWithTranslation(MyApp);

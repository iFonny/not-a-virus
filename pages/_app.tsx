import { Steps, ChakraProvider, useToast } from "@chakra-ui/react";
import theme from "@definitions/chakra/theme";
import type { AppProps } from "next/app";
import React, { type ReactElement, type ReactNode } from "react";
import "@styles/global.scss";

import { appWithTranslation } from "@i18n";
import store from "@redux/store";
import type { NextPage } from "next";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import {
	type DehydratedState,
	MutationCache,
	QueryCache,
	QueryClient,
	QueryClientProvider,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Hydrate } from "react-query/hydration";
import { Provider } from "react-redux";
import Auth from "src/layouts/Auth";
import Layout from "src/layouts/Layout";

type RoleEnum = {
	GUEST: 'GUEST',
	USER: 'USER',
	ADMIN: 'ADMIN'
};


// remove focus for non-keyboard interactions
import "focus-visible/dist/focus-visible";

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
					position: "top-right",
					status: "error",
					isClosable: true,
					title:
						error?.response?.data?.message || error.message || "Unknown error",
				}),
		}),
		mutationCache: new MutationCache({
			onError: (error: any) =>
				toast({
					position: "top-right",
					status: "error",
					isClosable: true,
					title:
						error?.response?.data?.message || error.message || "Unknown error",
				}),
		}),
	});

	// Use the layout defined at the page level, if available
	const getLayout = Component.getLayout || ((page) => page);

	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate
				state={
					(pageProps as { dehydratedState?: DehydratedState })?.dehydratedState
				}
			>
				<Provider store={store}>
					<Layout>
						{Component.auth ? (
							<Auth authRoles={Component.authRoles}>
								{getLayout(<Component {...pageProps} />)}
							</Auth>
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

function MyApp(props: AppProps<{ session: Session }>): JSX.Element {
	return (
        <SessionProvider session={props.pageProps.session}>
            <ChakraProvider value={String(system)}>
				<AppQueryAndLayout {...props} />
			</ChakraProvider>
        </SessionProvider>
    );
}

export default appWithTranslation(MyApp);

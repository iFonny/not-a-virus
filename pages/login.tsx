import React from 'react';
import { Spacer, Flex } from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/client';

import { Header, Main, Cards, Footer } from '@components';
import api from 'src/utils/api';

const Home: React.FC = () => {
    const [session, loading] = useSession();

    return (
        <Flex direction="column" minH="100vh">
            <Header />
            <>
                <span>{loading ? 'loading...' : ''}</span>
                {!session && (
                    <>
                        Not signed in <br />
                        <button onClick={() => signIn()}>Sign in</button>
                    </>
                )}
                {session && (
                    <>
                        Signed in as {session.user.email} <br />
                        <button onClick={() => api('/users/me')}>test</button>
                        <button onClick={() => signOut()}>Sign out</button>
                    </>
                )}
            </>
            <Main />
            <Cards />
            <Spacer />
            <Footer />
        </Flex>
    );
};

export default Home;

import React from 'react';
import { Spacer, Flex } from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/react';

import { Header, Main, Cards, Footer } from '@components';
import api from 'src/utils/api';
import Link from 'next/link';

const Home = () => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  if (status === 'loading') return 'Loading or not authenticated...';

  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <>
        {status === 'authenticated' ? (
          <>
            Signed in as {session.user.email} <br />
            <button onClick={() => api('/users/me')}>test</button>
            <button onClick={() => signOut()}>Sign out</button>
          </>
        ) : (
          <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
            <Link href="/coucou" passHref>
              <button>COUCOU</button>
            </Link>
            <Link href="/openpage" passHref>
              <button>OPEN PAGE</button>
            </Link>
          </>
        )}
      </>

      <Link href="/coucou" passHref>
        <button>COUCOU</button>
      </Link>
      <Link href="/openpage" passHref>
        <button>OPEN PAGE</button>
      </Link>
      <Main />
      <Cards />
      <Spacer />
      <Footer />
    </Flex>
  );
};

export default Home;

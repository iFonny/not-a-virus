import React, { useEffect } from 'react';
import { Spacer, Flex } from '@chakra-ui/react';

import { Header, Main, Cards, Footer } from '@components';
import { signIn, useSession } from 'next-auth/react';
import FullPageSpinner from 'src/ui-components/FullPageSpinner';
import Layout, { LayoutProps } from './Layout';

/* NextAuth.js auth component from doc */
/* const PrivateLayout = (props: LayoutProps) => {
    const { data: session, status } = useSession();
  
    const isUser = !!session?.user;
    useEffect(() => {
      if (status === 'loading') return; // Do nothing while loading
      if (!isUser) signIn(); // If not authenticated, force log in
    }, [isUser, status]);
  
    if (isUser)
      return (
        <>
          <h1>Protected Page private layout</h1>
          <p>You can view this page because you are signed in.</p>
  
          <div>{JSON.stringify({ session })}</div>
  
          <Layout {...props} />
        </>
      );
  
    // Session is being fetched, or no user.
    // If no user, useEffect() will redirect.
    return <FullPageSpinner />;
  }; */

const PrivateLayout = (props: LayoutProps) => {
  const { data: session, status } = useSession();

  if (status === 'loading') return <FullPageSpinner />;

  if (status === 'unauthenticated' || !session) return <p>Access Denied</p>;

  return (
    <>
      <h1>Protected Page private layout</h1>
      <p>You can view this page because you are signed in.</p>

      <div>{JSON.stringify({ session })}</div>

      <Layout {...props} />
    </>
  );
};

/* 

with Suspense (react 18?)
const AuthLayout = (props: LayoutProps) => (
  <Suspense fallback={<FullPageSpinner />}>
    <PrivateLayout {...props} />
  </Suspense>
);
 */

export default PrivateLayout;

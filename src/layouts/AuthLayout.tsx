import React, { Suspense } from 'react';
import { Spacer, Flex } from '@chakra-ui/react';

import { Header, Main, Cards, Footer } from '@components';
import { useSession } from 'next-auth/react';
import FullPageSpinner from 'src/ui-components/FullPageSpinner';
import Layout, { LayoutProps } from './Layout';

const PrivateLayout = (props: LayoutProps) => {
  const { data: session, status } = useSession();

  if (status === 'loading') return <FullPageSpinner />;

  if (status === 'unauthenticated' || !session) return <p>Access Denied</p>;

  return (
    <>
      <h1>Protected Page</h1>
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

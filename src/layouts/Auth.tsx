import React, { useEffect, ReactNode } from 'react';

import { useSession } from 'next-auth/react';
import FullPageSpinner from 'src/components-ui /full-page-spinner';
import { LayoutProps } from './Layout';
import { useRouter } from 'next/router';

export type Props = {
  children: ReactNode;
};

/* NextAuth.js auth component from doc */
const Auth = ({ children }: Props) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isUser = !!session?.user;
  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!isUser) router.push('/auth/signin'); // signIn(); // If not authenticated, force log in
  }, [isUser, router, status]);

  if (isUser) return <>{children}</>;

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <FullPageSpinner />;
};

/* const PrivateLayout = (props: LayoutProps) => {
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
}; */

/* 

with Suspense (react 18?)
const AuthLayout = (props: LayoutProps) => (
  <Suspense fallback={<FullPageSpinner />}>
    <PrivateLayout {...props} />
  </Suspense>
);
 */

export default Auth;

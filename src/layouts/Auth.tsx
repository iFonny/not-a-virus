import React, { useEffect, ReactNode } from 'react';

import { useSession } from 'next-auth/react';
import FullPageSpinner from 'src/components-ui /full-page-spinner';
import { useRouter } from 'next/router';
import { RoleEnum } from '.prisma/client';
import routes from 'src/constants/routes';

export type Props = {
  children: ReactNode;
  authRoles?: RoleEnum[];
};

/* NextAuth.js auth component from doc */
const Auth = ({ children, authRoles }: Props) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isUser = !!session?.user;
  const hasPermission = !authRoles || authRoles.includes(session?.user?.role);

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading

    // If not authenticated, redirect to sign in page
    if (!isUser) router.push(routes.signin);
    else if (!hasPermission) router.push(routes.notFound); // If not authorized, redirect to 404
  }, [isUser, hasPermission, router, status]);

  if (isUser && hasPermission) return <>{children}</>;

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

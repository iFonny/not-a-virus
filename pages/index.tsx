import React from 'react';
import { Spinner, Stat, StatGroup, StatLabel, StatNumber, Box } from '@chakra-ui/react';

import { getSession, useSession } from 'next-auth/react';

const UserInfo = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') return <Spinner />;

  if (session?.user)
    return (
      <StatGroup>
        <Stat>
          <StatLabel>User id</StatLabel>
          <StatNumber>{session.user.id}</StatNumber>
        </Stat>

        <Stat>
          <StatLabel>User role</StatLabel>
          <StatNumber>{session.user.role}</StatNumber>
        </Stat>
      </StatGroup>
    );
};

const Home = () => {
  return (
    <Box padding={20}>
      <UserInfo />
    </Box>
  );
};

Home.auth = true;
export const getServerSideProps = async (ctx) => ({ props: { session: await getSession(ctx) } });

export default Home;

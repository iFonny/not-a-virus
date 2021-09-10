import React, { ReactElement } from 'react';
import { Spacer, Flex } from '@chakra-ui/react';

import { Header, Main, Cards, Footer } from '@components';
import PrivateLayout from 'src/layouts/AuthLayout';
import { getSession } from 'next-auth/react';

const Coucou = () => {
  return <div>coucou page</div>;
};

Coucou.auth = true;

export const getServerSideProps = async (ctx) => ({ props: { session: await getSession(ctx) } });

export default Coucou;

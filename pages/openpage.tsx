import React, { ReactElement } from 'react';
import { Spacer, Flex } from '@chakra-ui/react';

import { Header, Main, Cards, Footer } from '@components';
import PrivateLayout from 'src/layouts/AuthLayout';
import { getSession } from 'next-auth/react';

const OpenPage = () => {
  return <div>coucou page</div>;
};

OpenPage.auth = false;

export default OpenPage;

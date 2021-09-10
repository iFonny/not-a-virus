import React, { ReactElement } from 'react';
import { Spacer, Flex } from '@chakra-ui/react';

import { Header, Main, Cards, Footer } from '@components';
import PrivateLayout from 'src/layouts/AuthLayout';

const Coucou = () => {
  return <div>coucou page</div>;
};

Coucou.getLayout = (page: ReactElement) => <PrivateLayout title="Home">{page}</PrivateLayout>;

export default Coucou;

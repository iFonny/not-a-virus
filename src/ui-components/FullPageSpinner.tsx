import { Flex } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import React from 'react';

const FullPageSpinner = () => {
  return (
    <Flex h="100vh" w="100wv" justify="center" align="center">
      <Spinner size="xl" />
    </Flex>
  );
};

export default FullPageSpinner;

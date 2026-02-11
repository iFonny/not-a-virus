import { Steps, Alert, Flex } from '@chakra-ui/react';
import React from 'react';

function Error({ statusCode }) {
  return (
    <Flex h="fullvh" w="100wv" justify="center" align="center">
      <Alert.Root
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="100%"
      >
        <Alert.Indicator boxSize="40px" mr={0} />
        <Alert.Title mt={4} mb={1} mx={0} fontSize="lg">
          {statusCode || 'Error'}
        </Alert.Title>
        <Alert.Description maxWidth="sm">
          {statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}
        </Alert.Description>
      </Alert.Root>
    </Flex>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;

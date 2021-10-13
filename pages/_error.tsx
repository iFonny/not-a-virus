import { Alert, AlertIcon, AlertTitle, AlertDescription, Flex } from '@chakra-ui/react';
import React from 'react';

function Error({ statusCode }) {
  return (
    <Flex h="fullvh" w="100wv" justify="center" align="center">
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="100%"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} mx={0} fontSize="lg">
          {statusCode || 'Error'}
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          {statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}
        </AlertDescription>
      </Alert>
    </Flex>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;

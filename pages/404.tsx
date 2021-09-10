import { Alert, AlertIcon, AlertTitle, AlertDescription, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

export default function Page404() {
  return (
    <Flex h="fullvh" w="100wv" justify="center" align="center">
      <Alert
        status="warning"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="100%"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} mx={0} fontSize="lg">
          404
        </AlertTitle>
        <AlertDescription maxWidth="sm">Page not found</AlertDescription>
      </Alert>
    </Flex>
  );
}

import { Steps, Alert, Flex } from '@chakra-ui/react';
import React from 'react';

export default function Page404() {
  return (
    <Flex h="fullvh" w="100wv" justify="center" align="center">
      <Alert.Root
        status="warning"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="100%"
      >
        <Alert.Indicator boxSize="40px" mr={0} />
        <Alert.Title mt={4} mb={1} mx={0} fontSize="lg">
          404
        </Alert.Title>
        <Alert.Description maxWidth="sm">Page not found</Alert.Description>
      </Alert.Root>
    </Flex>
  );
}

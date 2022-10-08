import React from 'react';
import {
  Spinner,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useBoolean,
  useClipboard,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

import { getSession, useSession } from 'next-auth/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const UserInfo = () => {
  const [show, setShow] = useBoolean();
  const { data: session, status } = useSession();
  const { hasCopied, onCopy, value } = useClipboard(session?.user?.apiKey);

  if (status === 'loading') return <Spinner />;

  if (session?.user) {
    return (
      <>
        <StatGroup>
          <Stat marginX={1}>
            <StatLabel>User id</StatLabel>
            <StatNumber>{session.user.id}</StatNumber>
          </Stat>

          <Stat marginX={1}>
            <StatLabel>User role</StatLabel>
            <StatNumber>{session.user.role}</StatNumber>
          </Stat>
        </StatGroup>

        <br />

        <Box textAlign="center">
          <FormControl>
            <FormLabel>Api key</FormLabel>
            <InputGroup size="lg">
              <Input pr="4.5rem" type={show ? 'text' : 'password'} isDisabled value={value} />
              <InputRightElement mr="2" width="auto">
                <Button onClick={onCopy} size="md" h="2rem" ml="2">
                  {hasCopied ? 'Copied' : 'Copy'}
                </Button>
                <Button onClick={setShow.toggle} size="md" colorScheme="green" h="2rem" ml="2">
                  {show ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Box>
      </>
    );
  }
};

const Home = () => {
  return (
    <Box padding={5}>
      <UserInfo />
    </Box>
  );
};

// Auth
Home.auth = true;
export const getServerSideProps = async (ctx) => ({ props: { session: await getSession(ctx) } });

export default Home;

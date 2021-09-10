import { Box } from '@chakra-ui/react';
import { getSession } from 'next-auth/react';

const PageWithoutAuth = () => {
  return (
    <Box textAlign="center" paddingY={125}>
      Page Without Auth
    </Box>
  );
};

PageWithoutAuth.auth = false;
export const getServerSideProps = async (ctx) => ({ props: { session: await getSession(ctx) } });

export default PageWithoutAuth;

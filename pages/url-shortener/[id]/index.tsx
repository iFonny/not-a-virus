import React from 'react';
import { Alert, AlertDescription, AlertIcon, Box, Heading, Spinner } from '@chakra-ui/react';
import { useGetUrl } from 'api/urls/hooks';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import UrlDetails from './components/url-details';
import { RoleEnum } from '@prisma/client';

export function PageUrl() {
  const router = useRouter();
  const urlId = parseInt(router.query.id as string, 10);

  const { isLoading, isSuccess, isError, data, error } = useGetUrl(urlId, { retry: false });

  return (
    <Box textAlign="center" mt={3}>
      <Heading mb={4}>URL Details</Heading>

      {isError && (
        <Box marginY={4}>
          <Alert status="error" borderRadius={4}>
            <AlertIcon />
            <AlertDescription>{error?.response?.data?.message || error.message}</AlertDescription>
          </Alert>
        </Box>
      )}

      {isLoading && <Spinner />}

      {isSuccess && <UrlDetails url={data} />}
    </Box>
  );
}

// Auth
PageUrl.auth = true;
PageUrl.authRoles = [RoleEnum.USER, RoleEnum.ADMIN];
export const getServerSideProps = async (ctx) => ({ props: { session: await getSession(ctx) } });

export default PageUrl;

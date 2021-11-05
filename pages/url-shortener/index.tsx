import { AlertDescription, AlertIcon, Box, Alert, Heading } from '@chakra-ui/react';
import { RoleEnum } from '@prisma/client';
import { CreateUrlDTO } from 'api/urls';
import { useCreateUrl } from 'api/urls/hooks';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import routes from 'src/constants/routes';
import UrlShortenerForm from './components/form';

const PageUrlShortener = () => {
  const router = useRouter();
  const { mutateAsync, isError, error } = useCreateUrl();

  const handleSubmit = async (payload: CreateUrlDTO) => {
    await mutateAsync(payload, {
      onSuccess: (res) => router.push(routes.urlShortener.show(res.data.id)),
    });
  };

  return (
    <Box textAlign="center" mt={3} paddingX={5}>
      <Heading mb={3}>URL Shortener</Heading>

      {isError && (
        <Box marginY={4}>
          <Alert status="error" borderRadius={4}>
            <AlertIcon />
            <AlertDescription>{error?.response?.data?.message || error.message}</AlertDescription>
          </Alert>
        </Box>
      )}

      <UrlShortenerForm onSubmit={handleSubmit} />
    </Box>
  );
};

PageUrlShortener.auth = true;
PageUrlShortener.authRoles = [RoleEnum.USER, RoleEnum.ADMIN];
export const getServerSideProps = async (ctx) => ({ props: { session: await getSession(ctx) } });

export default PageUrlShortener;

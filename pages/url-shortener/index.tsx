import { AlertDescription, AlertIcon, Box, Alert } from '@chakra-ui/react';
import { CreateUrlDTO } from 'api/urls';
import { useCreateUrl } from 'api/urls/hooks';
import { getSession } from 'next-auth/react';
import UrlShortenerForm from './form';

const PageUrlShortener = () => {
  const { mutateAsync, isSuccess, isError, data, error } = useCreateUrl();

  const handleSubmit = async (payload: CreateUrlDTO) => {
    await mutateAsync(payload);
  };

  return (
    <Box textAlign="center" paddingY={125} paddingX={5}>
      {isError && (
        <Box my={4}>
          <Alert status="error" borderRadius={4}>
            <AlertIcon />
            <AlertDescription>{error?.response?.data?.message || error.message}</AlertDescription>
          </Alert>
        </Box>
      )}

      {isSuccess ? (
        <div>gg url cree (show url view ici) {JSON.stringify(data.data)}</div>
      ) : (
        <UrlShortenerForm onSubmit={handleSubmit} />
      )}
    </Box>
  );
};

PageUrlShortener.auth = true;
export const getServerSideProps = async (ctx) => ({ props: { session: await getSession(ctx) } });

export default PageUrlShortener;

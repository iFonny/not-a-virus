import { AlertDescription, AlertIcon, Box, Alert } from '@chakra-ui/react';
import { AxiosError, AxiosResponse } from 'axios';
import { getSession } from 'next-auth/react';
import { useMutation } from 'react-query';
import api from 'src/utils/api';
import { Url } from 'url';
import UrlShortenerForm, { CreateUrlDTO } from './form';

// TODO: Move dans un fichier pour les mutations ect (faire une zone pour l'api...?)
const createUrl = async (newUrl: CreateUrlDTO) => {
  return await api.post('/u', newUrl);
};

const PageUrlShortener = () => {
  const { mutateAsync, isSuccess, isError, data, error } = useMutation<AxiosResponse<Url>, AxiosError, CreateUrlDTO>(
    createUrl,
  );

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

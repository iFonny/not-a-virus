import { AxiosError, AxiosResponse } from 'axios';
import { useQuery, useMutation } from 'react-query';
import { createUrl, CreateUrlDTO, Url } from '.';

// tip for queries: https://react-query.tanstack.com/examples/custom-hooks

export const useCreateUrl = () => {
  return useMutation<AxiosResponse<Url>, AxiosError, CreateUrlDTO>(createUrl);
};

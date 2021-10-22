import { AxiosError, AxiosResponse } from 'axios';
import { useQuery, useMutation, UseQueryOptions } from 'react-query';
import { createUrl, CreateUrlDTO, getUrlById, Url } from '.';

// tip for queries: https://react-query.tanstack.com/examples/custom-hooks

export enum ServerStateKeysEnum {
  Post = 'post',
}

// Queries
export const useGetUrl = (urlId: number | string, options?: UseQueryOptions<Url>) => {
  return useQuery<Url, AxiosError>([ServerStateKeysEnum.Post, urlId], () => getUrlById(urlId), options);
};

// Mutations
export const useCreateUrl = () => {
  return useMutation<AxiosResponse<Url>, AxiosError, CreateUrlDTO>(createUrl);
};

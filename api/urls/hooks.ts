import { AxiosError, AxiosResponse } from 'axios';
import { useQuery, useMutation, UseQueryOptions, useQueryClient } from 'react-query';
import { createUrl, CreateUrlDTO, deleteUrl, getAllUrls, getUrlById, Url, Urls } from '.';

export const serverStateKeys = {
  url: (urlId: number | string) => ['url', urlId],
  urls: 'urls',
};

// Queries
export const useGetUrl = (urlId: number | string, options?: UseQueryOptions<Url>) => {
  return useQuery<Url, AxiosError>(serverStateKeys.url(urlId), () => getUrlById(urlId), options);
};

export const useGetAllUrls = (options?: UseQueryOptions<Urls>) => {
  return useQuery<Urls, AxiosError>(serverStateKeys.urls, () => getAllUrls(), options);
};

// Mutations
export const useCreateUrl = () => {
  return useMutation<AxiosResponse<Url>, AxiosError, CreateUrlDTO>(createUrl);
};

export const useDeleteUrl = () => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse<Url>, AxiosError, number | string>(deleteUrl, {
    onSuccess: (_, urlId) => {
      queryClient.invalidateQueries(serverStateKeys.urls);
      queryClient.invalidateQueries(serverStateKeys.url(urlId));
    },
  });
};

import { AxiosResponse } from 'axios';
import api from 'src/utils/api';

// -------- Types

export interface Url {
  id: number;
  name: string;
  description: string | null;
  longUrl: string;
  shortUrl: string;
  urlCode: string | null;
  clickCount: number;
  updatedAt: string;
  createdAt: string;
}

export interface Urls {
  urls: Url[];
}

export interface CreateUrlDTO {
  longUrl: string;
  name: string;
  customUrlCode?: string;
  description?: string;
  shouldReturnExisting?: boolean;
}

// -------- Methods

export const getUrlById = async (urlId: number | string): Promise<Url> => {
  return await api.get(`/u/id/${urlId}`).then((response) => response?.data);
};

export const getAllUrls = async (): Promise<Urls> => {
  return await api.get(`/u/all`).then((response) => response?.data);
};

export const createUrl = async (newUrl: CreateUrlDTO) => {
  return await api.post('/u', newUrl);
};

export const deleteUrl = async (urlId: number | string) => {
  return await api.delete(`/u/id/${urlId}`);
};

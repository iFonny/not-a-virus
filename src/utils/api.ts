import axios from 'axios';
import { getSession } from 'next-auth/react';

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_BASE_URL });

api.interceptors.request.use(async (config) => {
  const session = await getSession();

  config.headers['X-API-KEY'] = session?.user?.apiKey;
  return config;
});

export default api;

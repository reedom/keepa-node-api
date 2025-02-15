import { AxiosInstance } from 'axios';
import { KeepaHttpClient } from './KeepaHttpClient';
import { Response } from '../models/Response';

export function createKeepaHttpClientAxios({
  axios,
  userAgent,
}: {
  axios: AxiosInstance;
  userAgent: string;
}): KeepaHttpClient {
  return async ({
    method,
    url,
    data,
    timeout,
  }: {
    method?: 'GET' | 'POST';
    url: string;
    data?: string;
    timeout?: number;
  }): Promise<Response | never> => {
    const response = await axios({
      method,
      url,
      headers: {
        'User-Agent': userAgent,
        'Accept-Encoding': 'gzip',
        ...(method === 'POST' ? { 'Content-Type': 'application/json' } : {}),
      },
      data,
      timeout,
      decompress: true,
    });

    return response.data as Response;
  };
}

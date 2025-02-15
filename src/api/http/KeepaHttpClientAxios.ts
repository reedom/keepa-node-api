import { KeepaHttpClient } from './KeepaHttpClient';
import { Response } from '../models/Response';

export function createKeepaHttpClientAxios({
  userAgent,
}: {
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
    try {
      const axios = await import('axios');
      const response = await axios.default({
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
    } catch (error) {
      throw new Error(
        'axios is not available. Please install axios if using Node.js.'
      );
    }
  };
}

import type { AxiosStatic } from 'axios';
import { KeepaHttpClient } from './KeepaHttpClient';

export function createKeepaHttpClientAxios({
  userAgent,
}: {
  userAgent: string;
}): KeepaHttpClient {
  const getAxios = async (): Promise<AxiosStatic> => {
    try {
      return (await import('axios')).default;
    } catch (error) {
      throw new Error(
        'axios is not available. Please install axios if using Node.js.'
      );
    }
  };

  return async ({
    method,
    url,
    data,
    timeout,
  }: {
    method: 'get' | 'post';
    url: string;
    data?: string;
    timeout?: number;
  }): Promise<{ status: number; payload: Record<string, unknown> } | never> => {
    const axios = await getAxios();
    try {
      const response = await axios({
        method,
        url,
        headers: {
          'User-Agent': userAgent,
          'Accept-Encoding': 'gzip',
          ...(method === 'post' ? { 'Content-Type': 'application/json' } : {}),
        },
        data,
        timeout,
        decompress: true,
      });
      return { status: response.status, payload: response.data };
    } catch (error) {
      if (error instanceof axios.AxiosError) {
        if (error.response && 'tokensLeft' in error.response.data) {
          return {
            status: error.response.status,
            payload: error.response.data,
          };
        }
      }
      throw error;
    }
  };
}

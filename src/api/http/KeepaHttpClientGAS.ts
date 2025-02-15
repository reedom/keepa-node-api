import { KeepaHttpClient } from './KeepaHttpClient';

export function createKeepaHttpClientGAS({
  userAgent,
}: {
  userAgent: string;
}): KeepaHttpClient {
  return ({
    method,
    url,
    data,
  }: {
    method: 'get' | 'post';
    url: string;
    data?: string;
    timeout?: number;
  }): Promise<{ status: number; payload: Record<string, unknown> } | never> => {
    const res = UrlFetchApp.fetch(url, {
      method: (method ?? 'GET').toLocaleLowerCase() as 'get' | 'post',
      contentType: 'application/json',
      payload: data,
      headers: {
        'User-Agent': userAgent,
        'Accept-Encoding': 'gzip',
        ...(method === 'post' ? { 'Content-Type': 'application/json' } : {}),
      },
      muteHttpExceptions: true,
    });

    return Promise.resolve({
      status: res.getResponseCode(),
      payload: JSON.parse(res.getContentText()),
    });
  };
}

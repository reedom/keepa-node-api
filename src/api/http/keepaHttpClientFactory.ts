import axios from 'axios';
import { KeepaHttpClient } from './KeepaHttpClient';
import { createKeepaHttpClientAxios } from './KeepaHttpClientAxios';
import { createKeepaHttpClientGAS } from './KeepaHttpClientGAS';

export function createKeepHttpClient(
  httpClient: 'auto' | 'axios' | 'gas' | KeepaHttpClient,
  userAgent: string
): KeepaHttpClient | never {
  if (typeof httpClient === 'function') {
    return httpClient;
  }

  switch (httpClient) {
    case 'axios':
      return createKeepaHttpClientAxios({ axios, userAgent });
    case 'gas':
      return createKeepaHttpClientGAS({ userAgent });
    case 'auto':
      if (typeof UrlFetchApp !== 'undefined') {
        return createKeepaHttpClientGAS({ userAgent });
      } else {
        return createKeepaHttpClientAxios({ axios, userAgent });
      }
  }
}

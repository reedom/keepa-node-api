import axios from 'axios';
import { KeepaHttpClient } from './KeepaHttpClient';
import { createKeepaHttpClientAxios } from './KeepaHttpClientAxios';

export function createKeepHttpClient(
  httpClient: 'auto' | 'axios' | 'UrlFetchApp' | KeepaHttpClient,
  userAgent: string
): KeepaHttpClient | never {
  if (typeof httpClient === 'function') {
    return httpClient;
  } else if (httpClient === 'axios') {
    return createKeepaHttpClientAxios({ axios, userAgent });
  }

  throw new Error('not implemented');
}

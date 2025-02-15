import { KeepaHttpClient } from './KeepaHttpClient';
export declare function createKeepHttpClient(httpClient: 'auto' | 'axios' | 'UrlFetchApp' | KeepaHttpClient, userAgent: string): KeepaHttpClient | never;

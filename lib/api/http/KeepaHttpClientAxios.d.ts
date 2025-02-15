import { AxiosInstance } from 'axios';
import { KeepaHttpClient } from './KeepaHttpClient';
export declare function createKeepaHttpClientAxios({ axios, userAgent, }: {
    axios: AxiosInstance;
    userAgent: string;
}): KeepaHttpClient;

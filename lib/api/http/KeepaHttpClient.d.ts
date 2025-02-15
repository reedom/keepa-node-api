import { Response } from '../models/Response';
export type KeepaHttpClient = (params: {
    method?: 'GET' | 'POST';
    url: string;
    data?: string;
    timeout?: number;
}) => Promise<Response | never>;

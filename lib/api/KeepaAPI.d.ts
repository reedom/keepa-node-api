import { KeepaHttpClient } from './http/KeepaHttpClient';
import { Request } from './models/Request';
import { Response } from './models/Response';
export declare enum ResponseStatus {
    PENDING = 0,
    OK = 1,
    FAIL = 2,
    NOT_ENOUGH_TOKEN = 3,
    REQUEST_REJECTED = 4,
    PAYMENT_REQUIRED = 5,
    METHOD_NOT_ALLOWED = 6,
    INTERNAL_SERVER_ERROR = 7
}
export declare class KeepaAPI {
    private accessKey;
    private httpClient;
    private maxDelay;
    private defaultTimeout;
    constructor({ accessKey, httpClient, userAgent, maxDelay, defaultTimeout, }: {
        accessKey: string;
        httpClient: 'auto' | 'axios' | 'UrlFetchApp' | KeepaHttpClient;
        userAgent?: string;
        maxDelay?: number;
        defaultTimeout?: number;
    });
    sendRequest(r: Request, { timeout }?: {
        timeout?: number;
    }): Promise<Response>;
    sendRequestWithRetry(r: Request, { timeout }?: {
        timeout?: number;
    }): Promise<Response>;
    private handleError;
}

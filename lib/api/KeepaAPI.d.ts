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
    /**
     * Creates an instance of KeepaAPI.
     *
     * @param {Object} options - Configuration options for the client.
     * @param {string} options.accessKey - Your KeepaAPI access key.
     * @param {'auto' | 'axios' | 'gas' | KeepaHttpClient} [options.httpClient='auto']
     *   - The HTTP client to use. Options:
     *     - `'auto'`: Automatically selects a suitable HTTP client based on the environment.
     *     - `'axios'`: Uses the Axios library for HTTP requests.
     *     - `'gas'`: Uses Google Apps Script's `UrlFetchApp` for HTTP requests.
     *     - `KeepaHttpClient`: A custom HTTP client implementation.
     * @param {string} [options.userAgent='KEEPA-JAVA Framework-0.1.0']
     *   - The user agent string to send with requests.
     * @param {number} [options.maxDelay=60000]
     *   - The maximum delay (in milliseconds) between requests.
     * @param {number} [options.defaultTimeout=120000]
     *   - The default timeout (in milliseconds) for requests.
     */
    constructor({ accessKey, httpClient, userAgent, maxDelay, defaultTimeout, }: {
        accessKey: string;
        httpClient?: 'auto' | 'axios' | 'gas' | KeepaHttpClient;
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

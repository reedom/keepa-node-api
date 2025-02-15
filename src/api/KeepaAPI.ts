import { KeepaHttpClient } from './http/KeepaHttpClient';
import { createKeepHttpClient } from './http/keepaHttpClientFactory';
import { Request } from './models/Request';
import { Response, ResponseStatus } from './models/Response';

export class KeepaAPI {
  private accessKey: string;
  private httpClient: KeepaHttpClient;
  private maxDelay: number;
  private defaultTimeout: number;

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
  constructor({
    accessKey,
    httpClient = 'auto',
    userAgent = 'KEEPA-JAVA Framework-0.1.0',
    maxDelay = 60000,
    defaultTimeout = 120000,
  }: {
    accessKey: string;
    httpClient?: 'auto' | 'axios' | 'gas' | KeepaHttpClient;
    userAgent?: string;
    maxDelay?: number;
    defaultTimeout?: number;
  }) {
    this.accessKey = accessKey;
    this.httpClient = createKeepHttpClient(httpClient, userAgent);
    this.maxDelay = maxDelay;
    this.defaultTimeout = defaultTimeout;
  }

  public async sendRequest(
    r: Request,
    { timeout }: { timeout?: number } = {}
  ): Promise<Response> {
    if (!r) {
      throw new Error('Invalid request object');
    }

    const queryParams = Object.entries({
      ...r.parameter,
      key: this.accessKey,
    })
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&');
    const url = `https://api.keepa.com/${r.path}?${queryParams}`;

    const { status, payload } = await this.httpClient({
      method: r.postData ? 'get' : 'post',
      url,
      data: r.postData,
      timeout: timeout ?? this.defaultTimeout,
    });
    return this.toResponse({ status, payload });
  }

  public async sendRequestWithRetry(
    r: Request,
    { timeout }: { timeout?: number } = {}
  ): Promise<Response> {
    for (let attempt = 0; attempt < 5; attempt++) {
      let delay = 0;
      const response = await this.sendRequest(r, { timeout });
      switch (response.status) {
        case ResponseStatus.OK:
        default:
          return response;
        case ResponseStatus.NOT_ENOUGH_TOKEN:
          delay = Math.min(delay * 2 + 100, this.maxDelay);
          await new Promise(resolve => setTimeout(resolve, delay));
          break;
      }
    }
    throw new Error('Request failed after multiple retries');
  }

  private toResponse({
    status,
    payload,
  }: {
    status: number;
    payload: Record<string, unknown>;
  }): Response {
    const toResponseStatus = (status: number): ResponseStatus => {
      switch (status) {
        case 200:
          return ResponseStatus.OK;
        case 400:
          return ResponseStatus.REQUEST_REJECTED;
        case 402:
          return ResponseStatus.PAYMENT_REQUIRED;
        case 405:
          return ResponseStatus.METHOD_NOT_ALLOWED;
        case 429:
          return ResponseStatus.NOT_ENOUGH_TOKEN;
        case 500:
          return ResponseStatus.INTERNAL_SERVER_ERROR;
        default:
          return 400 <= status ? ResponseStatus.FAIL : ResponseStatus.OK;
      }
    };

    return {
      status: toResponseStatus(status),
      ...payload,
    } as Response;
  }
}

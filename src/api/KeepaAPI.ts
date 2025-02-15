import { KeepaHttpClient } from './http/KeepaHttpClient';
import { createKeepHttpClient } from './http/keepaHttpClientFactory';
import { Request } from './models/Request';
import { Response } from './models/Response';

export enum ResponseStatus {
  PENDING,
  OK,
  FAIL,
  NOT_ENOUGH_TOKEN,
  REQUEST_REJECTED,
  PAYMENT_REQUIRED,
  METHOD_NOT_ALLOWED,
  INTERNAL_SERVER_ERROR,
}

export class KeepaAPI {
  private accessKey: string;
  private httpClient: KeepaHttpClient;
  private maxDelay: number;
  private defaultTimeout: number;

  constructor({
    accessKey,
    httpClient = 'auto',
    userAgent = 'KEEPA-JAVA Framework-0.1.0',
    maxDelay = 60000,
    defaultTimeout = 120000,
  }: {
    accessKey: string;
    httpClient: 'auto' | 'axios' | 'UrlFetchApp' | KeepaHttpClient;
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

    const queryParams = new URLSearchParams({
      key: this.accessKey,
      ...r.parameter,
    }).toString();
    const url = `https://api.keepa.com/${r.path}?${queryParams}`;

    try {
      return this.httpClient({
        method: r.postData ? 'GET' : 'POST',
        url,
        data: r.postData,
        timeout: timeout ?? this.defaultTimeout,
      });
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async sendRequestWithRetry(
    r: Request,
    { timeout }: { timeout?: number } = {}
  ): Promise<Response> {
    let attempt = 0;
    const delay = 0;

    while (attempt < 5) {
      try {
        return await this.sendRequest(r, { timeout });
      } catch (error) {
        console.log(error);
        throw error;
        // if (error.response?.status === 429) {
        //   delay = Math.min(delay * 2 + 100, this.maxDelay);
        //   await new Promise((resolve) => setTimeout(resolve, delay));
        // } else {
        //   throw error;
        // }
      }
      attempt++;
    }
    throw new Error('Request failed after multiple retries');
  }

  private handleError(error: any): Response {
    return new Response(ResponseStatus.FAIL);
  }
}

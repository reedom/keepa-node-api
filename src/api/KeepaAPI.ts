// import axios from "axios";
// import * as zlib from "zlib";

import { Request } from './models/Request';
import { Response } from './models/Response';

export type KeepaHttpClient = (params: {
  method?: 'GET' | 'POST';
  url: string;
  data?: string;
  timeout?: number;
}) => Promise<Response | never>;

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
  private timeout: number;

  constructor(
    httpAgent: KeepaHttpClient,
    {
      accessKey,
      maxDelay = 60000,
      timeout = 120000,
    }: { accessKey: string; maxDelay?: number; timeout?: number }
  ) {
    this.accessKey = accessKey;
    this.httpClient = httpAgent;
    this.maxDelay = maxDelay;
    this.timeout = timeout;
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
        timeout: timeout ?? this.timeout,
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

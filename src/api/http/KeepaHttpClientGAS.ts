import { KeepaHttpClient } from './KeepaHttpClient';
import { Response } from '../models/Response';

export function createKeepaHttpClientGAS({
  userAgent,
}: {
  userAgent: string;
}): KeepaHttpClient {
  return ({
    method,
    url,
    data,
  }: {
    method?: 'GET' | 'POST';
    url: string;
    data?: string;
    timeout?: number;
  }): Promise<Response | never> => {
    const res = UrlFetchApp.fetch(url, {
      method: (method ?? 'GET').toLocaleLowerCase() as 'get' | 'post',
      contentType: 'application/json',
      payload: data,
      headers: {
        'User-Agent': userAgent,
        'Accept-Encoding': 'gzip',
        ...(method === 'POST' ? { 'Content-Type': 'application/json' } : {}),
      },
      muteHttpExceptions: true,
    });

    const httpCode = res.getResponseCode();
    if (res.getResponseCode() < 300) {
      return Promise.resolve(JSON.parse(res.getContentText()) as Response);
    }

    const response = new Response(res.getResponseCode());
    try {
      const text = res.getContentText();
      Logger.log(`request error: [${httpCode}] ${text}`);
      response.error = {
        type: `HTTP ${httpCode}`,
        message: text,
        details: '',
      };
    } catch (e) {
      Logger.log(`request error: [${httpCode}] (${String(e)})`);
      response.error = {
        type: `HTTP ${httpCode}`,
        message: '',
        details: '',
      };
    }
    return Promise.resolve(response);
  };
}

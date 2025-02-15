"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createKeepaHttpClientGAS = void 0;
function createKeepaHttpClientGAS({ userAgent, }) {
    return ({ method, url, data, }) => {
        const res = UrlFetchApp.fetch(url, {
            method: (method !== null && method !== void 0 ? method : 'GET').toLocaleLowerCase(),
            contentType: 'application/json',
            payload: data,
            headers: Object.assign({ 'User-Agent': userAgent, 'Accept-Encoding': 'gzip' }, (method === 'post' ? { 'Content-Type': 'application/json' } : {})),
            muteHttpExceptions: true,
        });
        return Promise.resolve({
            status: res.getResponseCode(),
            payload: JSON.parse(res.getContentText()),
        });
    };
}
exports.createKeepaHttpClientGAS = createKeepaHttpClientGAS;

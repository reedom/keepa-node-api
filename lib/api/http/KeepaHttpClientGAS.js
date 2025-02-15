"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createKeepaHttpClientGAS = void 0;
const Response_1 = require("../models/Response");
function createKeepaHttpClientGAS({ userAgent, }) {
    return ({ method, url, data, }) => {
        const res = UrlFetchApp.fetch(url, {
            method: (method !== null && method !== void 0 ? method : 'GET').toLocaleLowerCase(),
            contentType: 'application/json',
            payload: data,
            headers: Object.assign({ 'User-Agent': userAgent, 'Accept-Encoding': 'gzip' }, (method === 'POST' ? { 'Content-Type': 'application/json' } : {})),
            muteHttpExceptions: true,
        });
        const httpCode = res.getResponseCode();
        if (res.getResponseCode() < 300) {
            const gzipped = Utilities.newBlob(res.getContent());
            const json = Utilities.ungzip(gzipped).getDataAsString();
            return Promise.resolve(JSON.parse(json));
        }
        const response = new Response_1.Response(res.getResponseCode());
        try {
            const text = res.getContentText();
            Logger.log(`request error: [${httpCode}] ${text}`);
            response.error = {
                type: `HTTP ${httpCode}`,
                message: text,
                details: '',
            };
        }
        catch (e) {
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
exports.createKeepaHttpClientGAS = createKeepaHttpClientGAS;

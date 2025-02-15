"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createKeepHttpClient = void 0;
const KeepaHttpClientAxios_1 = require("./KeepaHttpClientAxios");
const KeepaHttpClientGAS_1 = require("./KeepaHttpClientGAS");
function createKeepHttpClient(httpClient, userAgent) {
    if (typeof httpClient === 'function') {
        return httpClient;
    }
    switch (httpClient) {
        case 'axios':
            return (0, KeepaHttpClientAxios_1.createKeepaHttpClientAxios)({ userAgent });
        case 'gas':
            return (0, KeepaHttpClientGAS_1.createKeepaHttpClientGAS)({ userAgent });
        case 'auto':
            if (typeof UrlFetchApp !== 'undefined') {
                return (0, KeepaHttpClientGAS_1.createKeepaHttpClientGAS)({ userAgent });
            }
            else {
                return (0, KeepaHttpClientAxios_1.createKeepaHttpClientAxios)({ userAgent });
            }
    }
}
exports.createKeepHttpClient = createKeepHttpClient;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createKeepHttpClient = void 0;
const axios_1 = __importDefault(require("axios"));
const KeepaHttpClientAxios_1 = require("./KeepaHttpClientAxios");
const KeepaHttpClientGAS_1 = require("./KeepaHttpClientGAS");
function createKeepHttpClient(httpClient, userAgent) {
    if (typeof httpClient === 'function') {
        return httpClient;
    }
    switch (httpClient) {
        case 'axios':
            return (0, KeepaHttpClientAxios_1.createKeepaHttpClientAxios)({ axios: axios_1.default, userAgent });
        case 'gas':
            return (0, KeepaHttpClientGAS_1.createKeepaHttpClientGAS)({ userAgent });
        case 'auto':
            if (typeof UrlFetchApp !== 'undefined') {
                return (0, KeepaHttpClientGAS_1.createKeepaHttpClientGAS)({ userAgent });
            }
            else {
                return (0, KeepaHttpClientAxios_1.createKeepaHttpClientAxios)({ axios: axios_1.default, userAgent });
            }
    }
}
exports.createKeepHttpClient = createKeepHttpClient;

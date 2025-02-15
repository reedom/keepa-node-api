"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createKeepHttpClient = void 0;
const axios_1 = __importDefault(require("axios"));
const KeepaHttpClientAxios_1 = require("./KeepaHttpClientAxios");
function createKeepHttpClient(httpClient, userAgent) {
    if (typeof httpClient === 'function') {
        return httpClient;
    }
    else if (httpClient === 'axios') {
        return (0, KeepaHttpClientAxios_1.createKeepaHttpClientAxios)({ axios: axios_1.default, userAgent });
    }
    throw new Error('not implemented');
}
exports.createKeepHttpClient = createKeepHttpClient;

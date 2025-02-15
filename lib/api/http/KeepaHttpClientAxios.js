"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createKeepaHttpClientAxios = void 0;
function createKeepaHttpClientAxios({ axios, userAgent, }) {
    return ({ method, url, data, timeout, }) => __awaiter(this, void 0, void 0, function* () {
        const response = yield axios({
            method,
            url,
            headers: Object.assign({ 'User-Agent': userAgent, 'Accept-Encoding': 'gzip' }, (method === 'POST' ? { 'Content-Type': 'application/json' } : {})),
            data,
            timeout,
            decompress: true,
        });
        return response.data;
    });
}
exports.createKeepaHttpClientAxios = createKeepaHttpClientAxios;

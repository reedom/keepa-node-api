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
exports.KeepaAPI = void 0;
const keepaHttpClientFactory_1 = require("./http/keepaHttpClientFactory");
const Response_1 = require("./models/Response");
class KeepaAPI {
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
    constructor({ accessKey, httpClient = 'auto', userAgent = 'KEEPA-JAVA Framework-0.1.0', maxDelay = 60000, defaultTimeout = 120000, }) {
        this.accessKey = accessKey;
        this.httpClient = (0, keepaHttpClientFactory_1.createKeepHttpClient)(httpClient, userAgent);
        this.maxDelay = maxDelay;
        this.defaultTimeout = defaultTimeout;
    }
    sendRequest(r, { timeout } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!r) {
                throw new Error('Invalid request object');
            }
            const queryParams = Object.entries(Object.assign(Object.assign({}, r.parameter), { key: this.accessKey }))
                .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
                .join('&');
            const url = `https://api.keepa.com/${r.path}?${queryParams}`;
            const { status, payload } = yield this.httpClient({
                method: r.postData ? 'get' : 'post',
                url,
                data: r.postData,
                timeout: timeout !== null && timeout !== void 0 ? timeout : this.defaultTimeout,
            });
            return this.toResponse({ status, payload });
        });
    }
    sendRequestWithRetry(r, { timeout } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let attempt = 0; attempt < 5; attempt++) {
                let delay = 0;
                const response = yield this.sendRequest(r, { timeout });
                switch (response.status) {
                    case Response_1.ResponseStatus.OK:
                    default:
                        return response;
                    case Response_1.ResponseStatus.NOT_ENOUGH_TOKEN:
                        delay = Math.min(delay * 2 + 100, this.maxDelay);
                        yield new Promise(resolve => setTimeout(resolve, delay));
                        break;
                }
            }
            throw new Error('Request failed after multiple retries');
        });
    }
    toResponse({ status, payload, }) {
        const toResponseStatus = (status) => {
            switch (status) {
                case 200:
                    return Response_1.ResponseStatus.OK;
                case 400:
                    return Response_1.ResponseStatus.REQUEST_REJECTED;
                case 402:
                    return Response_1.ResponseStatus.PAYMENT_REQUIRED;
                case 405:
                    return Response_1.ResponseStatus.METHOD_NOT_ALLOWED;
                case 429:
                    return Response_1.ResponseStatus.NOT_ENOUGH_TOKEN;
                case 500:
                    return Response_1.ResponseStatus.INTERNAL_SERVER_ERROR;
                default:
                    return 400 <= status ? Response_1.ResponseStatus.FAIL : Response_1.ResponseStatus.OK;
            }
        };
        return Object.assign({ status: toResponseStatus(status) }, payload);
    }
}
exports.KeepaAPI = KeepaAPI;

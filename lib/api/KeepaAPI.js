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
exports.KeepaAPI = exports.ResponseStatus = void 0;
const keepaHttpClientFactory_1 = require("./http/keepaHttpClientFactory");
const Response_1 = require("./models/Response");
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus[ResponseStatus["PENDING"] = 0] = "PENDING";
    ResponseStatus[ResponseStatus["OK"] = 1] = "OK";
    ResponseStatus[ResponseStatus["FAIL"] = 2] = "FAIL";
    ResponseStatus[ResponseStatus["NOT_ENOUGH_TOKEN"] = 3] = "NOT_ENOUGH_TOKEN";
    ResponseStatus[ResponseStatus["REQUEST_REJECTED"] = 4] = "REQUEST_REJECTED";
    ResponseStatus[ResponseStatus["PAYMENT_REQUIRED"] = 5] = "PAYMENT_REQUIRED";
    ResponseStatus[ResponseStatus["METHOD_NOT_ALLOWED"] = 6] = "METHOD_NOT_ALLOWED";
    ResponseStatus[ResponseStatus["INTERNAL_SERVER_ERROR"] = 7] = "INTERNAL_SERVER_ERROR";
})(ResponseStatus = exports.ResponseStatus || (exports.ResponseStatus = {}));
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
            const queryParams = new URLSearchParams(Object.assign({ key: this.accessKey }, r.parameter)).toString();
            const url = `https://api.keepa.com/${r.path}?${queryParams}`;
            try {
                return this.httpClient({
                    method: r.postData ? 'GET' : 'POST',
                    url,
                    data: r.postData,
                    timeout: timeout !== null && timeout !== void 0 ? timeout : this.defaultTimeout,
                });
            }
            catch (error) {
                throw this.handleError(error);
            }
        });
    }
    sendRequestWithRetry(r, { timeout } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let attempt = 0;
            const delay = 0;
            while (attempt < 5) {
                try {
                    return yield this.sendRequest(r, { timeout });
                }
                catch (error) {
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
        });
    }
    handleError(error) {
        return new Response_1.Response(ResponseStatus.FAIL);
    }
}
exports.KeepaAPI = KeepaAPI;

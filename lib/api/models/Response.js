"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = void 0;
class Response {
    constructor(status) {
        /** Total time the request took (local, including latencies and connection establishment), in milliseconds. */
        this.requestTime = 0;
        this.status = status;
    }
}
exports.Response = Response;

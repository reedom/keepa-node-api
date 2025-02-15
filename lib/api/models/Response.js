"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseStatus = void 0;
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

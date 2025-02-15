"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductFinderRequest = void 0;
/**
 * Required by the Finder request.
 * The `queryJSON` contains all request parameters. It must be URL encoded if the GET format is used.
 */
class ProductFinderRequest {
    constructor() {
        this.perPage = 50;
        this.page = 0;
    }
}
exports.ProductFinderRequest = ProductFinderRequest;

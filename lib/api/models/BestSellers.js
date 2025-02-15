"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BestSellers = void 0;
/**
 * A best sellers ASIN list of a specific category.
 *
 * Returned by: Request Best Sellers
 */
class BestSellers {
    constructor(domainId, lastUpdate, categoryId, asinList) {
        this.domainId = domainId;
        this.lastUpdate = lastUpdate;
        this.categoryId = categoryId;
        this.asinList = asinList;
    }
}
exports.BestSellers = BestSellers;

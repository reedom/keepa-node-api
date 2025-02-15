"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealRequest = void 0;
/**
 * Required by the Browsing Deals request.
 * The queryJSON contains all request parameters. It must be URL encoded if the GET format is used.
 * To quickly get a valid queryJSON, there is a link on the deals page26 below the filters that generates this JSON for the current selection.
 */
class DealRequest {
    toString() {
        return JSON.stringify(this, null, 2);
    }
}
exports.DealRequest = DealRequest;

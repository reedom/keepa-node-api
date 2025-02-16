"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCorrespondingCsvType = exports.OfferCondition = void 0;
/**
 * The condition of the offered product.
 */
var OfferCondition;
(function (OfferCondition) {
    OfferCondition[OfferCondition["UNKNOWN"] = 0] = "UNKNOWN";
    OfferCondition[OfferCondition["NEW"] = 1] = "NEW";
    OfferCondition[OfferCondition["USED_NEW"] = 2] = "USED_NEW";
    OfferCondition[OfferCondition["USED_VERY_GOOD"] = 3] = "USED_VERY_GOOD";
    OfferCondition[OfferCondition["USED_GOOD"] = 4] = "USED_GOOD";
    OfferCondition[OfferCondition["USED_ACCEPTABLE"] = 5] = "USED_ACCEPTABLE";
    OfferCondition[OfferCondition["REFURBISHED"] = 6] = "REFURBISHED";
    OfferCondition[OfferCondition["COLLECTIBLE_NEW"] = 7] = "COLLECTIBLE_NEW";
    OfferCondition[OfferCondition["COLLECTIBLE_VERY_GOOD"] = 8] = "COLLECTIBLE_VERY_GOOD";
    OfferCondition[OfferCondition["COLLECTIBLE_GOOD"] = 9] = "COLLECTIBLE_GOOD";
    OfferCondition[OfferCondition["COLLECTIBLE_ACCEPTABLE"] = 10] = "COLLECTIBLE_ACCEPTABLE";
})(OfferCondition = exports.OfferCondition || (exports.OfferCondition = {}));
/**
 * Maps `OfferCondition` to corresponding `CsvType`.
 */
function getCorrespondingCsvType(condition) {
    switch (condition) {
        case OfferCondition.USED_NEW:
            return 'USED_NEW_SHIPPING';
        case OfferCondition.USED_VERY_GOOD:
            return 'USED_VERY_GOOD_SHIPPING';
        case OfferCondition.USED_GOOD:
            return 'USED_GOOD_SHIPPING';
        case OfferCondition.USED_ACCEPTABLE:
            return 'USED_ACCEPTABLE_SHIPPING';
        case OfferCondition.REFURBISHED:
            return 'REFURBISHED_SHIPPING';
        case OfferCondition.COLLECTIBLE_NEW:
            return 'COLLECTIBLE_NEW_SHIPPING';
        case OfferCondition.COLLECTIBLE_VERY_GOOD:
            return 'COLLECTIBLE_VERY_GOOD_SHIPPING';
        case OfferCondition.COLLECTIBLE_GOOD:
            return 'COLLECTIBLE_GOOD_SHIPPING';
        case OfferCondition.COLLECTIBLE_ACCEPTABLE:
            return 'COLLECTIBLE_ACCEPTABLE_SHIPPING';
        default:
            return undefined;
    }
}
exports.getCorrespondingCsvType = getCorrespondingCsvType;

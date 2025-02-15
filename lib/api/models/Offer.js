"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCorrespondingCsvType = exports.OfferCondition = exports.Offer = void 0;
/**
 * About:
 * The offer object represents a marketplace offer.
 *
 * Returned by:
 * The offer object is returned by the Product Request using the optional offers parameter and is part of the Product Object.
 *
 * Important to know:
 * It is impossible to update billions of marketplace offers on a regular basis. The product request's offers parameter determines how many offers we retrieve/update.
 * We always fetch the best offers, as sorted by Amazon, in all conditions. If a product has more offers than requested, those will not be retrieved.
 *
 * The order of offers constantly changes, and we can retrieve a different amount of offers with each data retrieval.
 * Because of this, as well as the fact that we keep a history of offers, you will almost certainly encounter outdated offers.
 *
 * So the following is very important:
 *
 * - Evaluate the `lastSeen` field—only process fresh and active offers if you are not interested in past offers.
 * - The history of an offer (its past prices and shipping costs) is often not without gaps.
 *   Evaluate the `EXTRA_INFO_UPDATES` csv-type of the product object to find out when we updated the offers.
 *   If you need complete coverage of (all) offers of a product, you have to request it on a regular basis.
 * - If there are almost identical offers (same seller, same condition, same shipping type, and same condition text),
 *   we only provide access to the one with the cheapest price. We do not list duplicates.
 */
class Offer {
    constructor() {
        /**
         * States the last time we have seen (and updated) this offer, in Keepa Time minutes.
         *
         * @example 2700145
         */
        this.lastSeen = 0;
        /**
         * The {@link OfferCondition} condition of the offered product.
         */
        this.condition = 0;
        /** Whether or not this offer is available via Prime shipping. Can be used as an FBA ("Fulfillment by Amazon") indicator as well. */
        this.isPrime = false;
        /** If the price of this offer is hidden on Amazon due to a MAP ("minimum advertised price") restriction. */
        this.isMAP = false;
        /**
         * Indicates whether or not the offer is currently shippable.
         * If not, this could mean, for example, that it is temporarily out of stock or a pre-order.
         */
        this.isShippable = false;
        /** Indicates whether or not the offer is an Add-on item. */
        this.isAddonItem = false;
        /** Indicates whether or not the offer is a pre-order. */
        this.isPreorder = false;
        /** Indicates whether or not the offer is an Amazon Warehouse Deal. */
        this.isWarehouseDeal = false;
        /** Indicates whether or not our system identified that the offering merchant attempts to scam users. */
        this.isScam = false;
        /** Indicates whether or not the offer ships from China. */
        this.shipsFromChina = false;
        /**
         * True if the seller is Amazon (e.g. "Amazon.com").
         *
         * Note: Amazon's Warehouse Deals seller account or other accounts Amazon is maintaining under a different name are not considered to be Amazon.
         */
        this.isAmazon = false;
        /** Whether or not this offer is fulfilled by Amazon (FBA). */
        this.isFBA = false;
        /** This offer has a discounted Prime exclusive price. A Prime exclusive offer can only be ordered if the buyer has an active Prime subscription. */
        this.isPrimeExcl = false;
        /** Minimum order quantity. `0` if unknown. */
        this.minOrderQty = 0;
    }
}
exports.Offer = Offer;
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

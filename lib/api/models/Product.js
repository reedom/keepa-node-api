"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductType = exports.AvailabilityType = exports.getCsvTypeFromIndex = exports.CsvType = exports.PromotionType = exports.VideoCreatorType = void 0;
/**
 * Enum representing the video creator type.
 */
var VideoCreatorType;
(function (VideoCreatorType) {
    VideoCreatorType["Main"] = "Main";
    VideoCreatorType["Customer"] = "Customer";
    VideoCreatorType["Seller"] = "Seller";
    VideoCreatorType["Influencer"] = "Influencer";
    VideoCreatorType["Vendor"] = "Vendor";
    VideoCreatorType["ThirdParty"] = "ThirdParty";
    VideoCreatorType["Amazon"] = "Amazon";
    VideoCreatorType["Merchant"] = "Merchant";
    VideoCreatorType["Brand"] = "Brand";
})(VideoCreatorType = exports.VideoCreatorType || (exports.VideoCreatorType = {}));
/**
 * Represents the type of promotion.
 */
var PromotionType;
(function (PromotionType) {
    PromotionType["SNS"] = "SNS";
    PromotionType["PrimeExclusive"] = "PrimeExclusive";
})(PromotionType = exports.PromotionType || (exports.PromotionType = {}));
/**
 * Enum representing CSV types for various price histories and product attributes.
 */
exports.CsvType = {
    /**
     * Amazon price history
     */
    AMAZON: {
        index: 0,
        isPrice: true,
        isDealRelevant: true,
        isWithShipping: false,
        isExtraData: false,
    },
    /**
     * Marketplace/3rd party New price history - Amazon is considered to be part of the marketplace as well,
     * so if Amazon has the overall lowest new (!) price, the marketplace new price in the corresponding time interval
     * will be identical to the Amazon price (except if there is only one marketplace offer).
     * Shipping and Handling costs not included!
     */
    NEW: {
        index: 1,
        isPrice: true,
        isDealRelevant: true,
        isWithShipping: false,
        isExtraData: false,
    },
    /**
     * Marketplace/3rd party Used price history
     */
    USED: {
        index: 2,
        isPrice: true,
        isDealRelevant: true,
        isWithShipping: false,
        isExtraData: false,
    },
    /**
     * Sales Rank history. Not every product has a Sales Rank.
     */
    SALES: {
        index: 3,
        isPrice: false,
        isDealRelevant: true,
        isWithShipping: false,
        isExtraData: false,
    },
    /**
     * List Price history
     */
    LISTPRICE: {
        index: 4,
        isPrice: true,
        isDealRelevant: false,
        isWithShipping: false,
        isExtraData: false,
    },
    /**
     * Collectible Price history
     */
    COLLECTIBLE: {
        index: 5,
        isPrice: true,
        isDealRelevant: true,
        isWithShipping: false,
        isExtraData: false,
    },
    /**
     * Refurbished Price history
     */
    REFURBISHED: {
        index: 6,
        isPrice: true,
        isDealRelevant: true,
        isWithShipping: false,
        isExtraData: false,
    },
    /**
     * 3rd party (not including Amazon) New price history including shipping costs, only fulfilled by merchant (FBM).
     */
    NEW_FBM_SHIPPING: {
        index: 7,
        isPrice: true,
        isDealRelevant: true,
        isWithShipping: true,
        isExtraData: true,
    },
    /**
     * 3rd party (not including Amazon) New price history including shipping costs, only fulfilled by merchant (FBM).
     */
    LIGHTNING_DEAL: {
        index: 8,
        isPrice: true,
        isDealRelevant: true,
        isWithShipping: false,
        isExtraData: false,
    },
    /**
     * Amazon Warehouse Deals price history. Mostly of used condition, rarely new.
     */
    WAREHOUSE: {
        index: 9,
        isPrice: true,
        isDealRelevant: true,
        isWithShipping: false,
        isExtraData: true,
    },
    /**
     * Price history of the lowest 3rd party (not including Amazon/Warehouse) New offer that is fulfilled by Amazon
     */
    NEW_FBA: {
        index: 10,
        isPrice: true,
        isDealRelevant: true,
        isWithShipping: false,
        isExtraData: true,
    },
    /**
     * The product's rating history. A rating is an integer from 0 to 50 (e.g. 45 = 4.5 stars)
     */
    RATING: {
        index: 16,
        isPrice: false,
        isDealRelevant: false,
        isWithShipping: false,
        isExtraData: true,
    },
    /**
     * The product's review count history.
     */
    COUNT_REVIEWS: {
        index: 17,
        isPrice: false,
        isDealRelevant: false,
        isWithShipping: false,
        isExtraData: true,
    },
    /**
     * The price history of the buy box. If no offer qualified for the buy box the price has the value -1. Including shipping costs.
     */
    BUY_BOX_SHIPPING: {
        index: 18,
        isPrice: true,
        isDealRelevant: false,
        isWithShipping: true,
        isExtraData: true,
    },
    /**
     * The price history of the Used buy box (any sub-condition). If no offer qualified for the used buy box the price has the value -1. Including shipping costs.
     */
    BUY_BOX_USED_SHIPPING: {
        index: 32,
        isPrice: true,
        isDealRelevant: true,
        isWithShipping: true,
        isExtraData: true,
    },
    /**
     * Price history of the lowest Prime exclusive New offer.
     */
    PRIME_EXCL: {
        index: 33,
        isPrice: true,
        isDealRelevant: true,
        isWithShipping: false,
        isExtraData: true,
    },
};
/**
 * Returns the corresponding CsvType by index.
 * @param index - The index value to match.
 * @returns The corresponding CsvType key.
 */
function getCsvTypeFromIndex(index) {
    return Object.keys(exports.CsvType).find(key => exports.CsvType[key].index === index);
}
exports.getCsvTypeFromIndex = getCsvTypeFromIndex;
/**
 * Enum representing the availability of an Amazon offer.
 */
var AvailabilityType;
(function (AvailabilityType) {
    /**
     * No Amazon offer exists
     */
    AvailabilityType[AvailabilityType["NO_OFFER"] = -1] = "NO_OFFER";
    /**
     * Amazon offer is in stock and shippable
     */
    AvailabilityType[AvailabilityType["NOW"] = 0] = "NOW";
    /**
     * Amazon offer is currently not in stock but will be in the future - pre-order
     */
    AvailabilityType[AvailabilityType["PREORDERABLE"] = 1] = "PREORDERABLE";
    /**
     * Amazon offer availability is "unknown"
     */
    AvailabilityType[AvailabilityType["UNKNOWN"] = 2] = "UNKNOWN";
    /**
     * Amazon offer is currently not in stock but will be in the future - back-order
     */
    AvailabilityType[AvailabilityType["BACKORDERABLE"] = 3] = "BACKORDERABLE";
    /**
     * Amazon offer availability is delayed. Check `availabilityAmazonDelay` field for details.
     */
    AvailabilityType[AvailabilityType["DELAYED"] = 4] = "DELAYED";
})(AvailabilityType = exports.AvailabilityType || (exports.AvailabilityType = {}));
/**
 * Enum representing different product types.
 */
var ProductType;
(function (ProductType) {
    /**
     * Standard product - everything accessible.
     */
    ProductType[ProductType["STANDARD"] = 0] = "STANDARD";
    /**
     * Downloadable product – no marketplace price data.
     */
    ProductType[ProductType["DOWNLOADABLE"] = 1] = "DOWNLOADABLE";
    /**
     * eBook – no price data and sales rank accessible.
     */
    ProductType[ProductType["EBOOK"] = 2] = "EBOOK";
    /**
     * No data accessible (hidden prices due to MAP - minimum advertised price).
     */
    ProductType[ProductType["UNACCESSIBLE"] = 3] = "UNACCESSIBLE";
    /**
     * No data available due to invalid or deprecated ASIN, or other issues.
     */
    ProductType[ProductType["INVALID"] = 4] = "INVALID";
    /**
     * Product is a parent ASIN. No product data accessible, variationCSV is set.
     */
    ProductType[ProductType["VARIATION_PARENT"] = 5] = "VARIATION_PARENT";
})(ProductType = exports.ProductType || (exports.ProductType = {}));

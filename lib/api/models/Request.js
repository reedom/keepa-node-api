"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
/**
 * Common Request
 */
class Request {
    constructor(path, { parameter, postData, } = {}) {
        this.path = path;
        this.parameter = parameter !== null && parameter !== void 0 ? parameter : {};
        this.postData = postData;
    }
    /**
     * By accessing our deals you can find products that recently changed and match your search criteria.
     * A single request will return a maximum of 150 deals.
     *
     * @param dealRequest The dealRequest contains all request parameters.
     * @return A ready to send request.
     */
    static getDealsRequest(dealRequest) {
        return new Request('deal', {
            postData: JSON.stringify(dealRequest),
        });
    }
    /**
     * This request provides access to all current and upcoming lightning deals.
     * You can request a specific lightning deal by specifying an ASIN or get the complete list.
     * Our lightning deals information is updated every 10 minutes.
     *
     * @param domainId Amazon locale of the product {@link AmazonLocale}
     * @param asin The ASIN to retrieve the lightning deal for or null to retrieve all lightning deals
     * @return A ready to send request.
     */
    static getLightningDealRequest({ domainId, asin, }) {
        return new Request('lightningdeal', {
            parameter: Object.assign({ domain: String(domainId) }, (asin && { asin })),
        });
    }
    /**
     * Query our product database to find products matching your criteria. Almost all product fields can be searched for and sorted by.
     * The product finder request provides the same core functionality as our Product Finder.
     *
     * @param domainId The Amazon locale of the product.
     * @param finderRequest The FinderRequest contains all filter parameters.
     * @returns A ready-to-send request.
     */
    static getProductFinderRequest({ domainId, finderRequest, }) {
        return new Request('query', {
            parameter: {
                domain: String(domainId),
                selection: JSON.stringify(finderRequest),
            },
        });
    }
    /**
     * Add tracking to your list.
     *
     * @param trackingRequest The trackingRequest contains all request parameters.
     * @returns A ready-to-send request.
     */
    static getTrackingAddRequest(trackingRequest) {
        return Request.getTrackingBatchAddRequest(trackingRequest);
    }
    /**
     * Add multiple trackings to your list. Much more efficient than individual additions.
     *
     * @param trackingRequests The trackingRequests (up to 1000).
     * @returns A ready-to-send request or `null` if the request exceeds 1000 trackings.
     */
    static getTrackingBatchAddRequest(...trackingRequests) {
        if (1000 < trackingRequests.length) {
            throw new Error('Maximum of 1000 tracking requests allowed');
        }
        return new Request('tracking', {
            parameter: {
                type: 'add',
            },
            postData: JSON.stringify(trackingRequests),
        });
    }
    /**
     * Get a single tracking from your list.
     *
     * @param asin The ASIN to retrieve the tracking for.
     * @returns A ready-to-send request.
     */
    static getTrackingGetRequest(asin) {
        return new Request('tracking', {
            parameter: {
                type: 'get',
                asin,
            },
        });
    }
    /**
     * Get all trackings from your list. If you track a lot of products, this may be a resource-intensive operation. Use responsibly.
     *
     * @param asinsOnly Whether or not to only request an ASIN list of tracked products or to return all tracking objects (much larger response).
     * @returns A ready-to-send request.
     */
    static getTrackingListRequest({ asinsOnly, }) {
        return new Request('tracking', {
            parameter: Object.assign({ type: 'list' }, (asinsOnly && { asinsOnly: '1' })),
        });
    }
    /**
     * Get your recent notifications.
     *
     * @param since Retrieve all available notifications that occurred since this date, in KeepaTime. Use `0` to request all.
     * @param revise Whether or not to request notifications already marked as read.
     * @returns A ready-to-send request.
     */
    static getTrackingNotificationRequest({ since, revise, }) {
        return new Request('tracking', {
            parameter: {
                since: String(since),
                revise: flag(revise),
                type: 'notification',
            },
        });
    }
    /**
     * Remove a tracking from your list.
     *
     * @param asin The ASIN to remove the tracking for.
     * @returns A ready-to-send request.
     */
    static getTrackingRemoveRequest(asin) {
        return new Request('tracking', {
            parameter: {
                type: 'remove',
                asin,
            },
        });
    }
    /**
     * Removes all your trackings from your list.
     *
     * @returns A ready-to-send request.
     */
    static getTrackingRemoveAllRequest() {
        return new Request('tracking', {
            parameter: {
                type: 'removeAll',
            },
        });
    }
    /**
     * Updates the webhook URL our service will call whenever a notification is triggered. The URL can also be updated and tested via the website.
     * A push notification will be an HTTP POST call with a single notification object as its content.
     * Your server must respond with a status code of 200 to confirm the successful retrieval.
     * If delivery fails, a second attempt will be made with a 15-second delay.
     *
     * @param url The new webhook URL.
     * @returns A ready-to-send request.
     */
    static getTrackingWebhookRequest(url) {
        return new Request('tracking', {
            parameter: {
                type: 'webhook',
                url,
            },
        });
    }
    /**
     * Generates a request to retrieve the best sellers list.
     *
     * @param params Object containing best sellers request parameters.
     * @returns A ready-to-send request.
     */
    static getBestSellersRequest(params) {
        return new Request('bestsellers', {
            parameter: Object.assign({ domain: String(params.domainId) }, (params.category && { category: params.category })),
        });
    }
    /**
     * Generates a request to retrieve category lookup data.
     *
     * @param params Object containing category lookup request parameters.
     * @returns A ready-to-send request.
     */
    static getCategoryLookupRequest(params) {
        return new Request('category', {
            parameter: Object.assign({ domain: String(params.domainId), category: String(params.category) }, (params.parents && { parents: '1' })),
        });
    }
    /**
     * Generates a request to search Amazon categories.
     *
     * @param params Object containing category search request parameters.
     * @returns A ready-to-send request.
     */
    static getCategorySearchRequest(params) {
        return new Request('search', {
            parameter: Object.assign({ domain: String(params.domainId), type: 'category', term: params.term }, (params.parents && { parents: '1' })),
        });
    }
    /**
     * Generates a request to retrieve seller details.
     *
     * @param params Object containing seller request parameters.
     * @returns A ready-to-send request.
     */
    static getSellerRequest(params) {
        return new Request('seller', {
            parameter: Object.assign(Object.assign({ domain: String(params.domainId), seller: params.sellerIds.join(',') }, (params.storefront && { storefront: flag(params.storefront) })), (params.update !== undefined && { update: String(params.update) })),
        });
    }
    /**
     * Retrieve a Seller ID list of the most rated Amazon marketplace sellers.
     *
     * @param domainId Amazon locale of the product {@link AmazonLocale}. China is not supported.
     * @return A ready to send request.
     */
    static getTopSellerRequest(domainId) {
        return new Request('topseller', {
            parameter: {
                domain: String(domainId),
            },
        });
    }
    /**
     * Generates a request to retrieve product details by ASIN.
     *
     * @param params Object containing product request parameters.
     * @returns A ready-to-send request.
     */
    static getProductRequest(params) {
        return new Request('product', {
            parameter: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ asin: params.asins.join(','), domain: String(params.domainId) }, (params.update !== undefined && { update: String(params.update) })), (params.history !== undefined && { history: flag(params.history) })), (params.rental !== undefined && { rental: flag(params.rental) })), (params.rating !== undefined && { rating: flag(params.rating) })), (params.buybox !== undefined && { buybox: flag(params.buybox) })), (params.videos !== undefined && { videos: flag(params.videos) })), (params.aplus !== undefined && { aplus: flag(params.aplus) })), (params.stock !== undefined && { stock: flag(params.stock) })), (params.onlyLiveOffers !== undefined && {
                'only-live-offers': flag(params.onlyLiveOffers),
            })), (params.days !== undefined && { days: String(params.days) })), (params.statsStartDate &&
                params.statsEndDate && {
                stats: `${params.statsStartDate},${params.statsEndDate}`,
            })), (params.offers && { offers: String(params.offers) })),
        });
    }
    /**
     * Generates a request to retrieve product details by UPC, EAN, or ISBN-13 code.
     *
     * @param params Object containing product-by-code request parameters.
     * @returns A ready-to-send request.
     */
    static getProductByCodeRequest(params) {
        return new Request('product', {
            parameter: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ code: params.codes.join(','), domain: String(params.domainId) }, (params.update !== undefined && { update: String(params.update) })), (params.history !== undefined && { history: flag(params.history) })), (params.rental !== undefined && { rental: flag(params.rental) })), (params.rating !== undefined && { rating: flag(params.rating) })), (params.buybox !== undefined && { buybox: flag(params.buybox) })), (params.videos !== undefined && { videos: flag(params.videos) })), (params.aplus !== undefined && { aplus: flag(params.aplus) })), (params.stock !== undefined && { stock: flag(params.stock) })), (params.onlyLiveOffers !== undefined && {
                'only-live-offers': flag(params.onlyLiveOffers),
            })), (params.days !== undefined && { days: String(params.days) })), (params.statsStartDate &&
                params.statsEndDate && {
                stats: `${params.statsStartDate},${params.statsEndDate}`,
            })), (params.offers && { offers: String(params.offers) })),
        });
    }
    /**
     * Generates a request to search for Amazon products.
     *
     * @param params Object containing search request parameters.
     * @returns A ready-to-send request.
     */
    static getProductSearchRequest(params) {
        return new Request('search', {
            parameter: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ domain: String(params.domainId), type: 'product', term: params.term }, (params.stats && { stats: String(params.stats) })), (params.page && { page: String(params.page) })), (params.update && { update: String(params.update) })), (params.history && { history: flag(params.history) })), (params.asinsOnly && { 'asins-only': flag(params.asinsOnly) })),
        });
    }
}
exports.Request = Request;
function flag(v) {
    return v ? '1' : '0';
}

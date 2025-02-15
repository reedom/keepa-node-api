import { AmazonLocale } from './AmazonLocale';
import { DealRequest } from './DealRequest';
import { ProductFinderRequest } from './ProductFinderRequest';
import { TrackingRequest } from './TrackingRequest';
/**
 * Common Request
 */
export declare class Request {
    readonly path: string;
    readonly parameter: Record<string, string>;
    readonly postData?: string;
    constructor(path: string, { parameter, postData, }?: {
        parameter?: Record<string, string>;
        postData?: string;
    });
    /**
     * By accessing our deals you can find products that recently changed and match your search criteria.
     * A single request will return a maximum of 150 deals.
     *
     * @param dealRequest The dealRequest contains all request parameters.
     * @return A ready to send request.
     */
    static getDealsRequest(dealRequest: DealRequest): Request;
    /**
     * This request provides access to all current and upcoming lightning deals.
     * You can request a specific lightning deal by specifying an ASIN or get the complete list.
     * Our lightning deals information is updated every 10 minutes.
     *
     * @param domainId Amazon locale of the product {@link AmazonLocale}
     * @param asin The ASIN to retrieve the lightning deal for or null to retrieve all lightning deals
     * @return A ready to send request.
     */
    static getLightningDealRequest({ domainId, asin, }: {
        domainId: AmazonLocale;
        asin?: string;
    }): Request;
    /**
     * Query our product database to find products matching your criteria. Almost all product fields can be searched for and sorted by.
     * The product finder request provides the same core functionality as our Product Finder.
     *
     * @param domainId The Amazon locale of the product.
     * @param finderRequest The FinderRequest contains all filter parameters.
     * @returns A ready-to-send request.
     */
    static getProductFinderRequest({ domainId, finderRequest, }: {
        domainId: AmazonLocale;
        finderRequest: ProductFinderRequest;
    }): Request;
    /**
     * Add tracking to your list.
     *
     * @param trackingRequest The trackingRequest contains all request parameters.
     * @returns A ready-to-send request.
     */
    static getTrackingAddRequest(trackingRequest: TrackingRequest): Request;
    /**
     * Add multiple trackings to your list. Much more efficient than individual additions.
     *
     * @param trackingRequests The trackingRequests (up to 1000).
     * @returns A ready-to-send request or `null` if the request exceeds 1000 trackings.
     */
    static getTrackingBatchAddRequest(...trackingRequests: TrackingRequest[]): Request | never;
    /**
     * Get a single tracking from your list.
     *
     * @param asin The ASIN to retrieve the tracking for.
     * @returns A ready-to-send request.
     */
    static getTrackingGetRequest(asin: string): Request;
    /**
     * Get all trackings from your list. If you track a lot of products, this may be a resource-intensive operation. Use responsibly.
     *
     * @param asinsOnly Whether or not to only request an ASIN list of tracked products or to return all tracking objects (much larger response).
     * @returns A ready-to-send request.
     */
    static getTrackingListRequest({ asinsOnly, }: {
        asinsOnly: boolean;
    }): Request;
    /**
     * Get your recent notifications.
     *
     * @param since Retrieve all available notifications that occurred since this date, in KeepaTime. Use `0` to request all.
     * @param revise Whether or not to request notifications already marked as read.
     * @returns A ready-to-send request.
     */
    static getTrackingNotificationRequest({ since, revise, }: {
        since: number;
        revise: boolean;
    }): Request;
    /**
     * Remove a tracking from your list.
     *
     * @param asin The ASIN to remove the tracking for.
     * @returns A ready-to-send request.
     */
    static getTrackingRemoveRequest(asin: string): Request;
    /**
     * Removes all your trackings from your list.
     *
     * @returns A ready-to-send request.
     */
    static getTrackingRemoveAllRequest(): Request;
    /**
     * Updates the webhook URL our service will call whenever a notification is triggered. The URL can also be updated and tested via the website.
     * A push notification will be an HTTP POST call with a single notification object as its content.
     * Your server must respond with a status code of 200 to confirm the successful retrieval.
     * If delivery fails, a second attempt will be made with a 15-second delay.
     *
     * @param url The new webhook URL.
     * @returns A ready-to-send request.
     */
    static getTrackingWebhookRequest(url: string): Request;
    /**
     * Generates a request to retrieve the best sellers list.
     *
     * @param params Object containing best sellers request parameters.
     * @returns A ready-to-send request.
     */
    static getBestSellersRequest(params: BestSellersRequestParams): Request;
    /**
     * Generates a request to retrieve category lookup data.
     *
     * @param params Object containing category lookup request parameters.
     * @returns A ready-to-send request.
     */
    static getCategoryLookupRequest(params: CategoryLookupRequestParams): Request;
    /**
     * Generates a request to search Amazon categories.
     *
     * @param params Object containing category search request parameters.
     * @returns A ready-to-send request.
     */
    static getCategorySearchRequest(params: CategorySearchRequestParams): Request;
    /**
     * Generates a request to retrieve seller details.
     *
     * @param params Object containing seller request parameters.
     * @returns A ready-to-send request.
     */
    static getSellerRequest(params: SellerRequestParams): Request;
    /**
     * Retrieve a Seller ID list of the most rated Amazon marketplace sellers.
     *
     * @param domainId Amazon locale of the product {@link AmazonLocale}. China is not supported.
     * @return A ready to send request.
     */
    static getTopSellerRequest(domainId: AmazonLocale): Request;
    /**
     * Generates a request to retrieve product details by ASIN.
     *
     * @param params Object containing product request parameters.
     * @returns A ready-to-send request.
     */
    static getProductRequest(params: ProductRequestParams): Request;
    /**
     * Generates a request to retrieve product details by UPC, EAN, or ISBN-13 code.
     *
     * @param params Object containing product-by-code request parameters.
     * @returns A ready-to-send request.
     */
    static getProductByCodeRequest(params: ProductByCodeRequestParams): Request;
    /**
     * Generates a request to search for Amazon products.
     *
     * @param params Object containing search request parameters.
     * @returns A ready-to-send request.
     */
    static getProductSearchRequest(params: ProductSearchRequestParams): Request;
}
/**
 * Parameters for retrieving best sellers.
 */
interface BestSellersRequestParams {
    domainId: AmazonLocale;
    category?: string;
}
/**
 * Parameters for category lookup.
 */
interface CategoryLookupRequestParams {
    domainId: AmazonLocale;
    category: number;
    parents?: boolean;
}
/**
 * Parameters for category search.
 */
interface CategorySearchRequestParams {
    domainId: AmazonLocale;
    term: string;
    parents?: boolean;
}
/**
 * Parameters for retrieving seller details.
 */
interface SellerRequestParams {
    domainId: AmazonLocale;
    sellerIds: string[];
    storefront?: boolean;
    update?: number;
}
/**
 * Parameters for searching Amazon products.
 */
interface ProductSearchRequestParams {
    domainId: AmazonLocale;
    term: string;
    stats?: number;
    page?: number;
    update?: number;
    history?: boolean;
    asinsOnly?: boolean;
}
/**
 * Request parameters for retrieving product details by ASIN.
 */
interface ProductRequestParams {
    domainId: AmazonLocale;
    asins: string[];
    statsStartDate?: string;
    statsEndDate?: string;
    history?: boolean;
    buybox?: boolean;
    update?: number;
    offers?: number;
    rental?: boolean;
    rating?: boolean;
    videos?: boolean;
    aplus?: boolean;
    stock?: boolean;
    onlyLiveOffers?: boolean;
    days?: number;
}
/**
 * Request parameters for retrieving product details by product code (UPC, EAN, ISBN-13).
 */
interface ProductByCodeRequestParams {
    domainId: AmazonLocale;
    codes: string[];
    statsStartDate?: string;
    statsEndDate?: string;
    history?: boolean;
    buybox?: boolean;
    update?: number;
    offers?: number;
    rental?: boolean;
    rating?: boolean;
    videos?: boolean;
    aplus?: boolean;
    stock?: boolean;
    onlyLiveOffers?: boolean;
    days?: number;
}
export {};

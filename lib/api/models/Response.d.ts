import { ResponseStatus } from '../KeepaAPI';
import { Product } from './Product';
import { Category } from './Category';
import { DealResponse } from './DealResponse';
import { BestSellers } from './BestSellers';
import { Seller } from './Seller';
import { Tracking } from './Tracking';
import { Notification } from './Notification';
import { LightningDeal } from './LightningDeal';
import { RequestError } from './RequestError';
export declare class Response {
    constructor(status: ResponseStatus);
    /** Server time when response was sent. */
    timestamp?: number;
    /**
     * States how many ASINs may be requested before the assigned API contingent is depleted.
     * If the contingent is depleted, HTTP status code 503 will be delivered with the message:
     * "You are submitting requests too quickly and your requests are being throttled."
     */
    tokensLeft?: number;
    /**
     * Milliseconds till new tokens are generated. Use this if your contingent is depleted to wait before you try a new request.
     * Tokens are generated every 5 minutes.
     */
    refillIn?: number;
    /** Token refill rate per minute. */
    refillRate?: number;
    /** Total time the request took (local, including latencies and connection establishment), in milliseconds. */
    requestTime: number;
    /** Time the request's processing took (remote), in milliseconds. */
    processingTimeInMs?: number;
    /** Token flow reduction */
    tokenFlowReduction?: number;
    /** Tokens used for call */
    tokensConsumed?: number;
    /** Status of the request. */
    status: ResponseStatus;
    /** Results of the product request */
    products?: Product[];
    /** Results of the category lookup and search */
    categories?: Record<number, Category>;
    /** Results of the category lookup and search includeParents parameter */
    categoryParents?: Record<number, Category>;
    /** Results of the deals request */
    deals?: DealResponse;
    /** Results of the best sellers request */
    bestSellersList?: BestSellers;
    /** Results of the deals request */
    sellers?: Record<string, Seller>;
    /** Results of get and add tracking operations */
    trackings?: Tracking[];
    /** Results of get and add tracking operations */
    notifications?: Notification[];
    /** A list of ASINs. Result of, but not limited to, the get tracking list operation */
    asinList?: string[];
    /** Estimated count of all matched products. */
    totalResults?: number;
    /** A list of sellerIds. */
    sellerIdList?: string[];
    /** A list of lightning deals. */
    lightningDeals?: LightningDeal[];
    /** Contains information about any error that might have occurred. */
    error?: RequestError;
    /** Contains request specific additional output. */
    additional?: string;
}

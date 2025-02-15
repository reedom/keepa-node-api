import { AmazonLocale } from './AmazonLocale';
import { DealRequest } from './DealRequest';
import { ProductFinderRequest } from './ProductFinderRequest';
import { TrackingRequest } from './TrackingRequest';

/**
 * Common Request
 */
export class Request {
  public readonly path: string;
  public readonly parameter: Record<string, string>;
  public readonly postData?: string;

  constructor(
    path: string,
    {
      parameter,
      postData,
    }: { parameter?: Record<string, string>; postData?: string } = {}
  ) {
    this.path = path;
    this.parameter = parameter ?? {};
    this.postData = postData;
  }

  /**
   * By accessing our deals you can find products that recently changed and match your search criteria.
   * A single request will return a maximum of 150 deals.
   *
   * @param dealRequest The dealRequest contains all request parameters.
   * @return A ready to send request.
   */
  public static getDealsRequest(dealRequest: DealRequest): Request {
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
  public static getLightningDealRequest({
    domainId,
    asin,
  }: {
    domainId: AmazonLocale;
    asin?: string;
  }): Request {
    return new Request('lightningdeal', {
      parameter: {
        domain: String(domainId),
        ...(asin && { asin }),
      },
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
  public static getProductFinderRequest({
    domainId,
    finderRequest,
  }: {
    domainId: AmazonLocale;
    finderRequest: ProductFinderRequest;
  }): Request {
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
  public static getTrackingAddRequest(
    trackingRequest: TrackingRequest
  ): Request {
    return Request.getTrackingBatchAddRequest(trackingRequest);
  }

  /**
   * Add multiple trackings to your list. Much more efficient than individual additions.
   *
   * @param trackingRequests The trackingRequests (up to 1000).
   * @returns A ready-to-send request or `null` if the request exceeds 1000 trackings.
   */
  public static getTrackingBatchAddRequest(
    ...trackingRequests: TrackingRequest[]
  ): Request | never {
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
  public static getTrackingGetRequest(asin: string): Request {
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
  public static getTrackingListRequest({
    asinsOnly,
  }: {
    asinsOnly: boolean;
  }): Request {
    return new Request('tracking', {
      parameter: {
        type: 'list',
        ...(asinsOnly && { asinsOnly: '1' }),
      },
    });
  }

  /**
   * Get your recent notifications.
   *
   * @param since Retrieve all available notifications that occurred since this date, in KeepaTime. Use `0` to request all.
   * @param revise Whether or not to request notifications already marked as read.
   * @returns A ready-to-send request.
   */
  public static getTrackingNotificationRequest({
    since,
    revise,
  }: {
    since: number;
    revise: boolean;
  }): Request {
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
  public static getTrackingRemoveRequest(asin: string): Request {
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
  public static getTrackingRemoveAllRequest(): Request {
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
  public static getTrackingWebhookRequest(url: string): Request {
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
  public static getBestSellersRequest(
    params: BestSellersRequestParams
  ): Request {
    return new Request('bestsellers', {
      parameter: {
        domain: String(params.domainId),
        ...(params.category && { category: params.category }),
      },
    });
  }

  /**
   * Generates a request to retrieve category lookup data.
   *
   * @param params Object containing category lookup request parameters.
   * @returns A ready-to-send request.
   */
  public static getCategoryLookupRequest(
    params: CategoryLookupRequestParams
  ): Request {
    return new Request('category', {
      parameter: {
        domain: String(params.domainId),
        category: String(params.category),
        ...(params.parents && { parents: '1' }),
      },
    });
  }

  /**
   * Generates a request to search Amazon categories.
   *
   * @param params Object containing category search request parameters.
   * @returns A ready-to-send request.
   */
  public static getCategorySearchRequest(
    params: CategorySearchRequestParams
  ): Request {
    return new Request('search', {
      parameter: {
        domain: String(params.domainId),
        type: 'category',
        term: params.term,
        ...(params.parents && { parents: '1' }),
      },
    });
  }

  /**
   * Generates a request to retrieve seller details.
   *
   * @param params Object containing seller request parameters.
   * @returns A ready-to-send request.
   */
  public static getSellerRequest(params: SellerRequestParams): Request {
    return new Request('seller', {
      parameter: {
        domain: String(params.domainId),
        seller: params.sellerIds.join(','),
        ...(params.storefront && { storefront: flag(params.storefront) }),
        ...(params.update !== undefined && { update: String(params.update) }),
      },
    });
  }

  /**
   * Retrieve a Seller ID list of the most rated Amazon marketplace sellers.
   *
   * @param domainId Amazon locale of the product {@link AmazonLocale}. China is not supported.
   * @return A ready to send request.
   */
  public static getTopSellerRequest(domainId: AmazonLocale): Request {
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
  public static getProductRequest(params: ProductRequestParams): Request {
    return new Request('product', {
      parameter: {
        asin: params.asins.join(','),
        domain: String(params.domainId),
        ...(params.update !== undefined && { update: String(params.update) }),
        ...(params.history !== undefined && { history: flag(params.history) }),
        ...(params.rental !== undefined && { rental: flag(params.rental) }),
        ...(params.rating !== undefined && { rating: flag(params.rating) }),
        ...(params.buybox !== undefined && { buybox: flag(params.buybox) }),
        ...(params.videos !== undefined && { videos: flag(params.videos) }),
        ...(params.aplus !== undefined && { aplus: flag(params.aplus) }),
        ...(params.stock !== undefined && { stock: flag(params.stock) }),
        ...(params.onlyLiveOffers !== undefined && {
          'only-live-offers': flag(params.onlyLiveOffers),
        }),
        ...(params.days !== undefined && { days: String(params.days) }),
        ...(params.statsStartDate &&
          params.statsEndDate && {
            stats: `${params.statsStartDate},${params.statsEndDate}`,
          }),
        ...(params.offers && { offers: String(params.offers) }),
      },
    });
  }

  /**
   * Generates a request to retrieve product details by UPC, EAN, or ISBN-13 code.
   *
   * @param params Object containing product-by-code request parameters.
   * @returns A ready-to-send request.
   */
  public static getProductByCodeRequest(
    params: ProductByCodeRequestParams
  ): Request {
    return new Request('product', {
      parameter: {
        code: params.codes.join(','),
        domain: String(params.domainId),
        ...(params.update !== undefined && { update: String(params.update) }),
        ...(params.history !== undefined && { history: flag(params.history) }),
        ...(params.rental !== undefined && { rental: flag(params.rental) }),
        ...(params.rating !== undefined && { rating: flag(params.rating) }),
        ...(params.buybox !== undefined && { buybox: flag(params.buybox) }),
        ...(params.videos !== undefined && { videos: flag(params.videos) }),
        ...(params.aplus !== undefined && { aplus: flag(params.aplus) }),
        ...(params.stock !== undefined && { stock: flag(params.stock) }),
        ...(params.onlyLiveOffers !== undefined && {
          'only-live-offers': flag(params.onlyLiveOffers),
        }),
        ...(params.days !== undefined && { days: String(params.days) }),
        ...(params.statsStartDate &&
          params.statsEndDate && {
            stats: `${params.statsStartDate},${params.statsEndDate}`,
          }),
        ...(params.offers && { offers: String(params.offers) }),
      },
    });
  }

  /**
   * Generates a request to search for Amazon products.
   *
   * @param params Object containing search request parameters.
   * @returns A ready-to-send request.
   */
  public static getProductSearchRequest(
    params: ProductSearchRequestParams
  ): Request {
    return new Request('search', {
      parameter: {
        domain: String(params.domainId),
        type: 'product',
        term: params.term,
        ...(params.stats && { stats: String(params.stats) }),
        ...(params.page && { page: String(params.page) }),
        ...(params.update && { update: String(params.update) }),
        ...(params.history && { history: flag(params.history) }),
        ...(params.asinsOnly && { 'asins-only': flag(params.asinsOnly) }),
      },
    });
  }
}

function flag(v: boolean): '1' | '0' {
  return v ? '1' : '0';
}

/**
 * Parameters for retrieving best sellers.
 */
interface BestSellersRequestParams {
  domainId: AmazonLocale;
  category?: string; // Category node ID or product group
}

/**
 * Parameters for category lookup.
 */
interface CategoryLookupRequestParams {
  domainId: AmazonLocale;
  category: number;
  parents?: boolean; // Whether to include the category tree
}

/**
 * Parameters for category search.
 */
interface CategorySearchRequestParams {
  domainId: AmazonLocale;
  term: string; // Search term (minimum length: 3 characters)
  parents?: boolean; // Whether to include the category tree
}

/**
 * Parameters for retrieving seller details.
 */
interface SellerRequestParams {
  domainId: AmazonLocale;
  sellerIds: string[]; // Up to 100 seller IDs
  storefront?: boolean; // Whether to include storefront data
  update?: number; // Force a new collection if last update is older than X hours
}

/**
 * Parameters for searching Amazon products.
 */
interface ProductSearchRequestParams {
  domainId: AmazonLocale;
  term: string; // Search term
  stats?: number; // Days for calculating average statistics
  page?: number; // Page number (valid values: 0 - 9)
  update?: number; // Force refresh if last update is older than X hours
  history?: boolean; // Include product's history data (csv field)
  asinsOnly?: boolean; // Return only ASINs instead of product objects
}

/**
 * Request parameters for retrieving product details by ASIN.
 */
interface ProductRequestParams {
  domainId: AmazonLocale;
  asins: string[]; // Must contain between 1 and 100 ASINs (max 20 if offers param is used)
  statsStartDate?: string; // ISO8601 formatted date or Unix timestamp
  statsEndDate?: string;
  history?: boolean; // Whether to include historical price data
  buybox?: boolean; // Include buy box related data
  update?: number; // Refresh time in hours (0 = live data)
  offers?: number; // Number of marketplace offers to retrieve
  rental?: boolean; // Include rental price data (requires offers)
  rating?: boolean; // Include rating and review count history
  videos?: boolean; // Include video metadata
  aplus?: boolean; // Include A+ content
  stock?: boolean; // Include stock data
  onlyLiveOffers?: boolean; // Only include live marketplace offers
  days?: number; // Limit historical data to the last X days
}

/**
 * Request parameters for retrieving product details by product code (UPC, EAN, ISBN-13).
 */
interface ProductByCodeRequestParams {
  domainId: AmazonLocale;
  codes: string[]; // Must contain valid product codes (UPC, EAN, ISBN-13)
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

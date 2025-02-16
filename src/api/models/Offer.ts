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
export type Offer = {
  /**
   * Unique ID of this offer (in the scope of the product).
   * Not related to the offer IDs used by Amazon, as those are user-specific and only valid for a short time.
   * The `offerId` can be used to identify the same offers throughout requests.
   *
   * @example 4
   */
  offerId?: number;

  /**
   * States the last time we have seen (and updated) this offer, in Keepa Time minutes.
   *
   * @example 2700145
   */
  lastSeen: number;

  /**
   * The seller ID of the merchant.
   *
   * @example "A2L77EE7U53NWQ" (Amazon.com Warehouse Deals)
   */
  sellerId?: string;

  /**
   * Contains the current price and shipping costs of the offer as well as, if available, the offer's history.
   * It has the format: `[Keepa time minutes, price, shipping cost, ...]`
   *
   * - The price and shipping cost are integers of the respective Amazon locale's smallest currency unit (e.g. euro cents or yen).
   * - If we were unable to determine the price or shipping cost, they have the value `-2`.
   * - Free shipping has the shipping cost of `0`.
   * - If an offer is not shippable or has unspecified shipping costs, the shipping cost will be `-1`.
   *
   * To get the newest price and shipping cost, access the last two entries of the array:
   * - Most recent price: `offerCSV[offerCSV.length - 2]`
   * - Most recent shipping cost: `offerCSV[offerCSV.length - 1]`
   */
  offerCSV?: number[];

  /**
   * The {@link OfferCondition} condition of the offered product.
   */
  condition: number;

  /**
   * The describing text of the condition.
   *
   * @example "The item may come repackaged. Small cosmetic imperfection on top, [...]"
   */
  conditionComment?: string;

  /** Whether or not this offer is available via Prime shipping. Can be used as an FBA ("Fulfillment by Amazon") indicator as well. */
  isPrime: boolean;

  /** If the price of this offer is hidden on Amazon due to a MAP ("minimum advertised price") restriction. */
  isMAP: boolean;

  /**
   * Indicates whether or not the offer is currently shippable.
   * If not, this could mean, for example, that it is temporarily out of stock or a pre-order.
   */
  isShippable: boolean;

  /** Indicates whether or not the offer is an Add-on item. */
  isAddonItem: boolean;

  /** Indicates whether or not the offer is a pre-order. */
  isPreorder: boolean;

  /** Indicates whether or not the offer is an Amazon Warehouse Deal. */
  isWarehouseDeal: boolean;

  /** Indicates whether or not our system identified that the offering merchant attempts to scam users. */
  isScam: boolean;

  /** Indicates whether or not the offer ships from China. */
  shipsFromChina: boolean;

  /**
   * True if the seller is Amazon (e.g. "Amazon.com").
   *
   * Note: Amazon's Warehouse Deals seller account or other accounts Amazon is maintaining under a different name are not considered to be Amazon.
   */
  isAmazon: boolean;

  /** Whether or not this offer is fulfilled by Amazon (FBA). */
  isFBA: boolean;

  /** This offer has a discounted Prime exclusive price. A Prime exclusive offer can only be ordered if the buyer has an active Prime subscription. */
  isPrimeExcl: boolean;

  /**
   * Contains the Prime exclusive price history of this offer, if available.
   * A Prime exclusive offer can only be ordered if the buyer has an active Prime subscription.
   * Format: `[Keepa time minutes, price, ...]`
   *
   * Most recent Prime exclusive price: `primeExclCSV[primeExclCSV.length - 1]`
   */
  primeExclCSV?: number[];

  /**
   * Contains the available stock of this offer as well as, if available, the stock's history.
   * Format: `[Keepa time minutes, stock, ...]`
   *
   * Most recent stock: `stockCSV[stockCSV.length - 1]`
   */
  stockCSV?: number[];

  /** Minimum order quantity. `0` if unknown. */
  minOrderQty: number;

  /**
   * Contains one-time coupon details of this offer. Undefined if none is available.
   *
   * - Positive integer for an absolute discount.
   * - Negative integer for a percentage discount.
   *
   * @example
   * `500` - Coupon with a $5 discount.
   * `-15` - Coupon with a 15% discount.
   */
  coupon?: number;

  /**
   * Contains the coupon history of this offer, if available.
   * Format: `[Keepa time minutes, coupon, ...]`
   */
  couponHistory?: number[];
};

/**
 * The condition of the offered product.
 */
export enum OfferCondition {
  UNKNOWN,
  NEW,
  USED_NEW,
  USED_VERY_GOOD,
  USED_GOOD,
  USED_ACCEPTABLE,
  REFURBISHED,
  COLLECTIBLE_NEW,
  COLLECTIBLE_VERY_GOOD,
  COLLECTIBLE_GOOD,
  COLLECTIBLE_ACCEPTABLE,
}

/**
 * Maps `OfferCondition` to corresponding `CsvType`.
 */
export function getCorrespondingCsvType(
  condition: OfferCondition
): string | undefined {
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

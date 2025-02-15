import { VariationAttributeObject } from './Product';

export interface LightningDeal {
  /**
   * The domainId of the products Amazon locale
   * {@link AmazonLocale}
   */
  domainId: number;

  /**
   * States the time of our last data collection of this lighting deal, in Keepa Time minutes.
   * Use {@link KeepaTime.keepaMinuteToUnixInMillis} to get an uncompressed timestamp (Unix epoch time).
   */
  lastUpdate: number;

  /** The ASIN of the product */
  asin?: string;

  /** Title of the product. Caution: may contain HTML markup in rare cases. */
  title?: string;

  /** The seller id of the merchant offering this deal. */
  sellerName?: string;

  /** The name of seller offering this deal. */
  sellerId?: string;

  /** A unique ID for this deal. */
  dealId?: string;

  /**
   * The discounted price of this deal. Available once the deal has started.
   * -1 if the deal’s state is upcoming. The price is an integer of the respective Amazon locale’s smallest currency unit (e.g. euro cents or yen).
   */
  dealPrice: number;

  /**
   * The regular price of this product. Available once the deal has started.
   * -1 if the deal’s state is upcoming. The price is an integer of the respective Amazon locale’s smallest currency unit (e.g. euro cents or yen).
   */
  currentPrice: number;

  /** The name of the primary image of the product. Undefined if not available. */
  image?: string;

  /** Whether or not the deal is Prime eligible. */
  isPrimeEligible: boolean;

  /** Whether or not the deal is fulfilled by Amazon. */
  isFulfilledByAmazon: boolean;

  /** Whether or not the price is restricted by MAP (Minimum Advertised Price). */
  isMAP: boolean;

  /** The rating of the product. A rating is an integer from 0 to 50 (e.g. 45 = 4.5 stars). */
  rating: number;

  /** The product’s review count. */
  totalReviews: number;

  /** The state of the deal. */
  dealState: DealState;

  /**
   * The start time of this lighting deal, in Keepa Time minutes.
   * Use {@link KeepaTime.keepaMinuteToUnixInMillis} to get an uncompressed timestamp (Unix epoch time).
   */
  startTime: number;

  /**
   * The end time of this lighting deal, in Keepa Time minutes.
   * Use {@link KeepaTime.keepaMinuteToUnixInMillis} to get an uncompressed timestamp (Unix epoch time).
   */
  endTime: number;

  /**
   * The percentage claimed of the lighting deal. Since lightning deals have limited stock,
   * this number may change fast on Amazon, but due to the delay of our data collection the provided value may be outdated.
   */
  percentClaimed: number;

  /** The provided discount of this deal, according to Amazon. May be in reference to the list price, not the current price. */
  percentOff: number;

  /** The dimension attributes of this deal. */
  variation?: VariationAttributeObject[];
}

enum DealState {
  AVAILABLE,
  UPCOMING,
  WAITLIST,
  SOLDOUT,
  WAITLISTFULL,
  EXPIRED,
  SUPPRESSED,
}

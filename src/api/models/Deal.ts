import { Category } from './Category';

/**
 * About:
 * A Deal object represents a product that has recently changed (usually in price or sales rank).
 * It contains a summary of the product and information about the changes.
 *
 * Returned by:
 * The Deal object is returned by the Browsing Deals request.
 */
export interface Deal {
  /** The ASIN of the product */
  asin?: string;

  /** Title of the product. Caution: may contain HTML markup in rare cases. */
  title?: string;

  /**
   * Contains the absolute difference between the current value and the average value of the respective date range interval.
   * The value 0 means it did not change or could not be calculated.
   * First dimension uses {@link CsvType}, second dimension {@link DealInterval}
   */
  delta?: number[][];

  /**
   * Same as {@link delta}, but given in percent instead of absolute values.
   * First dimension uses {@link CsvType}, second dimension {@link DealInterval}
   */
  deltaPercent?: number[][];

  /**
   * Contains the absolute difference of the current and the previous price / rank.
   * The value 0 means it did not change or could not be calculated.
   * Uses {@link CsvType} indexing
   */
  deltaLast?: number[];

  /**
   * Contains the weighted averages in the respective date range and price type.
   * Note: The day interval (index 0) is actually the average of the last 48 hours, not 24 hours.
   * First dimension uses {@link CsvType}, second dimension {@link DealInterval}
   */
  avg?: number[][];

  /**
   * Contains the prices / ranks of the product at the last update time.
   * Uses {@link CsvType} indexing
   */
  current?: number[];

  /** Category node id {@link Category#catId} of the product's root category */
  rootCat?: number;

  /**
   * States the time this deal was found, in Keepa Time minutes.
   * Use {@link KeepaTime.keepaMinuteToUnixInMillis} to get an uncompressed timestamp.
   */
  creationDate?: number;

  /** The name of the main product image */
  image?: Uint8Array;

  /** Array of Amazon category node ids {@link Category#catId} this product is listed in. Can be empty. */
  categories?: number[];

  /**
   * States the last time we have updated the information for this deal, in Keepa Time minutes.
   * Use {@link KeepaTime.keepaMinuteToUnixInMillis} to get an uncompressed timestamp.
   */
  lastUpdate?: number;

  /**
   * States the time this lightning deal is scheduled to end, in Keepa Time minutes.
   * Only applicable to lightning deals. 0 otherwise.
   */
  lightningEnd?: number;

  /**
   * Limit to products with a minimum rating (A rating is an integer from 0 to 50, e.g. 45 = 4.5 stars).
   * If -1, the filter is inactive.
   */
  minRating?: number;

  /**
   * The {@link OfferCondition} condition of the cheapest warehouse deal of this product.
   * 0 - Unknown
   * 2 - Used - Like New
   * 3 - Used - Very Good
   * 4 - Used - Good
   * 5 - Used - Acceptable
   */
  warehouseCondition?: number;

  /** The offer comment of the cheapest warehouse deal of this product. null if no warehouse deal found. */
  warehouseConditionComment?: string;

  /**
   * The timestamp indicating the starting point from which the {@link current} value has been in effect.
   * Uses {@link CsvType} indexing.
   */
  currentSince?: number[];
}

/**
 * Available deal ranges.
 */
export enum DealInterval {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  _90_DAYS = '90_DAYS',
}

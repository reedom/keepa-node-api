/**
 * A best sellers ASIN list of a specific category.
 *
 * Returned by: Request Best Sellers
 */
export class BestSellers {
  /**
   * Integer value for the Amazon locale this category belongs to.
   * @see AmazonLocale
   */
  domainId: number;

  /**
   * States the last time the list was updated, in Keepa Time minutes.
   * Use `KeepaTime.keepaMinuteToUnixInMillis(int)` to convert to Unix epoch time.
   * @see KeepaTime.keepaMinuteToUnixInMillis
   */
  lastUpdate: number;

  /**
   * The category node ID used by Amazon.
   * Represents the identifier of the category.
   * Also part of the `Product` object's `categories` and `rootCategory` fields.
   * Always a positive number or `0` if a product group was used.
   * @see Product.categories
   * @see Product.rootCategory
   */
  categoryId: number;

  /**
   * An ASIN list. The list starts with the best-selling product (lowest sales rank).
   */
  asinList?: string[];

  constructor(
    domainId: number,
    lastUpdate: number,
    categoryId: number,
    asinList?: string[]
  ) {
    this.domainId = domainId;
    this.lastUpdate = lastUpdate;
    this.categoryId = categoryId;
    this.asinList = asinList;
  }
}

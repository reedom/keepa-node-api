/**
 * Category structure representing an Amazon category.
 */
export interface Category {
  /**
   * Integer value for the Amazon locale this category belongs to.
   * @see AmazonLocale
   */
  domainId: number;

  /**
   * The category node id used by Amazon. Represents the identifier of the category.
   * Also part of the Product object's categories and rootCategory fields.
   * Always a positive number.
   */
  catId: number;

  /**
   * The name of the category.
   */
  name: string;

  /**
   * The context-free category name.
   */
  contextFreeName: string;

  /**
   * The websiteDisplayGroup - available for most root categories.
   */
  websiteDisplayGroup: string;

  /**
   * List of all subcategories. `undefined` or an empty array if the category has no subcategories.
   */
  children?: number[];

  /**
   * The parent category's ID. Always a positive number.
   * If it is `0`, the category is a root category and has no parent category.
   */
  parent: number;

  /**
   * The highest (root category) sales rank we have observed of a product
   * that is listed in this category.
   * Note: Estimate, as the value is from the Keepa product database
   * and not retrieved from Amazon.
   */
  highestRank: number;

  /**
   * The lowest (root category) sales rank we have observed of a product
   * that is listed in this category.
   * Note: Estimate, as the value is from the Keepa product database
   * and not retrieved from Amazon.
   */
  lowestRank: number;

  /**
   * Number of products that are listed in this category.
   * Note: Estimate, as the value is from the Keepa product database
   * and not retrieved from Amazon.
   */
  productCount: number;

  /**
   * Determines if this category functions as a standard browse node,
   * rather than serving promotional purposes (for example, 'Specialty Stores').
   */
  isBrowseNode: boolean;
}

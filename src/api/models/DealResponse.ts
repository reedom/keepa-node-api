import { Deal } from './Deal';

/**
 * The response of a browse deals request.
 *
 * Each deal product is listed in one root category. The three fields `categoryIds`, `categoryNames`, and `categoryCount`
 * contain information about those categories. The values of the same index in those arrays belong together, so the first
 * category entry would have the id `categoryIds[0]`, the name `categoryNames[0]`, and the deals count `categoryCount[0]`.
 * If the root category of a product could not be determined, it will be listed in the category with the name "?"
 * with the id `9223372036854775807`.
 */
export type DealResponse = {
  /**
   * Ordered array of all deal objects matching your query.
   */
  dr?: Deal[];

  /**
   * Not yet used / placeholder
   */
  drDateIndex?: Uint8Array;

  /**
   * Contains all root categoryIds of the matched deal products.
   */
  categoryIds?: number[];

  /**
   * Contains all root category names of the matched deal products.
   */
  categoryNames?: string[];

  /**
   * Contains how many deal products in the respective root category are found.
   */
  categoryCount?: number[];
};

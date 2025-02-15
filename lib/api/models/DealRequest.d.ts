/**
 * Required by the Browsing Deals request.
 * The queryJSON contains all request parameters. It must be URL encoded if the GET format is used.
 * To quickly get a valid queryJSON, there is a link on the deals page26 below the filters that generates this JSON for the current selection.
 */
export declare class DealRequest {
    /**
     * Most deal queries have more than 150 results (which is the maximum page size).
     * To browse all deals found by a query (which is cached for 120 seconds),
     * you iterate the page parameter and keep all other parameters identical.
     * You start with page 0 and stop when the response contains less than 150 results.
     */
    page?: number;
    /**
     * The domainId of the products Amazon locale {@link AmazonLocale}
     */
    domainId?: number;
    /**
     * Determines the type of the deal. Even though it is an integer array, it can contain only one entry.
     * Multiple types per query are not yet supported.
     * Uses {@link CsvType} coding. Only those applicable with {@link CsvType#isDealRelevant} set to true.
     */
    priceTypes?: number[];
    /**
     * Include only products for which the specified price type is at its lowest value (since tracking began).
     */
    isLowest?: boolean;
    /**
     * Include only products for which the specified price type is at its lowest value in the past 90 days.
     */
    isLowest90?: boolean;
    /**
     * Include only products if the selected price type is the lowest of all New offers (applicable to Amazon and Marketplace New).
     */
    isLowestOffer?: boolean;
    /**
     * Our deals are divided into different sets, determined by the time interval in which the product changed.
     * The shorter the interval, the more recent the change; which is good for big price drops but bad for slow incremental drops that accumulate over a longer period.
     * For most deals, the shorter intervals can be considered as subsets of the longer intervals. To find more deals use the longer intervals.
     *
     * Possible values:
     * - `0` - day: the last 24 hours
     * - `1` - week: the last 24 * 7 hours
     * - `2` - month: the last 24 * 31 hours
     * - `3` - 90 days: the last 24 * 90 hours
     */
    dateRange?: number;
    /**
     * Limit the range of the absolute difference between the current value and the one at the beginning of the chosen dateRange interval.
     * Example: `[0,999]` (= no minimum difference, maximum difference of $9.99).
     */
    deltaRange?: number[];
    /**
     * Used to exclude products that are listed in these categories.
     * If it is a sub-category, the product must be directly listed in this category.
     * It will not exclude products in child categories of the specified ones, unless it is a root category.
     * Array with category node ids14.
     */
    excludeCategories?: number[];
    /**
     * Used to only include products that are listed in these categories.
     * If it is a sub-category, the product must be directly listed in this category.
     * It will not include products in child categories of the specified ones, unless it is a root category.
     * Array with category node ids14.
     */
    includeCategories?: number[];
    /**
     * Same as deltaRange, but given in percent instead of absolute values.
     * Minimum percent is 10, for Sales Rank it is 80.
     * Example: `[30,80]` (= between 30% and 80%).
     */
    deltaPercentRange?: number[];
    /**
     * Limit the range of the current value of the price type.
     * Example: `[105,50000]` (= minimum price $1.05, maximum price $500, or a rank between 105 and 50000).
     */
    currentRange?: number[];
    /**
     * Select deals by a keywords-based product title search.
     * The search is case-insensitive and supports multiple keywords which, if specified and separated by a space, must all match.
     *
     * Examples:
     * `"samsung galaxy"` matches all products which have the character sequences "samsung" AND "galaxy" within their title.
     */
    titleSearch?: string;
    /**
     * Only include products which were out of stock within the last 24 hours and can now be ordered.
     */
    isBackInStock?: boolean;
    /**
     * Only include products which were available to order within the last 24 hours and now out of stock.
     */
    isOutOfStock?: boolean;
    /**
     * Switch to enable the range options.
     */
    isRangeEnabled?: boolean;
    /**
     * Excludes all products that are listed as adult items.
     */
    filterErotic?: boolean;
    /**
     * Determines the sort order of the retrieved deals.
     * To invert the sort order, use negative values.
     *
     * Possible sort by values:
     * - `1` - deal age. Newest deals first, not invertible.
     * - `2` - absolute delta (difference between the current value and the one at the beginning of the chosen dateRange interval). Sort order is highest delta to lowest.
     * - `3` - sales rank. Sort order is lowest rank to highest.
     * - `4` - percentage delta (the percentage difference between the current value and the one at the beginning of the chosen dateRange interval). Sort order is highest percent to lowest.
     */
    sortType?: number;
    /**
     * Limit the Sales Rank range of the product.
     * Identical to currentRange if price type is set to Sales Rank.
     * If you want to keep the upper bound open, you can specify `-1` (which will translate to the maximum signed integer value).
     *
     * Important note: Once this range option is used, all products with no Sales Rank will be excluded. Set it to `null` to not use it.
     *
     * Examples:
     * - `[0,5000]` (= only products which have a sales rank between 0 and 5000)
     * - `[5000,-1]` (= higher than 5000)
     */
    salesRankRange?: number[];
    /**
     * Switch to enable the filter options.
     */
    isFilterEnabled?: boolean;
    /**
     * Limit the range of the absolute difference between the current value and previous one.
     * Example: `[100,500]` (= last change between one $1 and $5).
     */
    deltaLastRange?: number[];
    /**
     * If true, excludes all products with no reviews. If false, the filter is inactive.
     */
    hasReviews?: boolean;
    categorySearch?: string;
    isPrimeExclusive?: boolean;
    mustHaveAmazonOffer?: boolean;
    mustNotHaveAmazonOffer?: boolean;
    minRating?: number;
    warehouseConditions?: number[];
    singleVariation?: boolean;
    material?: string[];
    type?: string[];
    manufacturer?: string[];
    brand?: string[];
    productGroup?: string[];
    model?: string[];
    color?: string[];
    size?: string[];
    unitType?: string[];
    scent?: string[];
    itemForm?: string[];
    pattern?: string[];
    style?: string[];
    itemTypeKeyword?: string[];
    targetAudienceKeyword?: string[];
    edition?: string[];
    format?: string[];
    author?: string[];
    binding?: string[];
    languages?: string[][];
    toString(): string;
}

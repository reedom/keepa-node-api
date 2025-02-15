/**
 * Contains statistic values.
 * Only set if the stats parameter was used in the Product Request. Part of the {@link Product}
 */
export interface Stats {
    /**
     * Contains the prices / ranks of the product of the time we last updated it.
     * Uses {@link CsvType} indexing.
     * The price is an integer of the respective Amazon locale's smallest currency unit (e.g., euro cents or yen).
     * If no offer was available in the given interval (e.g., out of stock), the price has the value -1.
     */
    current?: number[];
    /**
     * Contains the weighted mean for the interval specified in the product request's stats parameter.
     * Uses {@link CsvType} indexing.
     * If no offer was available in the given interval or there is insufficient data, it has the value -1.
     */
    avg?: number[];
    /**
     * Contains the weighted mean for the last 30 days.
     * Uses {@link CsvType} indexing.
     * If no offer was available in the given interval or there is insufficient data, it has the value -1.
     */
    avg30?: number[];
    /**
     * Contains the weighted mean for the last 90 days.
     * Uses {@link CsvType} indexing.
     * If no offer was available in the given interval or there is insufficient data, it has the value -1.
     */
    avg90?: number[];
    /**
     * Contains the weighted mean for the last 180 days.
     * Uses {@link CsvType} indexing.
     * If no offer was available in the given interval or there is insufficient data, it has the value -1.
     */
    avg180?: number[];
    /**
     * Contains the weighted mean for the last 365 days.
     * Uses {@link CsvType} indexing.
     * If no offer was available in the given interval or there is insufficient data, it has the value -1.
     */
    avg365?: number[];
    /**
     * Contains the prices registered at the start of the interval specified in the product request's stats parameter.
     * Uses {@link CsvType} indexing.
     * If no offer was available in the given interval or there is insufficient data, it has the value -1.
     */
    atIntervalStart?: number[];
    /**
     * Contains the lowest prices registered for this product.
     * First dimension uses {@link CsvType} indexing.
     * Second dimension is either `undefined` if there is no data available for the price type, or
     * an array of size 2, where the first value is the time of the extreme point (in Keepa time minutes) and the second is the respective extreme value.
     * Use {@link KeepaTime.keepaMinuteToUnixInMillis} to get an uncompressed timestamp (Unix epoch time).
     */
    min?: number[][];
    /**
     * Contains the lowest prices registered in the interval specified in the product request's stats parameter.
     * First dimension uses {@link CsvType} indexing.
     * Second dimension is either `undefined` if there is no data available for the price type, or
     * an array of size 2, where the first value is the time of the extreme point (in Keepa time minutes) and the second is the respective extreme value.
     * Use {@link KeepaTime.keepaMinuteToUnixInMillis} to get an uncompressed timestamp (Unix epoch time).
     */
    minInInterval?: number[][];
    /**
     * Contains the highest prices registered for this product.
     * First dimension uses {@link CsvType} indexing.
     * Second dimension is either `undefined` if there is no data available for the price type, or
     * an array of size 2, where the first value is the time of the extreme point (in Keepa time minutes) and the second is the respective extreme value.
     * Use {@link KeepaTime.keepaMinuteToUnixInMillis} to get an uncompressed timestamp (Unix epoch time).
     */
    max?: number[][];
    /**
     * Contains the highest prices registered in the interval specified in the product request's stats parameter.
     * First dimension uses {@link CsvType} indexing.
     * Second dimension is either `undefined` if there is no data available for the price type, or
     * an array of size 2, where the first value is the time of the extreme point (in Keepa time minutes) and the second is the respective extreme value.
     * Use {@link KeepaTime.keepaMinuteToUnixInMillis} to get an uncompressed timestamp (Unix epoch time).
     */
    maxInInterval?: number[][];
    /**
     * Whether the current price is the all-time lowest price.
     * Uses {@link CsvType} indexing.
     */
    isLowest?: boolean[];
    /**
     * Whether the current price is the lowest price in the last 90 days.
     * Uses {@link CsvType} indexing.
     */
    isLowest90?: boolean[];
    /**
     * Number of times in the last 30 days Amazon went out of stock.
     */
    outOfStockCountAmazon30?: number;
    /**
     * Number of times in the last 90 days Amazon went out of stock.
     */
    outOfStockCountAmazon90?: number;
    /**
     * Contains the difference in percent between the current monthlySold value and the average value of the last 90 days.
     * The value `0` means it did not change or could not be calculated.
     */
    deltaPercent90_monthlySold?: number;
    /**
     * Contains the out-of-stock percentage in the interval specified in the product request's stats parameter.
     * Uses {@link CsvType} indexing.
     * It has the value `-1` if there is insufficient data or the CsvType is not a price.
     * Examples: `0 = never was out of stock`, `100 = was out of stock 100% of the time`, `25 = was out of stock 25% of the time`
     */
    outOfStockPercentageInInterval?: number[];
    /**
     * Contains the 90-day out-of-stock percentage.
     * Uses {@link CsvType} indexing.
     * It has the value `-1` if there is insufficient data or the CsvType is not a price.
     * Examples: `0 = never was out of stock`, `100 = was out of stock 100% of the time`, `25 = was out of stock 25% of the time`
     */
    outOfStockPercentage90?: number[];
    /**
     * Contains the 30-day out-of-stock percentage.
     * Uses {@link CsvType} indexing.
     * It has the value `-1` if there is insufficient data or the CsvType is not a price.
     * Examples: `0 = never was out of stock`, `100 = was out of stock 100% of the time`, `25 = was out of stock 25% of the time`
     */
    outOfStockPercentage30?: number[];
}
/**
 * Contains Buy Box statistics for the specified interval.
 */
export interface BuyBoxStatsObject {
    /** An approximation of the percentage the seller won the buy box. */
    percentageWon: number;
    /** Average price of the Buy Box offer of this seller. */
    avgPrice: number;
    /** Average "New" offer count during the time the seller held the Buy Box. */
    avgNewOfferCount: number;
    /** Whether or not this offer is fulfilled by Amazon. */
    isFBA: boolean;
    /** Last time the seller won the buy box. */
    lastSeen: number;
}

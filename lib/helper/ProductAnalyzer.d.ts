import { CsvType } from '../api/models/Product';
/**
 * Provides methods to work on the Keepa price history CSV format.
 */
export declare class ProductAnalyzer {
    /**
     * Finds the extreme point in the specified interval.
     * @param csv - Value/price history CSV.
     * @param start - Start of the interval (Keepa time minutes), can be 0.
     * @param end - End of the interval (Keepa time minutes), can be in the future (Number.MAX_VALUE).
     * @param type - The type of the CSV data. If the CSV includes shipping costs, the extreme point will be the landing price (price + shipping).
     * @returns Extreme points (time, lowest value/price, time, highest value/price) in the given interval or [-1, -1, -1, -1] if no extreme point was found.
     */
    static getExtremePointsInIntervalWithTime(csv: number[], start: number, end: number, type: CsvType): number[];
    /**
     * Get the last value/price change.
     *
     * @param csv - value/price history csv
     * @param type - the type of the csv data. If the csv includes shipping costs the extreme point will be the landing price (price + shipping).
     * @returns the last value/price change delta. If the csv includes shipping costs it will be the delta of the the landing prices (price + shipping).
     */
    static getDeltaLast(csv: number[], type: CsvType): number;
    /**
     * Get the last value/price.
     *
     * @param csv - value/price history csv
     * @param type - the type of the csv data.
     * @returns the last value/price. If the csv includes shipping costs it will be the landing price (price + shipping).
     */
    static getLast(csv: number[], type: CsvType): number;
    /**
     * Get the time (keepa time minutes) of the last entry. This does not correspond to the last update time, but to the last time we registered a price/value change.
     *
     * @param csv  value/price history csv
     * @param type the type of the csv data.
     * @return keepa time minutes of the last entry
     */
    static getLastTime(csv: number[], type: CsvType): number;
    /**
     * Retrieves the value or price at a specified time.
     *
     * @param csv - The price history CSV array.
     * @param time - The time (Keepa time in minutes) to look up the price or value.
     * @param type - The type of CSV data.
     * @returns The price or value of the product at the given time, or -1 if no value is found or the product was out of stock.
     *          If the CSV includes shipping costs, the result will be the total landing price (price + shipping).
     */
    static getValueAtTime(csv: number[], time: number, type: CsvType): number;
    /**
     * Retrieves the price and shipping cost at a specified time.
     *
     * @param csv - The price history CSV array including shipping costs.
     * @param time - The time (Keepa time in minutes) to look up the price and shipping.
     * @returns An array [price, shipping] of the product at the given time, or [-1, -1] if no value is found or the product was out of stock.
     */
    static getPriceAndShippingAtTime(csv: number[], time: number): number[];
    /**
     * Get the last price and shipping cost.
     *
     * @param csv price with shipping history csv
     * @return int[price, shipping] - the last price and shipping cost.
     */
    static getLastPriceAndShipping(csv: number[]): number[];
    /**
     * Retrieves the closest value or price at a specified time.
     *
     * @param csv - The price history CSV array.
     * @param time - The time (Keepa time in minutes) to begin the search.
     * @param type - The type of CSV data.
     * @returns The closest price or value found to the specified time, or -1 if no value is found.
     *          If the CSV includes shipping costs, the result will be the total landing price (price + shipping).
     */
    static getClosestValueAtTime(csv: number[], time: number, type: CsvType): number;
    /**
     * Finds the lowest and highest value/price of the CSV history.
     *
     * @param csv - The price history CSV array.
     * @param type - The type of CSV data.
     * @returns An array [low, high]. If the CSV includes shipping costs, the extreme points will be the landing price (price + shipping).
     *          Returns [-1, -1] if insufficient data is available.
     */
    static getLowestAndHighest(csv: number[], type: CsvType): number[];
    /**
     * Finds the lowest and highest value/price of the CSV history including the dates of occurrence (in Keepa time minutes).
     *
     * @param csv - The price history CSV array.
     * @param type - The type of CSV data.
     * @returns An array [low time, low value, high time, high value]. If the CSV includes shipping costs,
     *          the extreme points will be the landing price (price + shipping).
     *          Returns [-1, -1, -1, -1] if insufficient data is available.
     */
    static getLowestAndHighestWithTime(csv: number[], type: CsvType): number[];
    /**
     * Returns a weighted mean of the product's CSV history in the last X days.
     *
     * @param csv - The price history CSV array.
     * @param now - The current Keepa time in minutes.
     * @param days - The number of days for which the weighted mean is calculated (e.g., 90 days, 60 days, 30 days).
     * @param type - The type of CSV data.
     * @returns The weighted mean or -1 if the history CSV length is insufficient (less than a day).
     *          If the CSV includes shipping costs, it will be the weighted mean of the landing price (price + shipping).
     */
    static calcWeightedMean(csv: number[], now: number, days: number, type: CsvType): number;
    /**
     * Calculates the weighted mean of a product's CSV history within a given time interval.
     *
     * @param csv - The price history CSV array.
     * @param now - The current Keepa time in minutes.
     * @param start - The start time for the interval.
     * @param end - The end time for the interval.
     * @param type - The type of CSV data.
     * @returns The weighted mean or -1 if the history CSV length is insufficient. If the CSV includes shipping costs,
     *          it will be the weighted mean of the landing price (price + shipping).
     */
    static getWeightedMeanInInterval(csv: number[], now: number, start: number, end: number, type: CsvType): number;
    /**
     * Returns true if the product was out of stock in the given period.
     *
     * @param csv - The price history CSV array.
     * @param start - The start time for the interval (Keepa time in minutes), can be 0.
     * @param end - The end time for the interval (Keepa time in minutes), can be in the future.
     * @param type - The type of CSV data.
     * @returns True if out of stock during the interval, false otherwise, or null if the CSV is too short to determine.
     */
    static getOutOfStockInInterval(csv: number[], start: number, end: number, type: CsvType): boolean | null;
    /**
     * Returns the percentage of time the product was out of stock in the given period.
     *
     * @param csv - The price history CSV array.
     * @param now - The current Keepa time in minutes.
     * @param start - The start time for the interval (Keepa time in minutes), can be 0.
     * @param end - The end time for the interval (Keepa time in minutes), can be in the future.
     * @param type - The type of CSV data.
     * @param trackingSince - The product object's tracking start time.
     * @returns Percentage between 0 and 100, or -1 if insufficient data. 100 means fully out of stock in the interval.
     */
    static getOutOfStockPercentageInInterval(csv: number[], now: number, start: number, end: number, type: CsvType, trackingSince: number): number;
}

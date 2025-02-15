import { CsvType } from '../api/models/Product';

/**
 * Provides methods to work on the Keepa price history CSV format.
 */
export class ProductAnalyzer {
  /**
   * Finds the extreme point in the specified interval.
   * @param csv - Value/price history CSV.
   * @param start - Start of the interval (Keepa time minutes), can be 0.
   * @param end - End of the interval (Keepa time minutes), can be in the future (Number.MAX_VALUE).
   * @param type - The type of the CSV data. If the CSV includes shipping costs, the extreme point will be the landing price (price + shipping).
   * @returns Extreme points (time, lowest value/price, time, highest value/price) in the given interval or [-1, -1, -1, -1] if no extreme point was found.
   */
  static getExtremePointsInIntervalWithTime(
    csv: number[],
    start: number,
    end: number,
    type: CsvType
  ): number[] {
    if (!csv || end <= start || csv.length < (type.isWithShipping ? 6 : 4)) {
      return [-1, -1, -1, -1];
    }

    const extremeValue = [-1, Number.MAX_VALUE, -1, -1];
    const lastTime = this.getLastTime(csv, type);
    const firstTime = csv[0];
    if (lastTime === -1 || firstTime === -1 || end < firstTime) {
      return [-1, -1, -1, -1];
    }

    if (start < firstTime) {
      start = firstTime;
    }

    const loopIncrement = type.isWithShipping ? 3 : 2;
    const adjustedIndex = type.isWithShipping ? 2 : 1;

    for (let i = 1, j = csv.length; i < j; i += loopIncrement) {
      let c = csv[i];
      const date = csv[i - 1];
      if (end <= date) {
        break;
      }

      if (c === -1) {
        continue;
      }

      if (type.isWithShipping) {
        const s = csv[i + 1];
        c += s < 0 ? 0 : s;
      }

      if (start <= date) {
        if (c < extremeValue[1]) {
          extremeValue[1] = c;
          extremeValue[0] = csv[i - 1];
        }
        if (extremeValue[3] < c) {
          extremeValue[3] = c;
          extremeValue[2] = csv[i - 1];
        }
      } else {
        let isValid = false;
        if (i === j - adjustedIndex) {
          isValid = true;
        } else {
          const nextDate = csv[i + adjustedIndex];
          if (start <= nextDate || end <= nextDate) {
            isValid = true;
          }
        }

        if (isValid) {
          if (c < extremeValue[1]) {
            extremeValue[1] = c;
            extremeValue[0] = start;
          }

          if (extremeValue[3] < c) {
            extremeValue[3] = c;
            extremeValue[2] = start;
          }
        }
      }
    }

    return extremeValue[1] === Number.MAX_VALUE
      ? [-1, -1, -1, -1]
      : extremeValue;
  }

  /**
   * Get the last value/price change.
   *
   * @param csv - value/price history csv
   * @param type - the type of the csv data. If the csv includes shipping costs the extreme point will be the landing price (price + shipping).
   * @returns the last value/price change delta. If the csv includes shipping costs it will be the delta of the the landing prices (price + shipping).
   */
  static getDeltaLast(csv: number[], type: CsvType): number {
    if (type.isWithShipping) {
      if (
        !csv ||
        csv.length < 6 ||
        csv[csv.length - 1] === -1 ||
        csv[csv.length - 5] === -1
      ) {
        return 0;
      }

      let v = csv[csv.length - 5];
      let s = csv[csv.length - 4];
      const totalLast = v < 0 ? v : v + (s < 0 ? 0 : s);

      v = csv[csv.length - 2];
      s = csv[csv.length - 1];
      const totalCurrent = v < 0 ? v : v + (s < 0 ? 0 : s);

      return totalCurrent - totalLast;
    } else {
      if (
        !csv ||
        csv.length < 4 ||
        csv[csv.length - 1] === -1 ||
        csv[csv.length - 3] === -1
      ) {
        return 0;
      }
      return csv[csv.length - 1] - csv[csv.length - 3];
    }
  }

  /**
   * Get the last value/price.
   *
   * @param csv - value/price history csv
   * @param type - the type of the csv data.
   * @returns the last value/price. If the csv includes shipping costs it will be the landing price (price + shipping).
   */
  static getLast(csv: number[], type: CsvType): number {
    if (!csv || csv.length === 0) return -1;

    if (type.isWithShipping) {
      const s = csv[csv.length - 1];
      const v = csv[csv.length - 2];
      return v < 0 ? v : v + (s < 0 ? 0 : s);
    }

    return csv[csv.length - 1];
  }

  /**
   * Get the time (keepa time minutes) of the last entry. This does not correspond to the last update time, but to the last time we registered a price/value change.
   *
   * @param csv  value/price history csv
   * @param type the type of the csv data.
   * @return keepa time minutes of the last entry
   */
  static getLastTime(csv: number[], type: CsvType): number {
    return !csv || csv.length === 0
      ? -1
      : csv[csv.length - (type.isWithShipping ? 3 : 2)];
  }

  /**
   * Retrieves the value or price at a specified time.
   *
   * @param csv - The price history CSV array.
   * @param time - The time (Keepa time in minutes) to look up the price or value.
   * @param type - The type of CSV data.
   * @returns The price or value of the product at the given time, or -1 if no value is found or the product was out of stock.
   *          If the CSV includes shipping costs, the result will be the total landing price (price + shipping).
   */
  static getValueAtTime(csv: number[], time: number, type: CsvType): number {
    if (!csv || csv.length === 0) {
      return -1;
    }
    let i = 0;

    const loopIncrement = type.isWithShipping ? 3 : 2;
    for (; i < csv.length; i += loopIncrement) {
      if (time < csv[i]) {
        break;
      }
    }

    if (csv.length < i) {
      return this.getLast(csv, type);
    }
    if (i < loopIncrement) {
      return -1;
    }

    if (type.isWithShipping) {
      const v = csv[i - 2];
      const s = csv[i - 1];
      return v < 0 ? v : v + (s < 0 ? 0 : s);
    }

    return csv[i - 1];
  }

  /**
   * Retrieves the price and shipping cost at a specified time.
   *
   * @param csv - The price history CSV array including shipping costs.
   * @param time - The time (Keepa time in minutes) to look up the price and shipping.
   * @returns An array [price, shipping] of the product at the given time, or [-1, -1] if no value is found or the product was out of stock.
   */
  static getPriceAndShippingAtTime(csv: number[], time: number): number[] {
    if (!csv || csv.length === 0) {
      return [-1, -1];
    }
    let i = 0;

    for (; i < csv.length; i += 3) {
      if (time < csv[i]) {
        break;
      }
    }

    if (csv.length < i) {
      return this.getLastPriceAndShipping(csv);
    }
    if (i < 3) {
      return [-1, -1];
    }

    return [csv[i - 2], csv[i - 1]];
  }

  /**
   * Get the last price and shipping cost.
   *
   * @param csv price with shipping history csv
   * @return int[price, shipping] - the last price and shipping cost.
   */
  static getLastPriceAndShipping(csv: number[]): number[] {
    if (!csv || csv.length < 3) {
      return [-1, -1];
    }
    return [csv[csv.length - 2], csv[csv.length - 1]];
  }

  /**
   * Retrieves the closest value or price at a specified time.
   *
   * @param csv - The price history CSV array.
   * @param time - The time (Keepa time in minutes) to begin the search.
   * @param type - The type of CSV data.
   * @returns The closest price or value found to the specified time, or -1 if no value is found.
   *          If the CSV includes shipping costs, the result will be the total landing price (price + shipping).
   */
  static getClosestValueAtTime(
    csv: number[],
    time: number,
    type: CsvType
  ): number {
    if (!csv || csv.length === 0) {
      return -1;
    }
    let i = 0;
    const loopIncrement = type.isWithShipping ? 3 : 2;

    for (; i < csv.length; i += loopIncrement) {
      if (time < csv[i]) {
        break;
      }
    }

    if (csv.length < i) {
      return this.getLast(csv, type);
    }
    if (i < loopIncrement) {
      if (type.isWithShipping) {
        if (csv.length < 4) {
          const v = csv[2];
          const s = csv[1];
          return v < 0 ? v : v + (s < 0 ? 0 : s);
        } else {
          i += 3;
        }
      } else {
        if (csv.length < 3) {
          return csv[1];
        } else {
          i += 2;
        }
      }
    }

    if (type.isWithShipping) {
      if (csv[i - 2] !== -1) {
        const v = csv[i - 2];
        const s = csv[i - 1];
        return v < 0 ? v : v + (s < 0 ? 0 : s);
      } else {
        for (; i < csv.length; i += loopIncrement) {
          if (csv[i - 2] !== -1) {
            break;
          }
        }
        if (csv.length < i) {
          return this.getLast(csv, type);
        }
        if (i < 3) {
          return -1;
        }
        const v = csv[i - 2];
        const s = csv[i - 1];
        return v < 0 ? v : v + (s < 0 ? 0 : s);
      }
    } else {
      if (csv[i - 1] !== -1) {
        return csv[i - 1];
      } else {
        for (; i < csv.length; i += 2) {
          if (csv[i - 1] !== -1) {
            break;
          }
        }
        if (csv.length < i) {
          return this.getLast(csv, type);
        }
        if (i < 2) {
          return -1;
        }
        return csv[i - 1];
      }
    }
  }

  /**
   * Finds the lowest and highest value/price of the CSV history.
   *
   * @param csv - The price history CSV array.
   * @param type - The type of CSV data.
   * @returns An array [low, high]. If the CSV includes shipping costs, the extreme points will be the landing price (price + shipping).
   *          Returns [-1, -1] if insufficient data is available.
   */
  static getLowestAndHighest(csv: number[], type: CsvType): number[] {
    const minMax = this.getExtremePointsInIntervalWithTime(
      csv,
      0,
      Number.MAX_VALUE,
      type
    );
    return [minMax[1], minMax[3]];
  }

  /**
   * Finds the lowest and highest value/price of the CSV history including the dates of occurrence (in Keepa time minutes).
   *
   * @param csv - The price history CSV array.
   * @param type - The type of CSV data.
   * @returns An array [low time, low value, high time, high value]. If the CSV includes shipping costs,
   *          the extreme points will be the landing price (price + shipping).
   *          Returns [-1, -1, -1, -1] if insufficient data is available.
   */
  static getLowestAndHighestWithTime(csv: number[], type: CsvType): number[] {
    return this.getExtremePointsInIntervalWithTime(
      csv,
      0,
      Number.MAX_VALUE,
      type
    );
  }

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
  static calcWeightedMean(
    csv: number[],
    now: number,
    days: number,
    type: CsvType
  ): number {
    return this.getWeightedMeanInInterval(
      csv,
      now,
      now - Math.floor(days * 24 * 60),
      now,
      type
    );
  }

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
  static getWeightedMeanInInterval(
    csv: number[],
    now: number,
    start: number,
    end: number,
    type: CsvType
  ): number {
    let avg = -1;
    if (end <= start || !csv || csv.length === 0) {
      return -1;
    }

    const size = csv.length;
    const loopIncrement = type.isWithShipping ? 3 : 2;

    const lastTime = this.getLastTime(csv, type);
    const firstTime = csv[0];

    if (lastTime === -1 || firstTime === -1 || end < firstTime) {
      return -1;
    }

    let count = 0;

    if (start < firstTime) {
      start = firstTime;
    }
    if (now < end) {
      end = now;
    }

    const adjustedIndex = type.isWithShipping ? 2 : 1;
    for (let i = 1; i < size; i += loopIncrement) {
      const date = csv[i - 1];
      if (end <= date) {
        break;
      }

      let c = csv[i];
      if (c < 0) {
        continue;
      }

      if (type.isWithShipping) {
        const s = csv[i + 1];
        c += Math.max(s, 0);
      }

      if (start <= date) {
        if (i === 1 && i + adjustedIndex === size) {
          return c;
        }

        let nextDate =
          i + adjustedIndex === size ? now : csv[i + adjustedIndex];
        if (end < nextDate) {
          nextDate = end;
        }

        const tmpCount = nextDate - date;
        count += tmpCount;
        avg += c * tmpCount;
      } else {
        if (i === size - adjustedIndex || end <= csv[i + adjustedIndex]) {
          return c;
        }

        const nextDate = csv[i + adjustedIndex];
        if (start <= nextDate) {
          count = nextDate - start;
          avg = c * count;
        }
      }
    }

    if (-1 < avg) {
      avg = count !== 0 ? Math.floor(avg / count) : -1;
    }

    return avg;
  }

  /**
   * Returns true if the product was out of stock in the given period.
   *
   * @param csv - The price history CSV array.
   * @param start - The start time for the interval (Keepa time in minutes), can be 0.
   * @param end - The end time for the interval (Keepa time in minutes), can be in the future.
   * @param type - The type of CSV data.
   * @returns True if out of stock during the interval, false otherwise, or null if the CSV is too short to determine.
   */
  static getOutOfStockInInterval(
    csv: number[],
    start: number,
    end: number,
    type: CsvType
  ): boolean | null {
    if (type.isWithShipping) {
      if (!csv || csv.length < 6) {
        return null;
      }
    } else if (end <= start || !csv || csv.length < 4) {
      return null;
    }

    const loopIncrement = type.isWithShipping ? 3 : 2;
    for (let i = 0; i < csv.length; i += loopIncrement) {
      const date = csv[i];
      if (date <= start) {
        continue;
      }
      if (end <= date) {
        break;
      }
      if (csv[i + 1] === -1) {
        return true;
      }
    }

    return false;
  }

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
  static getOutOfStockPercentageInInterval(
    csv: number[],
    now: number,
    start: number,
    end: number,
    type: CsvType,
    trackingSince: number
  ): number {
    if (!type.isPrice) {
      return -1;
    }
    if (end <= start) {
      return -1;
    }
    if (!csv || csv.length === 0) {
      return -1;
    }

    const size = csv.length;
    const loopIncrement = type.isWithShipping ? 3 : 2;
    const lastTime = this.getLastTime(csv, type);
    const firstTime = csv[0];

    if (
      lastTime === -1 ||
      firstTime === -1 ||
      end < firstTime ||
      end < trackingSince
    ) {
      return -1;
    }

    let count = 0;

    if (start < trackingSince) {
      start = trackingSince;
    }
    if (now < end) {
      end = now;
    }

    const adjustedIndex = type.isWithShipping ? 2 : 1;

    for (let i = 1; i < size; i += loopIncrement) {
      const c = csv[i];
      const date = csv[i - 1];

      if (end <= date) {
        break;
      }

      if (c === -1) {
        continue;
      }
      if (start <= date) {
        if (i === 1 && i + adjustedIndex === size) {
          return 0;
        }

        let nextDate: number;
        if (i + adjustedIndex == size) {
          nextDate = Math.min(now, end);
        } else {
          nextDate = csv[i + adjustedIndex];
          if (end < nextDate) {
            nextDate = end;
          }
        }

        const tmpCount = nextDate - date;
        count += tmpCount;
      } else {
        if (i == size - adjustedIndex) {
          return 0;
        } else {
          const nextDate = csv[i + adjustedIndex];
          if (end <= nextDate) {
            return 0;
          }
          if (start <= nextDate) {
            count = nextDate - start;
          }
        }
      }
    }

    if (0 < count) {
      count = 100 - Math.floor((count * 100) / (end - start));
    } else if (count === 0) {
      count = 100;
    }

    return count;
  }
}

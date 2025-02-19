import { describe, expect, it } from 'vitest';
import { CsvType } from '../../api/models/Product';
import { ProductAnalyzer } from '../ProductAnalyzer';

describe('ProductAnalyzer', () => {
  const csvTypeWithoutShipping: CsvType = {
    isWithShipping: false,
    isPrice: true,
    index: 0,
    isExtraData: false,
    isDealRelevant: false,
  };

  // Common CSV data for tests
  const csvWithoutShipping = [0, 100, 10, 200, 20, 300];
  const csvWithShipping = [
    0, 100, 5, 10, 200, 6, 20, 300, 7, 30, 400, 8, 40, 500, 9,
  ];

  describe('getExtremePointsInIntervalWithTime', () => {
    it('should return [-1, -1, -1, -1] for null csv', () => {
      expect(
        ProductAnalyzer.getExtremePointsInIntervalWithTime({
          csv: null,
          start: 0,
          end: 100,
          type: csvTypeWithoutShipping,
        })
      ).toEqual([-1, -1, -1, -1]);
    });

    it('should return correct extreme points for valid csv', () => {
      expect(
        ProductAnalyzer.getExtremePointsInIntervalWithTime({
          csv: csvWithoutShipping,
          start: 0,
          end: 30,
          type: csvTypeWithoutShipping,
        })
      ).toEqual([0, 100, 20, 300]);
    });
  });

  describe('getDeltaLast', () => {
    it('should return 0 for null csv', () => {
      expect(
        ProductAnalyzer.getDeltaLast({
          csv: null,
          type: csvTypeWithoutShipping,
        })
      ).toBe(0);
    });

    it('should return correct delta for valid csv', () => {
      expect(
        ProductAnalyzer.getDeltaLast({
          csv: csvWithoutShipping,
          type: csvTypeWithoutShipping,
        })
      ).toBe(100);
    });
  });

  describe('getLast', () => {
    it('should return -1 for null csv', () => {
      expect(
        ProductAnalyzer.getLast({
          csv: null,
          type: csvTypeWithoutShipping,
        })
      ).toBe(-1);
    });

    it('should return last value for valid csv', () => {
      expect(
        ProductAnalyzer.getLast({
          csv: csvWithoutShipping,
          type: csvTypeWithoutShipping,
        })
      ).toBe(300);
    });
  });

  describe('getLastTime', () => {
    it('should return -1 for null csv', () => {
      expect(
        ProductAnalyzer.getLastTime({
          csv: null,
          type: csvTypeWithoutShipping,
        })
      ).toBe(-1);
    });

    it('should return last time for valid csv', () => {
      expect(
        ProductAnalyzer.getLastTime({
          csv: csvWithoutShipping,
          type: csvTypeWithoutShipping,
        })
      ).toBe(20);
    });
  });

  describe('getValueAtTime', () => {
    it('should return -1 for null csv', () => {
      expect(
        ProductAnalyzer.getValueAtTime({
          csv: null,
          time: 5,
          type: csvTypeWithoutShipping,
        })
      ).toBe(-1);
    });

    it('should return correct value at specified time', () => {
      expect(
        ProductAnalyzer.getValueAtTime({
          csv: csvWithoutShipping,
          time: 5,
          type: csvTypeWithoutShipping,
        })
      ).toBe(100);
    });
  });

  describe('getPriceAndShippingAtTime', () => {
    it('should return [-1, -1] for null csv', () => {
      expect(
        ProductAnalyzer.getPriceAndShippingAtTime({
          csv: null,
          time: 5,
        })
      ).toEqual([-1, -1]);
    });

    it('should return correct price and shipping at specified time', () => {
      expect(
        ProductAnalyzer.getPriceAndShippingAtTime({
          csv: csvWithShipping,
          time: 15,
        })
      ).toEqual([200, 6]);
    });
  });

  describe('getLowestAndHighest', () => {
    it('should return [-1, -1] for null csv', () => {
      expect(
        ProductAnalyzer.getLowestAndHighest({
          csv: null,
          type: csvTypeWithoutShipping,
        })
      ).toEqual([-1, -1]);
    });

    it('should return correct lowest and highest values', () => {
      expect(
        ProductAnalyzer.getLowestAndHighest({
          csv: csvWithoutShipping,
          type: csvTypeWithoutShipping,
        })
      ).toEqual([100, 300]);
    });
  });

  describe('calcWeightedMean', () => {
    it('should return -1 for null csv', () => {
      expect(
        ProductAnalyzer.calcWeightedMean({
          csv: null,
          now: 0,
          days: 30,
          type: csvTypeWithoutShipping,
        })
      ).toBe(-1);
    });

    it('should return correct weighted mean for valid csv', () => {
      expect(
        ProductAnalyzer.calcWeightedMean({
          csv: csvWithoutShipping,
          now: 2 * 24 * 60,
          days: 30,
          type: csvTypeWithoutShipping,
        })
      ).toBe(298);
    });
  });
  // Additional tests for other methods can be added here using the common CSV data
});

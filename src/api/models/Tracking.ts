import { AmazonLocale } from './AmazonLocale';
import { CsvType } from './Product';

/**
 * Represents a Tracking Object.
 */
export interface Tracking {
  /**
   * The tracked product ASIN.
   */
  asin?: string;

  /**
   * Creation date of the tracking in {@link KeepaTime} minutes.
   */
  createDate: number;

  /**
   * The time to live in hours until the tracking expires and is deleted.
   * When setting the value through the _Add Tracking_ request, it is in relation to the time of request.
   * When retrieving the tracking object, it is relative to the `createDate`.
   * Possible values:
   * - Any positive integer: time to live in hours.
   * - `0`: never expires.
   * - Any negative integer (only when setting the value):
   *   - If tracking already exists: keep the original `ttl`.
   *   - If tracking is new: use the absolute value as `ttl`.
   */
  ttl: number;

  /**
   * Trigger a notification if tracking expires or is removed by the system (e.g., product deprecated).
   */
  expireNotify: boolean;

  /**
   * The main Amazon locale of this tracking determines the currency used for all desired prices.
   * Integer value for the Amazon locale.
   * @see AmazonLocale
   */
  mainDomainId: number;

  /**
   * Contains all settings for price or value-related tracking criteria.
   */
  thresholdValues?: TrackingThresholdValue[];

  /**
   * Contains specific meta tracking criteria, like out of stock.
   */
  notifyIf?: TrackingNotifyIf[];

  /**
   * Determines through which channels notifications will be sent.
   * Must be a boolean array with the length of the `NotificationType` enum.
   * Uses NotificationType indexing.
   * @see NotificationType
   * `true` means the channel will be used.
   */
  notificationType?: boolean[];

  /**
   * A history of past notifications of this tracking.
   * Each past notification consists of 5 entries, in the format:
   * [{@link AmazonLocale}, {@link CsvType}, {@link NotificationType}, {@link TrackingNotificationCause}, {@link KeepaTime}]
   */
  notificationCSV?: number[];

  /**
   * A tracking-specific rearm timer.
   * - `-1`: use default notification timer of the user account (changeable via the website settings).
   * - `0`: never notify a desired price more than once.
   * - `> 0`: rearm the desired price after `x` minutes.
   */
  individualNotificationInterval: number;

  /**
   * Whether or not the tracking is active.
   * A tracking is automatically deactivated if the corresponding API account is no longer sufficiently paid for.
   */
  isActive: boolean;

  /**
   * The update interval, in hours. Determines how often the system will trigger a product update.
   */
  updateInterval: number;

  /**
   * The meta data of this tracking (max length is 500 characters).
   * Used to assign some text to this tracking, like a user reference or a memo.
   */
  metaData?: string;
}

/**
 * Available notification channels.
 */
export enum NotificationType {
  EMAIL,
  TWITTER,
  FACEBOOK_NOTIFICATION,
  BROWSER,
  FACEBOOK_MESSENGER_BOT,
  API,
  MOBILE_APP,
  DUMMY,
}

/**
 * The cause that triggered a notification.
 */
export enum TrackingNotificationCause {
  EXPIRED,
  DESIRED_PRICE,
  PRICE_CHANGE,
  PRICE_CHANGE_AFTER_DESIRED_PRICE,
  OUT_STOCK,
  IN_STOCK,
  DESIRED_PRICE_AGAIN,
}

/**
 * Available notification meta trigger types.
 */
export enum NotifyIfType {
  OUT_OF_STOCK,
  BACK_IN_STOCK,
}

/**
 * Represents a desired price - a {@link CsvType} of a specific {@link AmazonLocale} to be monitored.
 */
export class TrackingThresholdValue {
  /**
   * The history of threshold values (or desired prices). Only for existing tracking.
   * Format: [{@link KeepaTime}, value]
   */
  thresholdValueCSV?: number[];

  /**
   * The threshold value (or desired price). Only for creating a tracking!
   */
  thresholdValue: number;

  /**
   * Integer value of the {@link AmazonLocale} this threshold value belongs to.
   * Regardless of the locale, the threshold value is always in the currency of the mainDomainId.
   */
  domain: number;

  /**
   * Integer value of the {@link CsvType} for this threshold value.
   */
  csvType: number;

  /**
   * Whether or not this tracking threshold value tracks value drops (`true`) or value increases (`false`).
   */
  isDrop: boolean;

  /**
   * Not yet available.
   */
  minDeltaAbsolute?: number;

  /**
   * Not yet available.
   */
  minDeltaPercentage?: number;

  /**
   * Not yet available.
   */
  deltasAreBetweenNotifications: boolean;

  constructor(
    domainId: AmazonLocale,
    csvType: CsvType,
    thresholdValue: number,
    isDrop: boolean,
    minDeltaAbsolute?: number,
    minDeltaPercentage?: number,
    deltasAreBetweenNotifications = false
  ) {
    this.domain = domainId as number;
    this.csvType = csvType.index;
    this.thresholdValue = thresholdValue;
    this.isDrop = isDrop;
    this.minDeltaAbsolute = minDeltaAbsolute;
    this.minDeltaPercentage = minDeltaPercentage;
    this.deltasAreBetweenNotifications = deltasAreBetweenNotifications;
  }
}

/**
 * Represents specific, meta tracking criteria.
 */
export class TrackingNotifyIf {
  /**
   * Integer value of the {@link AmazonLocale} for this NotifyIf.
   */
  domain: number;

  /**
   * The {@link CsvType} for this threshold value.
   */
  csvType: number;

  /**
   * The {@link NotifyIfType}.
   */
  notifyIfType: number;

  constructor(
    domainId: AmazonLocale,
    csvType: CsvType,
    notifyIfType: NotifyIfType
  ) {
    this.domain = domainId as number;
    this.csvType = csvType.index;
    this.notifyIfType = notifyIfType as number;
  }
}

import { AmazonLocale } from './AmazonLocale';
import { TrackingNotifyIf, TrackingThresholdValue } from './Tracking';

/**
 * Required by the Add Tracking request.
 */
export class TrackingRequest {
  /**
   * The product ASIN to track
   */
  asin: string;

  /**
   * The time to live in hours until the tracking expires and is deleted.
   * When setting the value through the _Add Tracking_ request, it is in relation to the time of request.
   * Possible values:
   * - Any positive integer: time to live in hours
   * - `0`: never expires
   * - Any negative integer:
   *   - If tracking already exists: keep the original `ttl`
   *   - If tracking is new: use the absolute value as `ttl`
   */
  ttl: number = 24 * 365 * 2;

  /**
   * Trigger a notification if tracking expires or is removed by the system (e.g., product deprecated).
   */
  expireNotify = false;

  /**
   * Whether or not all desired prices are in the currency of the mainDomainId.
   * If `false`, they will be converted.
   */
  desiredPricesInMainCurrency = true;

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
   * Uses NotificationType indexing.
   * @see Tracking.NotificationType
   * `true` means the channel will be used.
   */
  notificationType?: boolean[];

  /**
   * A tracking-specific rearm timer.
   * - `-1`: use default notification timer of the user account (changeable via website settings)
   * - `0`: never notify a desired price more than once
   * - `> 0`: rearm the desired price after `x` minutes
   */
  individualNotificationInterval = -1;

  /**
   * The update interval, in hours. Determines how often the system will trigger a product update.
   * A setting of `1` hour will not trigger an update exactly every 60 minutes, but as close to that as it is efficient for the system.
   * Throughout a day, it will be updated 24 times, but the updates are not perfectly distributed.
   * Possible values: Any integer between `0` and `25`. Default is `1`.
   */
  updateInterval = 1;

  /**
   * Meta data of this tracking (max length is 500 characters).
   * You can use this to store any string with this tracking.
   */
  metaData?: string;

  constructor(
    asin: string,
    mainDomainId: AmazonLocale,
    updateInterval: number
  ) {
    this.asin = asin;
    this.mainDomainId = mainDomainId as number;
    this.updateInterval = updateInterval < 1 ? 1 : updateInterval;
  }
}

/**
 * Represents a price alert
 */
export type Notification = {
  /**
   * The notified product ASIN
   */
  asin?: string;

  /**
   * Title of the product. Caution: may contain HTML markup in rare cases.
   */
  title: string;

  /**
   * The main image name of the product. Full Amazon image path:
   * https://m.media-amazon.com/images/I/_image name_
   */
  image: string;

  /**
   * Creation date of the notification in {@link KeepaTime} minutes
   */
  createDate: number;

  /**
   * The main Amazon locale of the tracking which determines the currency used for all prices of this notification.
   * Integer value for the Amazon locale {@link AmazonLocale}
   */
  domainId: number;

  /**
   * The Amazon locale which triggered the notification.
   * Integer value for the Amazon locale {@link AmazonLocale}
   */
  notificationDomainId: number;

  /**
   * The {@link Product.CsvType} which triggered the notification.
   */
  csvType: number;

  /**
   * The {@link Tracking.TrackingNotificationCause} of the notification.
   */
  trackingNotificationCause: number;

  /**
   * Contains the prices / values of the product at the time this notification was created.
   * Uses {@link Product.CsvType} indexing.
   * The price is an integer of the respective Amazon locale's smallest currency unit (e.g., euro cents or yen).
   * If no offer was available in the given interval (e.g., out of stock), the price has the value `-1`.
   */
  currentPrices: number[];

  /**
   * States through which notification channels ({@link Tracking.NotificationType}) this notification was delivered.
   */
  sentNotificationVia: boolean[];

  /**
   * The meta data of the tracking.
   */
  metaData: string;
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackingNotifyIf = exports.TrackingThresholdValue = exports.NotifyIfType = exports.TrackingNotificationCause = exports.NotificationType = void 0;
/**
 * Available notification channels.
 */
var NotificationType;
(function (NotificationType) {
    NotificationType[NotificationType["EMAIL"] = 0] = "EMAIL";
    NotificationType[NotificationType["TWITTER"] = 1] = "TWITTER";
    NotificationType[NotificationType["FACEBOOK_NOTIFICATION"] = 2] = "FACEBOOK_NOTIFICATION";
    NotificationType[NotificationType["BROWSER"] = 3] = "BROWSER";
    NotificationType[NotificationType["FACEBOOK_MESSENGER_BOT"] = 4] = "FACEBOOK_MESSENGER_BOT";
    NotificationType[NotificationType["API"] = 5] = "API";
    NotificationType[NotificationType["MOBILE_APP"] = 6] = "MOBILE_APP";
    NotificationType[NotificationType["DUMMY"] = 7] = "DUMMY";
})(NotificationType = exports.NotificationType || (exports.NotificationType = {}));
/**
 * The cause that triggered a notification.
 */
var TrackingNotificationCause;
(function (TrackingNotificationCause) {
    TrackingNotificationCause[TrackingNotificationCause["EXPIRED"] = 0] = "EXPIRED";
    TrackingNotificationCause[TrackingNotificationCause["DESIRED_PRICE"] = 1] = "DESIRED_PRICE";
    TrackingNotificationCause[TrackingNotificationCause["PRICE_CHANGE"] = 2] = "PRICE_CHANGE";
    TrackingNotificationCause[TrackingNotificationCause["PRICE_CHANGE_AFTER_DESIRED_PRICE"] = 3] = "PRICE_CHANGE_AFTER_DESIRED_PRICE";
    TrackingNotificationCause[TrackingNotificationCause["OUT_STOCK"] = 4] = "OUT_STOCK";
    TrackingNotificationCause[TrackingNotificationCause["IN_STOCK"] = 5] = "IN_STOCK";
    TrackingNotificationCause[TrackingNotificationCause["DESIRED_PRICE_AGAIN"] = 6] = "DESIRED_PRICE_AGAIN";
})(TrackingNotificationCause = exports.TrackingNotificationCause || (exports.TrackingNotificationCause = {}));
/**
 * Available notification meta trigger types.
 */
var NotifyIfType;
(function (NotifyIfType) {
    NotifyIfType[NotifyIfType["OUT_OF_STOCK"] = 0] = "OUT_OF_STOCK";
    NotifyIfType[NotifyIfType["BACK_IN_STOCK"] = 1] = "BACK_IN_STOCK";
})(NotifyIfType = exports.NotifyIfType || (exports.NotifyIfType = {}));
/**
 * Represents a desired price - a {@link CsvType} of a specific {@link AmazonLocale} to be monitored.
 */
class TrackingThresholdValue {
    constructor(domainId, csvType, thresholdValue, isDrop, minDeltaAbsolute, minDeltaPercentage, deltasAreBetweenNotifications = false) {
        this.domain = domainId;
        this.csvType = csvType.index;
        this.thresholdValue = thresholdValue;
        this.isDrop = isDrop;
        this.minDeltaAbsolute = minDeltaAbsolute;
        this.minDeltaPercentage = minDeltaPercentage;
        this.deltasAreBetweenNotifications = deltasAreBetweenNotifications;
    }
}
exports.TrackingThresholdValue = TrackingThresholdValue;
/**
 * Represents specific, meta tracking criteria.
 */
class TrackingNotifyIf {
    constructor(domainId, csvType, notifyIfType) {
        this.domain = domainId;
        this.csvType = csvType.index;
        this.notifyIfType = notifyIfType;
    }
}
exports.TrackingNotifyIf = TrackingNotifyIf;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeepaTime = void 0;
/**
 * Keepa Time - Unix Time Converter Helper Class
 */
class KeepaTime {
    /**
     * Get the current time in Keepa hours.
     */
    static nowHours() {
        return this.unixInMillisToKeepaHour(Date.now());
    }
    /**
     * Get the current time in Keepa minutes.
     */
    static nowMinutes() {
        return this.unixInMillisToKeepaMinutes(Date.now());
    }
    /**
     * Convert Unix timestamp (milliseconds) to Keepa minutes.
     */
    static unixInMillisToKeepaMinutes(unix) {
        return Math.floor(unix / (60 * 1000)) - this.keepaStartMinute;
    }
    /**
     * Convert Unix timestamp (milliseconds) to Keepa hours.
     */
    static unixInMillisToKeepaHour(unix) {
        return Math.floor(unix / (60 * 60 * 1000)) - this.keepaStartHour;
    }
    /**
     * Convert Keepa hours to Unix timestamp in milliseconds.
     */
    static keepaHourToUnixInMillis(hour) {
        return hour * 60 * 60 * 1000 + this.keepaStartHour * 60 * 60 * 1000;
    }
    /**
     * Convert Keepa minutes to Unix timestamp in milliseconds.
     */
    static keepaMinuteToUnixInMillis(minute) {
        const min = typeof minute === 'string' ? parseInt(minute, 10) : minute;
        return min * 60 * 1000 + this.keepaStartMinute * 60 * 1000;
    }
}
exports.KeepaTime = KeepaTime;
KeepaTime.keepaStartHour = 359400;
KeepaTime.keepaStartMinute = 21564000;

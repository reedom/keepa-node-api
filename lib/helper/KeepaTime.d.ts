/**
 * Keepa Time - Unix Time Converter Helper Class
 */
export declare class KeepaTime {
    static keepaStartHour: number;
    static keepaStartMinute: number;
    /**
     * Get the current time in Keepa hours.
     */
    static nowHours(): number;
    /**
     * Get the current time in Keepa minutes.
     */
    static nowMinutes(): number;
    /**
     * Convert Unix timestamp (milliseconds) to Keepa minutes.
     */
    static unixInMillisToKeepaMinutes(unix: number): number;
    /**
     * Convert Unix timestamp (milliseconds) to Keepa hours.
     */
    static unixInMillisToKeepaHour(unix: number): number;
    /**
     * Convert Keepa hours to Unix timestamp in milliseconds.
     */
    static keepaHourToUnixInMillis(hour: number): number;
    /**
     * Convert Keepa minutes to Unix timestamp in milliseconds.
     */
    static keepaMinuteToUnixInMillis(minute: number | string): number;
}

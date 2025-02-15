/**
 * Keepa Time - Unix Time Converter Helper Class
 */
export class KeepaTime {
  public static keepaStartHour = 359400;
  public static keepaStartMinute = 21564000;

  /**
   * Get the current time in Keepa hours.
   */
  public static nowHours(): number {
    return this.unixInMillisToKeepaHour(Date.now());
  }

  /**
   * Get the current time in Keepa minutes.
   */
  public static nowMinutes(): number {
    return this.unixInMillisToKeepaMinutes(Date.now());
  }

  /**
   * Convert Unix timestamp (milliseconds) to Keepa minutes.
   */
  public static unixInMillisToKeepaMinutes(unix: number): number {
    return Math.floor(unix / (60 * 1000)) - this.keepaStartMinute;
  }

  /**
   * Convert Unix timestamp (milliseconds) to Keepa hours.
   */
  public static unixInMillisToKeepaHour(unix: number): number {
    return Math.floor(unix / (60 * 60 * 1000)) - this.keepaStartHour;
  }

  /**
   * Convert Keepa hours to Unix timestamp in milliseconds.
   */
  public static keepaHourToUnixInMillis(hour: number): number {
    return hour * 60 * 60 * 1000 + this.keepaStartHour * 60 * 60 * 1000;
  }

  /**
   * Convert Keepa minutes to Unix timestamp in milliseconds.
   */
  public static keepaMinuteToUnixInMillis(minute: number | string): number {
    const min = typeof minute === 'string' ? parseInt(minute, 10) : minute;
    return min * 60 * 1000 + this.keepaStartMinute * 60 * 1000;
  }
}

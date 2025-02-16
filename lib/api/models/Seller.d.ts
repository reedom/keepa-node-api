export type Seller = {
    /** States the time we have started tracking this seller, in Keepa Time minutes. */
    trackedSince: number;
    /** The domainId of the product's Amazon locale */
    domainId: number;
    /** The seller id of the merchant. Example: "A2L77EE7U53NWQ" */
    sellerId: string;
    /** The name of seller. Example: "Amazon Warehouse Deals" */
    sellerName?: string;
    /** Two dimensional history array that contains history data for this seller. */
    csv?: number[][] | undefined;
    /** States the time of our last update of this seller, in Keepa Time minutes. */
    lastUpdate: number;
    /** Indicates whether or not this seller is identified as a scammer. */
    isScammer: boolean;
    /** Indicates whether or not this seller ships from China. */
    shipsFromChina: boolean;
    /** Indicates whether or not the seller currently has FBA listings. */
    hasFBA: boolean;
    /** Contains the number of storefront ASINs if available and the last update. */
    totalStorefrontAsins?: number[];
    /** String array containing up to 100,000 storefront ASINs. */
    asinList?: string[];
    /** Contains the last time each ASIN in the `asinList` was verified. */
    asinListLastSeen?: number[];
    /** Contains the total amount of listings of this seller, with historical data. */
    totalStorefrontAsinsCSV?: number[];
    /** Statistics about the primary categories of this seller. */
    sellerCategoryStatistics?: MerchantCategoryStatistics[];
    /** Statistics about the primary brands of this seller. */
    sellerBrandStatistics?: MerchantBrandStatistics[];
    /** The business address. The last entry contains the country code. */
    address?: string[];
    /** Contains up to 5 of the most recent customer feedbacks. */
    recentFeedback?: FeedbackObject[];
    /** States the time of our last rating data update of this seller, in Keepa Time minutes. */
    lastRatingUpdate: number;
    /** Contains the neutral percentage ratings for different periods. */
    neutralRating?: number[];
    /** Contains the negative percentage ratings for different periods. */
    negativeRating?: number[];
    /** Contains the positive percentage ratings for different periods. */
    positiveRating?: number[];
    /** Contains the rating counts for different periods. */
    ratingCount?: number[];
    /** Customer service address, with the last entry as the country code. */
    customerServicesAddress?: string[];
    /** The Trade Register Number. */
    tradeNumber?: string;
    /** The business name. */
    businessName?: string;
    /** The VAT number. */
    vatID?: string;
    /** The phone number. */
    phoneNumber?: string;
    /** The business type. */
    businessType?: string;
    /** The share capital. */
    shareCapital?: string;
    /** The name of the business representative. */
    representative?: string;
    /** The email address of the business. */
    email?: string;
    /** The current rating. */
    currentRating: number;
    /** The current rating count. */
    currentRatingCount: number;
    /** Ratings in the last 30 days. */
    ratingsLast30Days: number;
};
export type MerchantBrandStatistics = {
    brand: string;
    productCount: number;
    avg30SalesRank: number;
    productCountWithAmazonOffer: number;
};
export type MerchantCategoryStatistics = {
    catId: number;
    productCount: number;
    avg30SalesRank: number;
    productCountWithAmazonOffer: number;
};
export type FeedbackObject = {
    rating: number;
    date: number;
    feedback?: string;
    isStriked: boolean;
};

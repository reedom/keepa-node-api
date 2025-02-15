import { Offer } from './Offer';
import { Stats } from './Stats';

export interface CategoryTreeEntry {
  catId: number;
  name: string;
}

export interface Product {
  /**
   * The ASIN of the product.
   */
  asin?: string;

  /**
   * The domainId of the product's Amazon locale.
   * @see AmazonLocale
   */
  domainId: number;

  /**
   * The ASIN of the parent product (if the product has variations, otherwise undefined).
   */
  parentAsin?: string;

  /**
   * The history of the parentAsin field.
   * This array follows the format: [Keepa time in minutes, previous parent ASIN, ...].
   * The included timestamp indicates when the previously associated parent ASIN ceased to be valid.
   * For the current parent ASIN, use the `parentAsin` field.
   *
   * To convert a Keepa minute timestamp into an uncompressed Unix epoch time,
   * use {@link KeepaTime.keepaMinuteToUnixInMillis}.
   */
  parentAsinHistory?: string[];

  /**
   * Comma-separated list of variation ASINs of the product (if the product is a parent ASIN, otherwise undefined).
   */
  variationCSV?: string;

  /**
   * A list of UPCs assigned to this product. The first index is the primary UPC.
   */
  upcList?: string[];

  /**
   * A list of EANs assigned to this product. The first index is the primary EAN.
   */
  eanList?: string[];

  /**
   * Comma-separated list of image names of the product.
   * Full Amazon image path: `https://m.media-amazon.com/images/I/_image_name_`
   */
  imagesCSV?: string;

  /**
   * Array of category node IDs.
   */
  categories?: number[];

  /**
   * Category node ID of the product's root category.
   * `0` if no root category is known.
   */
  rootCategory: number;

  /**
   * Manufacturer name.
   */
  manufacturer?: string;

  /**
   * Title of the product. Caution: may contain HTML markup in rare cases.
   */
  title?: string;

  /**
   * Time when tracking started, in Keepa Time minutes.
   * Use {@link KeepaTime.keepaMinuteToUnixInMillis} to get an uncompressed Unix timestamp.
   */
  trackingSince: number;

  /**
   * Time the item was first listed on Amazon, in Keepa Time minutes.
   * If not available, the field has the value `0`.
   */
  listedSince: number;

  /**
   * Brand of the item.
   */
  brand?: string;

  /**
   * The item's product group.
   */
  productGroup?: string;

  /**
   * The item's part number.
   */
  partNumber?: string;

  /**
   * The item's model.
   */
  model?: string;

  /**
   * The item's color.
   */
  color?: string;

  /**
   * The item's size.
   */
  size?: string;

  /**
   * The item's edition.
   */
  edition?: string;

  /**
   * The item's format.
   */
  format?: string;

  /**
   * The item’s author.
   *
   * @deprecated Use the `contributors` field instead.
   */
  author?: string;

  /**
   * The item’s binding. If the item is not a book, this usually represents the product category.
   */
  binding?: string;

  /**
   * Represents the category tree as an ordered array of CategoryTreeEntry objects.
   */
  categoryTree?: CategoryTreeEntry[];

  /**
   * The number of items of this product. -1 if not available.
   */
  numberOfItems: number;

  /**
   * The number of pages of this product. -1 if not available.
   */
  numberOfPages: number;

  /**
   * The item’s publication date in one of the following three formats:<br>
   * YYYY or YYYYMM or YYYYMMDD (Y= year, M = month, D = day)<br>
   * -1 if not available.<br><br>
   * Examples:<br>
   * 1978 = the year 1978<br>
   * 200301 = January 2003<br>
   * 20150409 = April 9th, 2015
   */
  publicationDate: number;

  /**
   * The item’s release date in one of the following three formats:<br>
   * YYYY or YYYYMM or YYYYMMDD (Y= year, M = month, D = day)<br>
   * -1 if not available.<br><br>
   * Examples:<br>
   * 1978 = the year 1978<br>
   * 200301 = January 2003<br>
   * 20150409 = April 9th, 2015
   */
  releaseDate: number;

  /**
   * An item can have one or more languages. Each language entry has a name and a type.
   * Some also have an audio format. null if not available.<br><br>
   * Examples:<br>
   * [ [ “English”, “Published” ], [ “English”, “Original Language” ] ]<br>
   * With audio format:<br>
   * [ [ “Englisch”, “Originalsprache”, “DTS-HD 2.0” ], [ “Deutsch”, null, “DTS-HD 2.0” ] ]
   */
  languages?: string[][];

  /**
   * The contributors of the item. A contributor can be an author, actor, director, etc. Each contributor entry has a name and a role type.<br><br>
   * Example:<br>
   * [ [ “Vin Diesel”, “actor” ] ]
   */
  contributors?: string[][];

  /**
   * A list of the product features / bullet points. null if not available. <br>
   * An entry can contain HTML markup in rare cases. We currently limit each entry to a maximum of 1000 characters<br>
   * (if the feature is longer it will be cut off). This limitation may change in the future without prior notice.
   */
  features?: string[];

  /**
   * A description of the product. null if not available. Most description contain HTML markup.<br>
   * We limit the product description to a maximum of 2000 characters (if the description is<br>
   * longer it will be cut off). This limitation may change in the future without prior notice.
   */
  description?: string;

  /**
   * The package's height in millimeter. 0 or -1 if not available.
   */
  packageHeight: number;

  /**
   * The package's length in millimeter. 0 or -1 if not available.
   */
  packageLength: number;

  /**
   * The package's width in millimeter. 0 or -1 if not available.
   */
  packageWidth: number;

  /**
   * The package's weight in gram. 0 or -1 if not available.
   */
  packageWeight: number;

  /**
   * Quantity of items in a package. 0 or -1 if not available.
   */
  packageQuantity: number;

  /**
   * The item's height in millimeter. 0 or -1 if not available.
   */
  itemHeight: number;

  /**
   * The item's length in millimeter. 0 or -1 if not available.
   */
  itemLength: number;

  /**
   * The item's width in millimeter. 0 or -1 if not available.
   */
  itemWidth: number;

  /**
   * The item's weight in gram. 0 or -1 if not available.
   */
  itemWeight: number;

  /**
   * Contains the lowest priced matching eBay listing Ids.
   * Always contains two entries, the first one is the listing id of the lowest priced listing in new condition,
   * the second in used condition. null or 0 if not available.<br>
   * Example: [ 273344490183, 0 ]
   */
  ebayListingIds?: number[];

  /**
   * Indicates if the item is considered to be for adults only.
   */
  isAdultProduct: boolean;

  /**
   * Whether or not the product is eligible for trade-in.
   */
  isEligibleForTradeIn: boolean;

  /**
   * @deprecated use the field referralFeePercentage instead
   */
  referralFeePercent?: number;

  /**
   * The variable closing fee. Fees are integers of the respective Amazon locale’s smallest currency unit (e.g. euro cents or yen). null if not available.
   * Example: 81
   */
  variableClosingFee?: number;

  /**
   * The product listing URL slug.
   * Example: Ring-Video-Doorbell-Satin-Nickel-2020-Release
   */
  urlSlug?: string;

  /**
   * The ingredient list of the product. null if not available.
   * Example: Purified Carbonated Water, Natural Flavors
   */
  ingredients?: string;

  /**
   * True if this product is an Amazon Haul product. null otherwise.
   * Example: true
   */
  isHaul?: boolean;

  /**
   * The referral fee percent is determined by either the current price or, in the absence of a current offer, the previous one.
   * If neither of these prices is available for reference, the fee percent is calculated based on a standard sales price of 100.00.
   * *null* if not available.
   * Example: 12
   */
  referralFeePercentage?: number;

  /**
   * States the last time we have updated the monthlySold field, in Keepa Time minutes. null if the monthlySold has no value.
   * Use {@link KeepaTime.keepaMinuteToUnixInMillis} to get an uncompressed timestamp (Unix epoch time).
   */
  lastSoldUpdate: number;

  /**
   * How often this product was bought in the past month. This field represents the bought past month metric found on Amazon search result pages.
   * It is not an estimate. null if it has no value. Most ASINs do not have this value set. The value is variation specific.
   * Example: 1000 - the ASIN was bought at least 1000 times in the past month.
   */
  monthlySold: number;

  /**
   * Contains historical values of the monthlySold field. null if it has no value.
   */
  monthlySoldHistory?: number[];

  /**
   * Whether or not the product is eligible for super saver shipping by Amazon (not FBA).
   */
  isEligibleForSuperSaverShipping: boolean;

  /**
   * States the last time we have updated the information for this product, in Keepa Time minutes.<br>
   * Use {@link KeepaTime.keepaMinuteToUnixInMillis} to get an uncompressed timestamp (Unix epoch time).
   */
  lastUpdate: number;

  /**
   * States the last time we have registered a price change (any price kind), in Keepa Time minutes.<br>
   * Use {@link KeepaTime.keepaMinuteToUnixInMillis} to get an uncompressed timestamp (Unix epoch time).
   */
  lastPriceChange: number;

  /**
   * States the last time we have updated the eBay prices for this product, in Keepa Time minutes.<br>
   * If no matching products were found the integer is negative.<br>
   * Use {@link KeepaTime.keepaMinuteToUnixInMillis} to get an uncompressed timestamp (Unix epoch time).
   */
  lastEbayUpdate: number;

  /**
   * The most recent update of the stock data for this product’s offers, in Keepa Time minutes.<br>
   * Has the value 0 unless the stock parameter was used and stock data was collected at least once.
   * Use {@link KeepaTime.keepaMinuteToUnixInMillis} to get an uncompressed timestamp (Unix epoch time).
   */
  lastStockUpdate: number;

  /**
   * States the last time we have updated the product rating and review count, in Keepa Time minutes.<br>
   * Use {@link KeepaTime.keepaMinuteToUnixInMillis} to get an uncompressed timestamp (Unix epoch time).
   */
  lastRatingUpdate: number;

  /**
   * Keepa product type {@link ProductType}. Must always be evaluated first.
   */
  productType: ProductType;

  /**
   * The item’s type. null if not available.
   */
  type?: string;

  /**
   * Whether or not the product has reviews.
   */
  hasReviews: boolean;

  /**
   * Optional field. Only set if the <i>stats</i> parameter was used in the Product Request. Contains statistic values.
   */
  stats?: Stats;

  /**
   * Optional field. Only set if the <i>offers</i> parameter was used in the Product Request.
   */
  offers?: Offer[];

  /**
   * Optional field. Only set if the offers parameter was used in the Product Request.<br>
   * Contains an ordered array of index positions in the offers array for all Marketplace Offer Objects retrieved for this call.<br>
   * The sequence of integers reflects the ordering of the offers on the Amazon offer page (for all conditions).<br>
   * Since the offers field contains historical offers as well as current offers, one can use this array to <br>
   * look up all offers that are currently listed on Amazon in the correct order. <br><br>
   * Example:<br> [ 3, 5, 2, 18, 15 ] - The offer with the array index 3 of the offers field is currently the first <br>
   * one listed on the offer listings page on Amazon, followed by the offer with the index 5, and so on.<br><br>
   * Example with duplicates:<br> [ 3, 5, 2, 18, 5 ] - The second offer, as listed on Amazon, is a lower priced duplicate <br>
   * of the 6th offer on Amazon. The lower priced one is included in the offers field at index 5.
   */
  liveOffersOrder?: number[];

  /**
   * Optional field. Only set if the offers parameter was used in the Product Request.<br>
   * Contains a history of sellerIds that held the Buy Box in the format Keepa time minutes, sellerId, [...].<br>
   * If no seller qualified for the Buy Box the sellerId "-1" is used. If it was hold by an unknown seller (a brand new one) the sellerId is "-2".<br>
   * Example: ["2860926","ATVPDKIKX0DER", …]
   * <p>Use {@link KeepaTime.keepaMinuteToUnixInMillis} to get an uncompressed timestamp (Unix epoch time).</p>
   */
  buyBoxSellerIdHistory?: string[];

  /**
   * Optional field. Only set if the offers or buybox parameter was used in the Product Request.
   * A history of the used buy box winners, containing the sellerIds, offer sub-condition, and FBA status in the format:
   * Keepa time minutes, seller id, condition, isFBA, […].
   * If no seller qualified for the used buy box the sellerId "" (empty String) is used.
   * <p>
   * condition can have the following values:
   * “2” - Used - Like New, “3” - Used - Very Good, “4” - Used - Good, “5” - Used - Acceptable
   * isFBA is either “1” - offer is FBA or “0” - offer is merchant fulfilled.
   * Example: [“2860926”, “ATVPDKIKX0DER”, “4”, “1”, …]
   * <p>Use {@link KeepaTime.keepaMinuteToUnixInMillis} to get an uncompressed timestamp (Unix epoch time).</p>
   */
  buyBoxUsedHistory?: string[];

  /**
   * Only valid if the offers parameter was used in the Product Request.
   * Boolean indicating if the ASIN will be redirected to another one on Amazon
   * (example: the ASIN has the color black variation, which is not available any more
   * and is redirected on Amazon to the color red).
   */
  isRedirectASIN: boolean;

  /**
   * Only valid if the offers parameter was used in the Product Request.
   * Boolean indicating if the product's Buy Box is available for subscribe and save.
   */
  isSNS: boolean;

  /**
   * Suggested Lower Price for the Buy Box, if the buy box is suppressed.
   */
  suggestedLowerPrice?: number;

  /**
   * Competitive Price Threshold (CPT) for the Buy Box, if the buy box is suppressed.
   */
  competitivePriceThreshold?: number;

  /**
   * If buyBoxEligibleOfferCounts is available, it represents an array of integers,
   * each entry indicating the total number of offers eligible for the Buy Box across specified offer conditions and fulfillment channels.
   * This array contains eight elements, indexed as follows:<br>
   * 0: New FBA<br>
   * 1: New FBM<br>
   * 2: Used FBA<br>
   * 3: Used FBM<br>
   * 4: Collectible FBA<br>
   * 5: Collectible FBM<br>
   * 6: Refurbished FBA<br>
   * 7: Refurbished FBM<br>
   */
  buyBoxEligibleOfferCounts?: number[];

  /**
   * The hazardous material type of this product, if applicable.
   */
  hazardousMaterials?: HazardousMaterial[];

  /**
   * Only valid if the offers parameter was used in the Product Request.
   * Boolean indicating if the system was able to retrieve fresh offer information.
   */
  offersSuccessful: boolean;

  /**
   * One or two “Frequently Bought Together” ASINs. null if not available.
   * Field is updated when the offers parameter was used.
   */
  frequentlyBoughtTogether?: string[];

  /**
   * True if this product is an Amazon Merch on Demand product.
   */
  isMerchOnDemand?: boolean;

  /**
   * Indicates if the item is heat sensitive (e.g. meltable).
   */
  isHeatSensitive?: boolean;

  /**
   * Indicates the return rate of this product.<br>
   * - `null` if the return rate is unavailable or average.<br>
   * - `1` for a low return rate.<br>
   * - `2` for a high return rate.
   */
  returnRate?: number;

  /**
   * Contains current promotions for this product.
   * Only Amazon US promotions by Amazon (not 3rd party) are collected.
   * In rare cases data can be incomplete.
   */
  promotions?: PromotionObject[];

  /**
   * Contains the dimension attributes for up to 50 variations of this product.
   * Only available on parent ASINs.
   */
  variations?: VariationObject[];

  /**
   * Availability of the Amazon offer {@link AvailabilityType}.
   */
  availabilityAmazon: AvailabilityType;

  /**
   * Contains coupon details if any are available for the product. null if not available.
   * Integer array with always two entries: The first entry is the discount of a one time coupon, the second is a subscribe and save coupon.
   * Entry value is either 0 if no coupon of that type is offered, positive for an absolute discount or negative for a percentage discount.
   * The coupons field is always accessible, but only updated if the offers parameter was used in the Product Request.
   * <p>Example:<br>
   * [ 200, -15 ] - Both coupon types available: $2 one time discount or 15% for subscribe and save.<br>
   * [ -7, 0 ] - Only one time coupon type is available offering a 7% discount.
   * </p>
   */
  coupon?: number[];

  /**
   * Whether or not the current new price is MAP restricted. Can be used to differentiate out of stock vs. MAP restricted prices (as in both cases the current price is -1).
   */
  newPriceIsMAP: boolean;

  /**
   * FBA fees for this product. If FBA fee information has not yet been collected for this product the field will be null.
   */
  fbaFees?: FBAFeesObject;

  /**
   * Contains subcategory rank histories. Each key represents the categoryId of the rank with the history in the corresponding value.
   */
  salesRanks?: Map<number, number[]>;

  /**
   * The category node id of the main sales rank. -1 if not available.
   */
  salesRankReference: number;

  /**
   * The category node id history of the main sales rank (format: timestamp, categoryId, […]).  null if not available.
   */
  salesRankReferenceHistory?: number[];

  /**
   * If the product is listed in the launchpad.
   */
  launchpad: boolean;

  /**
   * Rental details.
   */
  rentalDetails?: string;

  /**
   * Rental prices.
   */
  rentalPrices?: RentalObject;

  /**
   * Rental seller id.
   */
  rentalSellerId?: string;

  /**
   * Amazon offer shipping delay. Integer array with 2 entries, indicating min and max shipping delay in hours.
   */
  availabilityAmazonDelay?: number[];

  /**
   * Audience rating. The rating suggests the age for which the media is appropriate.
   * <p>Example: PG-13 (Parents Strongly Cautioned)</p>
   */
  audienceRating?: string;

  /**
   * Unit Count information.
   */
  unitCount?: UnitCountObject;

  /**
   * The scent of the product. Describes the fragrance associated with the product.
   * <p>Example: "Lavender"</p>
   */
  scent?: string;

  /**
   * A brief description of the product.
   * <p>Example: "A soothing lavender-scented candle."</p>
   */
  shortDescription?: string;

  /**
   * Active ingredients present in the product.
   * <p>Example: "Lavender essential oil, Soy wax"</p>
   */
  activeIngredients?: string;

  /**
   * Special ingredients used in the product that may have unique properties.
   * <p>Example: "Beeswax blend, Natural dyes"</p>
   */
  specialIngredients?: string;

  /**
   * The form or physical state of the item.
   * <p>Example: "Liquid", "Solid", "Gel"</p>
   */
  itemForm?: string;

  /**
   * Keywords describing the type or category of the item.
   * <p>Example: "body-lotions"</p>
   */
  itemTypeKeyword?: string;

  /**
   * Recommended uses for the product to guide customers.
   * <p>Example: "Aromatherapy, Home Decoration"</p>
   */
  recommendedUsesForProduct?: string;

  /**
   * The pattern or design featured on the product.
   * <p>Example: "Striped", "Floral"</p>
   */
  pattern?: string;

  /**
   * The store name of the item’s brand. null if not available.
   * <p>Example: Hot Wheels</p>
   */
  brandStoreName?: string;

  /**
   * The brand store URL path. null if not available.
   * To get the full URL, prepend the Amazon domain of the respective locale (e.g. https//www.amazon.com).
   * <p>Example: /stores/LEGO/page/017EF856-965D-4B56-A171-EA61CAFF45DD</p>
   */
  brandStoreUrl?: string;

  /**
   * The brand store Name from the URL path. null if not available.
   * <p>Example: LEGO (from the URL: /stores/LEGO/page/017EF856-965D-4B56-A171-EA61CAFF45DD)</p>
   */
  brandStoreUrlName?: string;

  /**
   * Provides metadata for videos associated with the product.
   *
   * <p>The {@code videos} parameter is mandatory for access. Each object in the array represents
   * the metadata for a single video. Metadata can be retrieved for all image carousel videos
   * and up to 10 community videos from the product listing’s Videos section. To request live
   * data for this field, the {@code offers} parameter must also be included. Returns {@code null}
   * if unavailable.</p>
   */
  videos?: Video[];

  /**
   * Provides A+ Content of this product.
   *
   * <p>The {@code aplus} parameter is mandatory for access. To request live
   * data for this field, the {@code offers} parameter must also be included. Returns {@code null}
   * if unavailable.</p>
   */
  aPlus?: APlus[];

  /**
   * Specific uses for the product, providing detailed applications.
   * <p>Example: {"Relaxation", "Decoration"}</p>
   */
  specificUsesForProduct?: string[];

  /**
   * The highest business discount percentage, if available.
   * <p>Example: 14</p>
   */
  businessDiscount?: number;

  /**
   * KeepaTime timestamp of the last business discount percentage update.
   */
  lastBusinessDiscountUpdate?: number;

  /**
   * Safety warnings associated with the product to inform users of potential hazards.
   * <p>Example: "Keep away from open flames."</p>
   */
  safetyWarning?: string;

  /**
   * Benefits of using the product, highlighting its advantages.
   * <p>Example: "Promotes relaxation and stress relief."</p>
   */
  productBenefit?: string;

  /**
   * Indicates whether batteries are required for the product to function.
   * <p>Example: true or false</p>
   */
  batteriesRequired?: boolean;

  /**
   * Indicates whether batteries are included with the product upon purchase.
   * <p>Example: true or false</p>
   */
  batteriesIncluded?: boolean;

  /**
   * Keywords describing the target audience for the product.
   * <p>Example: "Adults, Gift for Her"</p>
   */
  targetAudienceKeyword?: string;

  /**
   * The style of the product, which may influence its aesthetic appeal.
   * <p>Example: "Modern", "Vintage"</p>
   */
  style?: string;

  /**
   * Components included with the product, detailing what is provided upon purchase.
   * <p>Example: "Candle, Wick, Box"</p>
   */
  includedComponents?: string;

  /**
   * Material of the product, specifying the primary substances used in its construction.
   * <p>Example: "Soy Wax, Cotton"</p>
   */
  material?: string;

  /**
   * Integer[][] - two dimensional price history array.<br>
   * First dimension: {@link CsvType}<br>
   * Second dimension:<br>
   * Each array has the format timestamp, price, […]. To get an uncompressed timestamp use {@link KeepaTime#keepaMinuteToUnixInMillis(int)}.<br>
   * Example: "csv[0]": [411180,4900, ... ]<br>
   * timestamp: 411180 => 1318510800000<br>
   * price: 4900 => $ 49.00 (if domainId is 5, Japan, then price: 4900 => ¥ 4900)<br>
   * A price of '-1' means that there was no offer at the given timestamp (e.g. out of stock).
   */
  csv?: number[][];
}

/**
 * Represents a video associated with a product.
 */
export interface Video {
  title: string;

  /**
   * Full Amazon image path:<br>
   * https://m.media-amazon.com/images/I/_image_
   */
  image: string;

  /**
   * in seconds.
   */
  duration: number;
  creator: VideoCreatorType;
  name: string;
  url: string;
}

/**
 * Enum representing the video creator type.
 */
export enum VideoCreatorType {
  Main = 'Main',
  Customer = 'Customer',
  Seller = 'Seller',
  Influencer = 'Influencer',
  Vendor = 'Vendor',
  ThirdParty = 'ThirdParty',
  Amazon = 'Amazon',
  Merchant = 'Merchant',
  Brand = 'Brand',
}

/**
 * Represents A+ Content of a product.
 */
export interface APlus {
  module?: APlusModule[];
  fromManufacturer: boolean;
}

/**
 * Represents an A+ Content module.
 */
export interface APlusModule {
  text?: string[];
  image?: string[];
  video?: string[];
}

/**
 * Represents rental price details.
 */
export interface RentalObject {
  initialPrice: number;
  shortExtnPrice: number;
  longExtnPrice: number;
  fullPrice: number;
}

/**
 * Represents unit count information.
 */
export interface UnitCountObject {
  unitValue?: number;
  unitType?: string;
  eachUnitCount?: number;
}

/**
 * Contains detailed FBA fees. If the total fee is 0 the product does not have (valid) dimensions and thus the fee can not be calculated.
 */
export interface FBAFeesObject {
  storageFee: number;
  storageFeeTax: number;
  pickAndPackFee: number;
  pickAndPackFeeTax: number;
}

/**
 * Represents hazardous material information.
 */
export interface HazardousMaterial {
  aspect: string;
  value: string;
}

/**
 * Represents a promotion for a product.
 */
export interface PromotionObject {
  /**
   * The type of promotion.
   */
  type?: PromotionType;

  amount: number;
  discountPercent: number;
}

/**
 * Represents the type of promotion.
 */
export enum PromotionType {
  SNS = 'SNS',
  PrimeExclusive = 'PrimeExclusive',
}

/**
 * Represents a product variation.
 */
export interface VariationObject {
  /**
   * Variation ASIN.
   */
  asin?: string;

  /**
   * This variation ASIN's dimension attributes.
   */
  attributes?: VariationAttributeObject[];
}

/**
 * Represents a variation attribute.
 */
export interface VariationAttributeObject {
  /**
   * Dimension type, e.g., Color.
   */
  dimension: string;

  /**
   * Dimension value, e.g., Red.
   */
  value: string;
}

/**
 * Enum representing CSV types for various price histories and product attributes.
 */
export const CsvType = {
  /**
   * Amazon price history
   */
  AMAZON: {
    index: 0,
    isPrice: true,
    isDealRelevant: true,
    isWithShipping: false,
    isExtraData: false,
  },

  /**
   * Marketplace/3rd party New price history - Amazon is considered to be part of the marketplace as well,
   * so if Amazon has the overall lowest new (!) price, the marketplace new price in the corresponding time interval
   * will be identical to the Amazon price (except if there is only one marketplace offer).
   * Shipping and Handling costs not included!
   */
  NEW: {
    index: 1,
    isPrice: true,
    isDealRelevant: true,
    isWithShipping: false,
    isExtraData: false,
  },

  /**
   * Marketplace/3rd party Used price history
   */
  USED: {
    index: 2,
    isPrice: true,
    isDealRelevant: true,
    isWithShipping: false,
    isExtraData: false,
  },

  /**
   * Sales Rank history. Not every product has a Sales Rank.
   */
  SALES: {
    index: 3,
    isPrice: false,
    isDealRelevant: true,
    isWithShipping: false,
    isExtraData: false,
  },

  /**
   * List Price history
   */
  LISTPRICE: {
    index: 4,
    isPrice: true,
    isDealRelevant: false,
    isWithShipping: false,
    isExtraData: false,
  },

  /**
   * Collectible Price history
   */
  COLLECTIBLE: {
    index: 5,
    isPrice: true,
    isDealRelevant: true,
    isWithShipping: false,
    isExtraData: false,
  },

  /**
   * Refurbished Price history
   */
  REFURBISHED: {
    index: 6,
    isPrice: true,
    isDealRelevant: true,
    isWithShipping: false,
    isExtraData: false,
  },

  /**
   * 3rd party (not including Amazon) New price history including shipping costs, only fulfilled by merchant (FBM).
   */
  NEW_FBM_SHIPPING: {
    index: 7,
    isPrice: true,
    isDealRelevant: true,
    isWithShipping: true,
    isExtraData: true,
  },

  /**
   * 3rd party (not including Amazon) New price history including shipping costs, only fulfilled by merchant (FBM).
   */
  LIGHTNING_DEAL: {
    index: 8,
    isPrice: true,
    isDealRelevant: true,
    isWithShipping: false,
    isExtraData: false,
  },

  /**
   * Amazon Warehouse Deals price history. Mostly of used condition, rarely new.
   */
  WAREHOUSE: {
    index: 9,
    isPrice: true,
    isDealRelevant: true,
    isWithShipping: false,
    isExtraData: true,
  },

  /**
   * Price history of the lowest 3rd party (not including Amazon/Warehouse) New offer that is fulfilled by Amazon
   */
  NEW_FBA: {
    index: 10,
    isPrice: true,
    isDealRelevant: true,
    isWithShipping: false,
    isExtraData: true,
  },

  /**
   * The product's rating history. A rating is an integer from 0 to 50 (e.g. 45 = 4.5 stars)
   */
  RATING: {
    index: 16,
    isPrice: false,
    isDealRelevant: false,
    isWithShipping: false,
    isExtraData: true,
  },

  /**
   * The product's review count history.
   */
  COUNT_REVIEWS: {
    index: 17,
    isPrice: false,
    isDealRelevant: false,
    isWithShipping: false,
    isExtraData: true,
  },

  /**
   * The price history of the buy box. If no offer qualified for the buy box the price has the value -1. Including shipping costs.
   */
  BUY_BOX_SHIPPING: {
    index: 18,
    isPrice: true,
    isDealRelevant: false,
    isWithShipping: true,
    isExtraData: true,
  },

  /**
   * The price history of the Used buy box (any sub-condition). If no offer qualified for the used buy box the price has the value -1. Including shipping costs.
   */
  BUY_BOX_USED_SHIPPING: {
    index: 32,
    isPrice: true,
    isDealRelevant: true,
    isWithShipping: true,
    isExtraData: true,
  },

  /**
   * Price history of the lowest Prime exclusive New offer.
   */
  PRIME_EXCL: {
    index: 33,
    isPrice: true,
    isDealRelevant: true,
    isWithShipping: false,
    isExtraData: true,
  },
} as const;

export type CsvType = keyof typeof CsvType;

/**
 * Returns the corresponding CsvType by index.
 * @param index - The index value to match.
 * @returns The corresponding CsvType key.
 */
export function getCsvTypeFromIndex(index: number): CsvType | undefined {
  return Object.keys(CsvType).find(
    key => CsvType[key as CsvType].index === index
  ) as CsvType | undefined;
}

/**
 * Enum representing the availability of an Amazon offer.
 */
export enum AvailabilityType {
  /**
   * No Amazon offer exists
   */
  NO_OFFER = -1,

  /**
   * Amazon offer is in stock and shippable
   */
  NOW = 0,

  /**
   * Amazon offer is currently not in stock but will be in the future - pre-order
   */
  PREORDERABLE = 1,

  /**
   * Amazon offer availability is "unknown"
   */
  UNKNOWN = 2,

  /**
   * Amazon offer is currently not in stock but will be in the future - back-order
   */
  BACKORDERABLE = 3,

  /**
   * Amazon offer availability is delayed. Check `availabilityAmazonDelay` field for details.
   */
  DELAYED = 4,
}

/**
 * Enum representing different product types.
 */
export enum ProductType {
  /**
   * Standard product - everything accessible.
   */
  STANDARD = 0,

  /**
   * Downloadable product – no marketplace price data.
   */
  DOWNLOADABLE = 1,

  /**
   * eBook – no price data and sales rank accessible.
   */
  EBOOK = 2,

  /**
   * No data accessible (hidden prices due to MAP - minimum advertised price).
   */
  UNACCESSIBLE = 3,

  /**
   * No data available due to invalid or deprecated ASIN, or other issues.
   */
  INVALID = 4,

  /**
   * Product is a parent ASIN. No product data accessible, variationCSV is set.
   */
  VARIATION_PARENT = 5,
}

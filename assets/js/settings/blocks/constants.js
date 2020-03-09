/**
 * External dependencies
 */
import { getSetting } from '@woocommerce/settings';

export const CURRENT_USER_IS_ADMIN = getSetting( 'currentUserIsAdmin', false );
export const REVIEW_RATINGS_ENABLED = getSetting(
	'reviewRatingsEnabled',
	true
);
export const SHOW_AVATARS = getSetting( 'showAvatars', true );
export const MAX_COLUMNS = getSetting( 'max_columns', 6 );
export const MIN_COLUMNS = getSetting( 'min_columns', 1 );
export const DEFAULT_COLUMNS = getSetting( 'default_columns', 3 );
export const MAX_ROWS = getSetting( 'max_rows', 6 );
export const MIN_ROWS = getSetting( 'min_rows', 1 );
export const DEFAULT_ROWS = getSetting( 'default_rows', 3 );
export const MIN_HEIGHT = getSetting( 'min_height', 500 );
export const DEFAULT_HEIGHT = getSetting( 'default_height', 500 );
export const PLACEHOLDER_IMG_SRC = getSetting( 'placeholderImgSrc', '' );
export const THUMBNAIL_SIZE = getSetting( 'thumbnail_size', 300 );
export const IS_LARGE_CATALOG = getSetting( 'isLargeCatalog' );
export const LIMIT_TAGS = getSetting( 'limitTags' );
export const HAS_PRODUCTS = getSetting( 'hasProducts', true );
export const HAS_TAGS = getSetting( 'hasTags', true );
export const HOME_URL = getSetting( 'homeUrl', '' );
export const COUPONS_ENABLED = getSetting( 'couponsEnabled', true );
export const SHIPPING_ENABLED = getSetting( 'shippingEnabled', true );
export const DISPLAY_SHOP_PRICES_INCLUDING_TAX = getSetting(
	'displayShopPricesIncludingTax',
	false
);
export const DISPLAY_CART_PRICES_INCLUDING_TAX = getSetting(
	'displayCartPricesIncludingTax',
	false
);
export const PRODUCT_COUNT = getSetting( 'productCount', 0 );
export const ATTRIBUTES = getSetting( 'attributes', [] );
export const IS_SHIPPING_CALCULATOR_ENABLED = getSetting(
	'isShippingCalculatorEnabled',
	true
);
export const IS_SHIPPING_COST_HIDDEN = getSetting(
	'isShippingCostHidden',
	false
);
export const WC_BLOCKS_ASSET_URL = getSetting( 'wcBlocksAssetUrl', '' );
export const SHIPPING_COUNTRIES = getSetting( 'shippingCountries', {} );
export const ALLOWED_COUNTRIES = getSetting( 'allowedCountries', {} );
export const SHIPPING_STATES = getSetting( 'shippingStates', {} );
export const ALLOWED_STATES = getSetting( 'allowedStates', {} );
export const SHIPPING_METHODS_EXIST = getSetting(
	'shippingMethodsExist',
	false
);
export const COUNTRY_LOCALE = getSetting( 'countryLocale', {} );

const defaultPage = {
	name: '',
	url: '',
};
const storePages = getSetting( 'storePages', {
	shop: defaultPage,
	checkout: defaultPage,
	privacy: defaultPage,
	terms: defaultPage,
} );
export const SHOP_URL = storePages.shop.url;
export const CHECKOUT_URL = storePages.checkout.url;
export const PRIVACY_URL = storePages.privacy.url;
export const TERMS_URL = storePages.terms.url;
export const PRIVACY_PAGE_NAME = storePages.privacy.name;
export const TERMS_PAGE_NAME = storePages.terms.name;

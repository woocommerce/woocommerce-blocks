/**
 * External dependencies
 */
import { getSetting } from '@woocommerce/settings';

const WC_BLOCKS_ASSET_URL = getSetting( 'wcBlocksPluginUrl', '' ) + '/assets';
const WC_BLOCKS_BUILD_URL = getSetting( 'wcBlocksPluginUrl', '' ) + '/build';
const WOOCOMMERCE_BLOCKS_PHASE = getSetting( 'wcBlocksPhase', 1 ) as number;
const WORD_COUNT_TYPE = getSetting( 'wordCountType', 'words' );
const IS_LARGE_CATALOG = getSetting( 'isLargeCatalog' );
const PRODUCT_COUNT = getSetting( 'productCount', 0 );
const REST_API_ROUTES = getSetting( 'restApiRoutes' );

export {
	WC_BLOCKS_ASSET_URL,
	WC_BLOCKS_BUILD_URL,
	WOOCOMMERCE_BLOCKS_PHASE,
	WORD_COUNT_TYPE,
	IS_LARGE_CATALOG,
	PRODUCT_COUNT,
	REST_API_ROUTES,
};

export const PLACEHOLDER_IMG_SRC = getSetting( 'placeholderImgSrc', '' );

export const LIMIT_TAGS = getSetting( 'limitTags' );
export const HAS_PRODUCTS = getSetting( 'hasProducts', true );
export const HAS_TAGS = getSetting( 'hasTags', true );
export const HOME_URL = getSetting( 'homeUrl', '' );
export const COUPONS_ENABLED = getSetting( 'couponsEnabled', true );
export const SHIPPING_ENABLED = getSetting( 'shippingEnabled', true );
export const TAXES_ENABLED = getSetting( 'taxesEnabled', true );
export const DISPLAY_ITEMIZED_TAXES = getSetting(
	'displayItemizedTaxes',
	false
);

export const ATTRIBUTES = getSetting( 'attributes', [] );
// used for the editor logic as an extra check
export const SHIPPING_COST_REQUIRES_ADDRESS = getSetting(
	'shippingCostRequiresAddress',
	false
);

export const SHIPPING_COUNTRIES = getSetting( 'shippingCountries', {} );
export const ALLOWED_COUNTRIES = getSetting( 'allowedCountries', {} );
export const SHIPPING_STATES = getSetting( 'shippingStates', {} );
export const ALLOWED_STATES = getSetting( 'allowedStates', {} );
export const SHIPPING_METHODS_EXIST = getSetting(
	'shippingMethodsExist',
	false
);

export const PAYMENT_GATEWAY_SORT_ORDER = getSetting(
	'paymentGatewaySortOrder',
	[]
);

export const CHECKOUT_SHOW_LOGIN_REMINDER = getSetting(
	'checkoutShowLoginReminder',
	true
);

const defaultPage = {
	id: 0,
	title: '',
	permalink: '',
};
const storePages = getSetting( 'storePages', {
	myaccount: defaultPage,
	shop: defaultPage,
	cart: defaultPage,
	checkout: defaultPage,
	privacy: defaultPage,
	terms: defaultPage,
} );
export const SHOP_URL = storePages.shop.permalink;

export const CHECKOUT_PAGE_ID = storePages.checkout.id;
export const CHECKOUT_URL = storePages.checkout.permalink;

export const PRIVACY_URL = storePages.privacy.permalink;
export const PRIVACY_PAGE_NAME = storePages.privacy.title;

export const TERMS_URL = storePages.terms.permalink;
export const TERMS_PAGE_NAME = storePages.terms.title;

export const CART_PAGE_ID = storePages.cart.id;
export const CART_URL = storePages.cart.permalink;

export const CHECKOUT_ALLOWS_GUEST = getSetting( 'checkoutAllowsGuest', false );
export const CHECKOUT_ALLOWS_SIGNUP = getSetting(
	'checkoutAllowsSignup',
	false
);

export const LOGIN_URL = storePages.myaccount.permalink
	? storePages.myaccount.permalink
	: getSetting( 'wpLoginUrl', '/wp-login.php' );

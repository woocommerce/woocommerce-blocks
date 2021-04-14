/**
 * External dependencies
 */
import { getSetting, STORE_PAGES } from '@woocommerce/settings';

/**
 * Settings defined globally for all blocks are exported here, as well as constants derived from core settings.
 */
const IS_LARGE_CATALOG = getSetting( 'isLargeCatalog' );
const PLACEHOLDER_IMG_SRC = getSetting( 'placeholderImgSrc', '' );
const PRODUCT_COUNT = getSetting( 'productCount', 0 );
const REST_API_ROUTES = getSetting( 'restApiRoutes' );
const WC_BLOCKS_ASSET_URL = getSetting( 'wcBlocksPluginUrl', '' ) + '/assets';
const WC_BLOCKS_BUILD_URL = getSetting( 'wcBlocksPluginUrl', '' ) + '/build';
const WOOCOMMERCE_BLOCKS_PHASE = getSetting( 'wcBlocksPhase', 1 ) as number;
const WORD_COUNT_TYPE = getSetting( 'wordCountType', 'words' );

export {
	IS_LARGE_CATALOG,
	PLACEHOLDER_IMG_SRC,
	PRODUCT_COUNT,
	REST_API_ROUTES,
	WC_BLOCKS_ASSET_URL,
	WC_BLOCKS_BUILD_URL,
	WOOCOMMERCE_BLOCKS_PHASE,
	WORD_COUNT_TYPE,
};

export const SHOP_URL = STORE_PAGES.shop.permalink;
export const CHECKOUT_PAGE_ID = STORE_PAGES.checkout.id;
export const CHECKOUT_URL = STORE_PAGES.checkout.permalink;
export const PRIVACY_URL = STORE_PAGES.privacy.permalink;
export const PRIVACY_PAGE_NAME = STORE_PAGES.privacy.title;
export const TERMS_URL = STORE_PAGES.terms.permalink;
export const TERMS_PAGE_NAME = STORE_PAGES.terms.title;
export const CART_PAGE_ID = STORE_PAGES.cart.id;
export const CART_URL = STORE_PAGES.cart.permalink;
export const LOGIN_URL = STORE_PAGES.myaccount.permalink
	? STORE_PAGES.myaccount.permalink
	: getSetting( 'wpLoginUrl', '/wp-login.php' );

export const ATTRIBUTES = getSetting( 'attributes', [] );
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
export const CHECKOUT_ALLOWS_GUEST = getSetting( 'checkoutAllowsGuest', false );
export const CHECKOUT_ALLOWS_SIGNUP = getSetting(
	'checkoutAllowsSignup',
	false
);

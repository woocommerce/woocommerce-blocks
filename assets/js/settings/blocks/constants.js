/**
 * External dependencies
 */
import { getSetting } from '@woocommerce/settings';

export const WC_BLOCKS_ASSET_URL =
	getSetting( 'wcBlocksPluginUrl', '' ) + '/assets';
export const WC_BLOCKS_BUILD_URL =
	getSetting( 'wcBlocksPluginUrl', '' ) + '/build';
export const WOOCOMMERCE_BLOCKS_PHASE = getSetting( 'wcBlocksPhase', 1 );

export const CURRENT_USER_IS_ADMIN = getSetting( 'currentUserIsAdmin', false );
export const REVIEW_RATINGS_ENABLED = getSetting(
	'reviewRatingsEnabled',
	true
);
export const SHOW_AVATARS = getSetting( 'showAvatars', true );
export const MIN_HEIGHT = getSetting( 'min_height', 500 );
export const DEFAULT_HEIGHT = getSetting( 'default_height', 500 );
export const PLACEHOLDER_IMG_SRC = getSetting( 'placeholderImgSrc', '' );
export const IS_LARGE_CATALOG = getSetting( 'isLargeCatalog' );
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
export const PRODUCT_COUNT = getSetting( 'productCount', 0 );
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
	: getSetting( 'loginUrl', '/wp-login.php' );

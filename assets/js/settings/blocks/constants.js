/**
 * External dependencies
 */
import { getSetting } from '@woocommerce/settings';

const blockConstants = getSetting( 'block_constants', {} );

export const CURRENT_USER_IS_ADMIN = blockConstants.currentUserIsAdmin || false;
export const REVIEW_RATINGS_ENABLED = blockConstants.reviewRatingsEnabled || true;
export const SHOW_AVATARS = blockConstants.showAvatars || true;
export const MAX_COLUMNS = blockConstants.max_columns || 6;
export const MIN_COLUMNS = blockConstants.min_columns || 1;
export const DEFAULT_COLUMNS = blockConstants.default_columns || 3;
export const MAX_ROWS = blockConstants.max_rows || 6;
export const MIN_ROWS = blockConstants.min_rows || 1;
export const DEFAULT_ROWS = blockConstants.default_rows || 3;
export const MIN_HEIGHT = blockConstants.min_height || 500;
export const DEFAULT_HEIGHT = blockConstants.default_height || 500;
export const PLACEHOLDER_IMG_SRC = blockConstants.placeholderImgSrc || '';
export const THUMBNAIL_SIZE = blockConstants.thumbnail_size || 300;
export const IS_LARGE_CATALOG = blockConstants.isLargeCatalog || false;
export const LIMIT_TAGS = blockConstants.limitTags || false;
export const HAS_PRODUCTS = blockConstants.hasProducts || true;
export const HAS_TAGS = blockConstants.hasTags || true;
export const HOME_URL = blockConstants.homeUrl || '';
export const COUPONS_ENABLED = blockConstants.couponsEnabled || true;
export const SHIPPING_ENABLED = blockConstants.shippingEnabled || true;
export const TAXES_ENABLED = blockConstants.taxesEnabled || true;
export const DISPLAY_ITEMIZED_TAXES = blockConstants.displayItemizedTaxes || false;
export const HAS_DARK_EDITOR_STYLE_SUPPORT = blockConstants.hasDarkEditorStyleSupport || false;
export const DISPLAY_SHOP_PRICES_INCLUDING_TAX = blockConstants.displayShopPricesIncludingTax || false;
export const DISPLAY_CART_PRICES_INCLUDING_TAX = blockConstants.displayCartPricesIncludingTax || false;
export const PRODUCT_COUNT = blockConstants.productCount || 0;
export const ATTRIBUTES = blockConstants.attributes || [];
export const IS_SHIPPING_CALCULATOR_ENABLED = blockConstants.isShippingCalculatorEnabled || true;
export const IS_SHIPPING_COST_HIDDEN = blockConstants.isShippingCostHidden || false;
export const WOOCOMMERCE_BLOCKS_PHASE = blockConstants.woocommerceBlocksPhase || 1;
export const WC_BLOCKS_ASSET_URL = blockConstants.wcBlocksAssetUrl || '';
export const WC_BLOCKS_BUILD_URL = blockConstants.wcBlocksBuildUrl || '';
export const SHIPPING_COUNTRIES = blockConstants.shippingCountries || {};
export const ALLOWED_COUNTRIES = blockConstants.allowedCountries || {};
export const SHIPPING_STATES = blockConstants.shippingStates || {};
export const ALLOWED_STATES = blockConstants.allowedStates || {};
export const SHIPPING_METHODS_EXIST = blockConstants.shippingMethodsExist || false;

export const PAYMENT_GATEWAY_SORT_ORDER = blockConstants.paymentGatewaySortOrder || [];

export const CHECKOUT_SHOW_LOGIN_REMINDER = blockConstants.checkoutShowLoginReminder || true;

const defaultPage = {
	id: 0,
	title: '',
	permalink: '',
};
const storePages = blockConstants.storePages || {
	myaccount: defaultPage,
	shop: defaultPage,
	cart: defaultPage,
	checkout: defaultPage,
	privacy: defaultPage,
	terms: defaultPage,
};

export const SHOP_URL = storePages.shop.permalink;

export const CHECKOUT_PAGE_ID = storePages.checkout.id;
export const CHECKOUT_URL = storePages.checkout.permalink;

export const PRIVACY_URL = storePages.privacy.permalink;
export const PRIVACY_PAGE_NAME = storePages.privacy.title;

export const TERMS_URL = storePages.terms.permalink;
export const TERMS_PAGE_NAME = storePages.terms.title;

export const CART_PAGE_ID = storePages.cart.id;
export const CART_URL = storePages.cart.permalink;

export const CHECKOUT_ALLOWS_GUEST = blockConstants.checkoutAllowsGuest || false;
export const CHECKOUT_ALLOWS_SIGNUP = blockConstants.checkoutAllowsSignup || false;

export const LOGIN_URL = storePages.myaccount.permalink
	? storePages.myaccount.permalink
	: blockConstants.loginUrl || '/wp-login.php';

export const WORD_COUNT_TYPE = blockConstants.wordCountType || 'words';

export const BASE_LOCATION = blockConstants.baseLocation || {
	country: 'GB',
	state: ''
};

export const REST_API_ROUTES = blockConstants.restApiRoutes || {};
export const HIDE_OUT_OF_STOCK_ITEMS = blockConstants.woocommerce_hide_out_of_stock_items || false;

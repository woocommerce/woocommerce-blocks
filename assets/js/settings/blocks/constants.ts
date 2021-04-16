/**
 * External dependencies
 */
import { getSetting, STORE_PAGES } from '@woocommerce/settings';

declare global {
	interface Window {
		wcBlocksConfig: {
			wcBlocksPluginUrl: string;
			wcBlocksPhase: number;
		};
	}
}

const blocksConfig =
	typeof window.wcBlocksConfig === 'object'
		? window.wcBlocksConfig
		: {
				wcBlocksPluginUrl: '',
				wcBlocksPhase: 1,
		  };

export const WC_BLOCKS_ASSET_URL = blocksConfig.wcBlocksPluginUrl + '/assets/';
export const WC_BLOCKS_BUILD_URL = blocksConfig.wcBlocksPluginUrl + '/build/';
export const WC_BLOCKS_PHASE = blocksConfig.wcBlocksPhase;

/**
 * Settings defined globally for all blocks are exported here, as well as constants derived from core settings.
 */
const IS_LARGE_CATALOG = getSetting( 'isLargeCatalog' );
const PRODUCT_COUNT = getSetting( 'productCount', 0 );
const WORD_COUNT_TYPE = getSetting( 'wordCountType', 'words' );

export { IS_LARGE_CATALOG, PRODUCT_COUNT, WORD_COUNT_TYPE };

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

/**
 * Internal dependencies
 */
import type { UpgradeNoticeStatus } from './types';

export const AUTO_REPLACE_PRODUCTS_WITH_PRODUCT_COLLECTION = false;
export const MANUAL_REPLACE_PRODUCTS_WITH_PRODUCT_COLLECTION = false;
export const MIGRATION_STATUS_LS_KEY =
	'wc-blocks_upgraded-products-to-product-collection';
export const INITIAL_STATUS_LS_VALUE: UpgradeNoticeStatus = {
	status: 'notseen',
};

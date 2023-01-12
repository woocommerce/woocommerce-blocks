/**
 * External dependencies
 */
import { isFeaturePluginBuild } from '@woocommerce/block-settings';
import {
	BLOCK_DESCRIPTION,
	BLOCK_ICON,
	BLOCK_TITLE,
} from '@woocommerce/atomic-blocks/product-elements/summary/constants';

/**
 * Internal dependencies
 */
import { registerElementVariation } from './utils';

export const CORE_NAME = 'core/button';
export const VARIATION_NAME = 'woocommerce/product-add-to-cart-button';

if ( isFeaturePluginBuild() ) {
	registerElementVariation( CORE_NAME, {
		blockDescription: 'This is a block description',
		blockIcon: BLOCK_ICON,
		blockTitle: 'Add to Cart',
		variationName: VARIATION_NAME,
	} );
}

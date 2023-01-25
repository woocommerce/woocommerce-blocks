/**
 * External dependencies
 */
import { isFeaturePluginBuild } from '@woocommerce/block-settings';
import { Icon, button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { registerElementVariation } from './utils';

const BLOCK_TITLE: string = __(
	'Add to Cart Button',
	'woo-gutenberg-products-block'
);
const BLOCK_ICON: JSX.Element = (
	<Icon icon={ button } className="wc-block-editor-components-block-icon" />
);
const BLOCK_DESCRIPTION: string = __(
	'Display a call to action button which either adds the product to the cart, or links to the product page.',
	'woo-gutenberg-products-block'
);

export const CORE_NAME = 'core/buttons';
export const VARIATION_NAME = 'woocommerce/product-add-to-cart-button';

if ( isFeaturePluginBuild() ) {
	registerElementVariation( CORE_NAME, {
		blockDescription: BLOCK_DESCRIPTION,
		blockIcon: BLOCK_ICON,
		blockTitle: BLOCK_TITLE,
		variationName: VARIATION_NAME,
	} );
}

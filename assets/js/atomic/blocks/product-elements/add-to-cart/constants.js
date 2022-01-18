/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { cart, Icon } from '@woocommerce/icons';

export const BLOCK_TITLE = __( 'Add to Cart', 'woo-gutenberg-products-block' );
export const BLOCK_ICON = (
	<Icon
		srcElement={ cart }
		className="wc-block-editor-components-block-icon"
	/>
);
export const BLOCK_DESCRIPTION = __(
	'Displays an add to cart button. Optionally displays other add to cart form elements.',
	'woo-gutenberg-products-block'
);

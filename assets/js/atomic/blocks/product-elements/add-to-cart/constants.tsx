/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { cart } from '~/icons';

export const BLOCK_TITLE = __( 'Add to Cart', 'woo-gutenberg-products-block' );
export const BLOCK_ICON = (
	<Icon icon={ cart } className="wc-block-editor-components-block-icon" />
);
export const BLOCK_DESCRIPTION = __(
	'Displays an add to cart button. Optionally displays other add to cart form elements.',
	'woo-gutenberg-products-block'
);

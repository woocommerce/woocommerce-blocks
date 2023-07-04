/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon, starFilled } from '@wordpress/icons';

export const BLOCK_TITLE: string = __(
	'Product Rating Counter',
	'woo-gutenberg-products-block'
);
export const BLOCK_ICON: JSX.Element = (
	<Icon
		icon={ starFilled }
		className="wc-block-editor-components-block-icon"
	/>
);
export const BLOCK_DESCRIPTION: string = __(
	'Display the review count of a product',
	'woo-gutenberg-products-block'
);

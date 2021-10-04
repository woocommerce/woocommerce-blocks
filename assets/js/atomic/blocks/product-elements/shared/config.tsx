/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon, grid } from '@woocommerce/icons';
import { isExperimentalBuild } from '@woocommerce/block-settings';
import { BlockConfiguration } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import save from '../save';

/**
 * Holds default config for this collection of blocks.
 */
const sharedConfig: Omit< BlockConfiguration, 'attributes' | 'title' > = {
	category: 'woocommerce-product-elements',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	icon: {
		src: <Icon srcElement={ grid } />,
		foreground: '#96588a',
	},
	supports: {
		html: false,
	},
	parent: isExperimentalBuild()
		? undefined
		: [ '@woocommerce/all-products', '@woocommerce/single-product' ],
	save,
	deprecated: [],
};

export default sharedConfig;

/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { createBlock, registerBlockType } from '@wordpress/blocks';
import { without } from 'lodash';
import { Icon, exclamation } from '@woocommerce/icons';

/**
 * Internal dependencies
 */
import Block from './block';
import sharedAttributes, {
	sharedAttributeBlockTypes,
} from '../../utils/shared-attributes';

registerBlockType( 'woocommerce/product-new', {
	title: __( 'Newest Products', 'woo-gutenberg-products-block' ),
	icon: {
		src: (
			<Icon
				srcElement={ exclamation }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	category: 'woocommerce',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	description: __(
		'Display a grid of your newest products.',
		'woo-gutenberg-products-block'
	),
	supports: {
		align: [ 'wide', 'full' ],
		html: false,
	},
	attributes: {
		...sharedAttributes,
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
	transforms: {
		from: [
			{
				type: 'block',
				blocks: without(
					sharedAttributeBlockTypes,
					'woocommerce/product-new'
				),
				transform: ( attributes ) =>
					createBlock( 'woocommerce/product-new', attributes ),
			},
		],
	},

	/**
	 * Renders and manages the block.
	 *
	 * @param {Object} props Props to pass to block.
	 */
	edit( props ) {
		return <Block { ...props } />;
	},

	save() {
		return null;
	},
} );

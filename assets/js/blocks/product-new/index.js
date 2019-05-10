/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { createBlock, registerBlockType } from '@wordpress/blocks';
import { without } from 'lodash';

/**
 * Internal dependencies
 */
import Block from './block';
import { deprecatedGridSave } from '../../utils/deprecations';
import { IconNewReleases } from '../../components/icons';
import sharedAttributes, {
	sharedAttributeBlockTypes,
} from '../../utils/shared-attributes';

registerBlockType( 'woocommerce/product-new', {
	title: __( 'Newest Products', 'woo-gutenberg-products-block' ),
	icon: <IconNewReleases />,
	category: 'woocommerce',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	description: __(
		'Display a grid of your newest products.',
		'woo-gutenberg-products-block'
	),
	supports: {
		align: [ 'wide', 'full' ],
	},
	attributes: {
		...sharedAttributes,
	},
	transforms: {
		from: [
			{
				type: 'block',
				blocks: without( sharedAttributeBlockTypes, 'woocommerce/product-new' ),
				transform: ( attributes ) =>
					createBlock( 'woocommerce/product-new', attributes ),
			},
		],
	},

	deprecated: [
		{
			attributes: sharedAttributes,
			save: deprecatedGridSave( 'woocommerce/product-new' ),
		},
	],

	/**
	 * Renders and manages the block.
	 */
	edit( props ) {
		return <Block { ...props } />;
	},

	save() {
		return null;
	},
} );

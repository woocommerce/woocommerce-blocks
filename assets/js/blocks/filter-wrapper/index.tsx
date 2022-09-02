/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { toggle } from '@woocommerce/icons';
import { Icon, currencyDollar, box } from '@wordpress/icons';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';

registerBlockType( metadata, {
	icon: {
		src: (
			<Icon
				icon={ toggle }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	attributes: {
		...metadata.attributes,
		heading: {
			type: 'string',
			default: __( 'Active filters', 'woo-gutenberg-products-block' ),
		},
	},
	edit,
	save() {
		const innerBlocksProps = useInnerBlocksProps.save(
			useBlockProps.save()
		);
		return <div { ...innerBlocksProps } />;
	},
	variations: [
		{
			name: 'price-filter',
			title: __( 'Filter by Price', 'woo-gutenberg-products-block' ),
			description: __(
				'Allow customers to filter products by price range.',
				'woo-gutenberg-products-block'
			),
			scope: [ 'inserter' ],
			isActive: ( attributes ) =>
				attributes.filterType === 'price-filter',
			attributes: {
				filterType: 'price-filter',
				heading: __(
					'Filter by price',
					'woo-gutenberg-products-block'
				),
			},
			icon: {
				src: (
					<Icon
						icon={ currencyDollar }
						className="wc-block-editor-components-block-icon"
					/>
				),
			},
		},
		{
			name: 'stock-filter',
			title: __( 'Filter by Stock', 'woo-gutenberg-products-block' ),
			description: __(
				'Allow customers to filter the grid by products stock status.',
				'woo-gutenberg-products-block'
			),
			scope: [ 'inserter' ],
			isActive: ( attributes ) =>
				attributes.filterType === 'stock-filter',
			attributes: {
				filterType: 'stock-filter',
				heading: __(
					'Filter by stock status',
					'woo-gutenberg-products-block'
				),
			},
			icon: {
				src: (
					<Icon
						icon={ box }
						className="wc-block-editor-components-block-icon"
					/>
				),
			},
		},
	],
} );

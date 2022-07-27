/* eslint-disable @typescript-eslint/ban-ts-comment */
/**
 * External dependencies
 */
import { store as blockEditorStore, Warning } from '@wordpress/block-editor';
import { useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { Icon, search } from '@wordpress/icons';
import { getSettingWithCoercion } from '@woocommerce/settings';
import { isBoolean } from '@woocommerce/types';
import { Button } from '@wordpress/components';
import {
	// @ts-ignore waiting for @types/wordpress__blocks update
	registerBlockVariation,
	registerBlockType,
	createBlock,
} from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';
import Block from './block.js';
import Edit from './edit.js';

const isBlockVariationAvailable = getSettingWithCoercion(
	'isBlockVariationAvailable',
	false,
	isBoolean
);

const attributes = {
	/**
	 * Whether to show the field label.
	 */
	hasLabel: {
		type: 'boolean',
		default: true,
	},

	/**
	 * Search field label.
	 */
	label: {
		type: 'string',
		default: __( 'Search', 'woo-gutenberg-products-block' ),
	},

	/**
	 * Search field placeholder.
	 */
	placeholder: {
		type: 'string',
		default: __( 'Search products…', 'woo-gutenberg-products-block' ),
	},

	/**
	 * Store the instance ID.
	 */
	formId: {
		type: 'string',
		default: '',
	},
};

const PRODUCT_SEARCH_ATTRIBUTES = {
	label: attributes.label.default,
	buttonText: attributes.label.default,
	placeholder: attributes.placeholder.default,
	query: {
		post_type: 'product',
	},
};

/**
 * editor.scss and styggle.scss are required
 * to gracefully handle old block deprecation
 */
const DeprecatedBlockEdit = ( { clientId }: { clientId: string } ) => {
	// @ts-ignore @wordpress/block-editor/store types not provided
	const { replaceBlocks } = useDispatch( blockEditorStore );
	const updateBlock = () => {
		replaceBlocks(
			clientId,
			createBlock( 'core/search', PRODUCT_SEARCH_ATTRIBUTES )
		);
	};
	const actions = [
		<Button key="update" onClick={ updateBlock } variant="primary">
			Update to Search Block variant
		</Button>,
	];

	return (
		<Warning actions={ actions }>
			Old Product Search block is deprecated.
		</Warning>
	);
};

registerBlockType( 'woocommerce/product-search', {
	title: __( 'Product Search', 'woo-gutenberg-products-block' ),
	icon: {
		src: (
			<Icon
				icon={ search }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	category: 'woocommerce',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	description: __(
		'A search box to allow customers to search for products by keyword.',
		'woo-gutenberg-products-block'
	),
	supports: {
		align: [ 'wide', 'full' ],
		inserter: isBlockVariationAvailable ? false : true,
	},
	example: {
		attributes: {
			hasLabel: true,
		},
	},
	attributes,
	transforms: isBlockVariationAvailable
		? {
				to: [
					{
						type: 'block',
						blocks: [ 'core/search' ],
						transform: () => {
							return createBlock(
								'core/search',
								PRODUCT_SEARCH_ATTRIBUTES
							);
						},
					},
				],
		  }
		: {
				from: [
					{
						type: 'block',
						blocks: [ 'core/legacy-widget' ],
						// We can't transform if raw instance isn't shown in the REST API.
						isMatch: ( { idBase, instance } ) =>
							idBase === 'woocommerce_product_search' &&
							!! instance?.raw,
						transform: ( { instance } ) =>
							createBlock( 'woocommerce/product-search', {
								label:
									instance.raw.title === ''
										? __(
												'Search',
												'woo-gutenberg-products-block'
										  )
										: instance.raw.title,
							} ),
					},
				],
		  },
	deprecated: [
		{
			attributes,
			save( props ) {
				return (
					<div>
						<Block { ...props } />
					</div>
				);
			},
		},
	],
	edit: isBlockVariationAvailable ? DeprecatedBlockEdit : Edit,
	save() {
		return null;
	},
} );

if ( isBlockVariationAvailable ) {
	registerBlockVariation( 'core/search', {
		name: 'woocommerce/product-search',
		title: __( 'Product Search', 'woo-gutenberg-products-block' ),
		icon: {
			src: (
				<Icon
					icon={ search }
					className="wc-block-editor-components-block-icon"
				/>
			),
		},
		// @ts-ignore waiting for @types/wordpress__blocks update
		isActive: ( blockAttributes, variationAttributes ) => {
			return (
				blockAttributes.query?.post_type ===
				variationAttributes.query.postType
			);
		},
		category: 'woocommerce',
		keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
		description: __(
			'A search box to allow customers to search for products by keyword.',
			'woo-gutenberg-products-block'
		),
		attributes: PRODUCT_SEARCH_ATTRIBUTES,
	} );
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
/**
 * External dependencies
 */
import { store as blockEditorStore, Warning } from '@wordpress/block-editor';
import { useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { Icon, search } from '@wordpress/icons';
import {
	// @ts-ignore waiting for @types/wordpress__blocks update
	registerBlockVariation,
	registerBlockType,
	createBlock,
} from '@wordpress/blocks';

const PRODUCT_SEARCH_ATTRIBUTES = {
	label: __( 'Search', 'woo-gutenberg-products-block' ),
	buttonText: __( 'Search', 'woo-gutenberg-products-block' ),
	placeholder: __( 'Search products…', 'woo-gutenberg-products-block' ),
	query: {
		post_type: 'product',
	},
};

/**
 * editor.scss and style.scss are required
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

	// useEffect( () => {
	// 	replaceBlocks(
	// 		clientId,
	// 		createBlock( 'core/search', PRODUCT_SEARCH_ATTRIBUTES )
	// 	);
	// }, [ clientId, replaceBlocks ] );

	// return null;

	return (
		<Warning>
			Old Product Search block is deprecated.
			<br />
			<small>
				<button onClick={ updateBlock }>
					Update to Search Block variant
				</button>
				.
			</small>
		</Warning>
	);
};

registerBlockType( 'woocommerce/product-search', {
	name: 'woocommerce/product-search',
	title: __( 'Product Search', 'woo-gutenberg-products-block' ),
	category: 'woocommerce',
	attributes: {},
	supports: {
		inserter: false,
	},
	edit: DeprecatedBlockEdit,
	transforms: {
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
	},
} );

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

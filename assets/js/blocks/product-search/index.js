/**
 * External dependencies
 */
import { store as blockEditorStore } from '@wordpress/block-editor';
import { useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { Icon, search } from '@wordpress/icons';
import {
	// @ts-ignore-line
	registerBlockVariation,
	registerBlockType,
	createBlock,
} from '@wordpress/blocks';

const PRODUCT_SEARCH_ATTRIBUTES = {
	postType: 'product',
	label: __( 'Search', 'woo-gutenberg-products-block' ),
	buttonText: __( 'Search', 'woo-gutenberg-products-block' ),
	placeholder: __( 'Search products…', 'woo-gutenberg-products-block' ),
};

const DeprecatedEdit = ( { clientId } ) => {
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
		<div>
			Old Product Search block is deprecated.
			<br />
			<small>
				<button onClick={ updateBlock }>
					Update to Search Block variant
				</button>
				.
			</small>
		</div>
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
	edit: DeprecatedEdit,
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
	// @ts-ignore
	isActive: ( blockAttributes, variationAttributes ) => {
		return blockAttributes.postType === variationAttributes.postType;
	},
	category: 'woocommerce',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	description: __(
		'A search box to allow customers to search for products by keyword.',
		'woo-gutenberg-products-block'
	),
	attributes: PRODUCT_SEARCH_ATTRIBUTES,
} );

/**
 * External dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { Disabled } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withProductDataContext } from '@woocommerce/shared-hocs';
import type { BlockEditProps, InnerBlockTemplate } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { InnerBlockLayoutContextProvider } from '@woocommerce/shared-context';
import { withProduct } from '@woocommerce/block-hocs';

/**
 * Internal dependencies
 */
import withProductSelector from '../../atomic/blocks/product-elements/shared/with-product-selector';
import { Attributes } from './types';
import { BLOCK_ICON } from './constants';
import metadata from './block.json';
// import { useSelect } from '@wordpress/data';

const DEFAULT_INNER_BLOCKS: InnerBlockTemplate[] = [
	[
		'core/columns',
		{},
		[
			[
				'core/column',
				{},
				[
					[
						'woocommerce/product-image',
						{ showSaleBadge: false, renderOnServerSide: true },
					],
				],
			],
			[
				'core/column',
				{},
				[
					[ 'woocommerce/product-sale-badge' ],
					[ 'woocommerce/product-title', { headingLevel: 2 } ],
					[ 'woocommerce/product-rating' ],
					[ 'woocommerce/product-price' ],
					[ 'woocommerce/product-summary' ],
					[ 'woocommerce/product-stock-indicator' ],
					[
						'woocommerce/product-add-to-cart',
						{ showFormElements: true },
					],
					[ 'woocommerce/product-sku' ],
					[ 'woocommerce/product-category-list' ],
					[ 'woocommerce/product-tag-list' ],
				],
			],
		],
	],
];

const Edit = ( { attributes }: BlockEditProps< Attributes > ) => {
	const { className } = attributes;
	const blockProps = useBlockProps( {
		className,
	} );

	// const isDescendentOfSingleProductTemplate = useSelect( ( select ) => {
	// 	const store = select( 'core/edit-site' );
	// 	const postId = store?.getEditedPostId();
	// 	const PRODUCT_META_POST_ID = 'woocommerce/woocommerce//product-meta';
	// 	const SINGLE_PRODUCT_POST_ID =
	// 		'woocommerce/woocommerce//single-product';

	// 	return (
	// 		postId === PRODUCT_META_POST_ID || postId === SINGLE_PRODUCT_POST_ID
	// 	);
	// }, [] );

	return (
		<InnerBlockLayoutContextProvider
			parentName={ metadata.name }
			parentClassName={ className }
		>
			<div { ...blockProps }>
				<Disabled>
					<InnerBlocks template={ DEFAULT_INNER_BLOCKS } />
				</Disabled>
			</div>
		</InnerBlockLayoutContextProvider>
	);
};

export default compose( [
	withProductSelector( {
		icon: BLOCK_ICON,
		label: metadata.name,
		description: __(
			'Choose a product to display its categories.',
			'woo-gutenberg-products-block'
		),
	} ),
	withProduct,
	withProductDataContext,
] )( Edit );

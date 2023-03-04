/**
 * External dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { Disabled } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withProduct } from '@woocommerce/block-hocs';
import { withProductDataContext } from '@woocommerce/shared-hocs';
import type { BlockEditProps, InnerBlockTemplate } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { InnerBlockLayoutContextProvider } from '@woocommerce/shared-context';

/**
 * Internal dependencies
 */
import withProductSelector from '../../atomic/blocks/product-elements/shared/with-product-selector';
import { Attributes } from './types';
import { BLOCK_ICON } from './constants';
import metadata from './block.json';
// import { useSelect } from '@wordpress/data';

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

	const TEMPLATE: InnerBlockTemplate[] = [
		[
			'core/group',
			{ layout: { type: 'constrained', contentSize: '1000px' } },
			[
				[ 'woocommerce/breadcrumbs' ],
				[
					'core/columns',
					{},
					[
						[
							'core/column',
							{},
							[ [ 'woocommerce/product-image-gallery' ] ],
						],
						[
							'core/column',
							{},
							[
								[ 'woocommerce/product-title' ],
								[ 'woocommerce/product-price' ],
								[ 'woocommerce/product-summary' ],
								[ 'woocommerce/add-to-cart-form' ],
							],
						],
					],
				],
				[ 'core/heading', { placeholder: 'Related Products' } ],
				[ 'woocommerce/related-products' ],
			],
		],
	];

	return (
		<InnerBlockLayoutContextProvider
			parentName={ metadata.name }
			parentClassName={ className }
		>
			<div { ...blockProps }>
				<Disabled>
					<InnerBlocks template={ TEMPLATE } />
				</Disabled>
			</div>
		</InnerBlockLayoutContextProvider>
	);
};

export default compose( [
	withProduct,
	withProductDataContext,
	withProductSelector( {
		icon: BLOCK_ICON,
		label: metadata.name,
		description: __(
			'Choose a product to display its categories.',
			'woo-gutenberg-products-block'
		),
	} ),
] )( Edit );

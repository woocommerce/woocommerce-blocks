/**
 * External dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { InnerBlockTemplate } from '@wordpress/blocks';
import { useProductDataContext } from '@woocommerce/shared-context';
import { isNumber, ProductResponseItem } from '@woocommerce/types';

/**
 * Internal dependencies
 */
import { useIsDescendentOfSingleProductBlock } from '../shared/use-is-descendent-of-single-product-block';
const getRatingCount = ( product: ProductResponseItem ) => {
	const count = isNumber( product.review_count )
		? product.review_count
		: parseInt( product.review_count, 10 );

	return Number.isFinite( count ) && count > 0 ? count : 0;
};

/**
 * Internal dependencies
 */
import './style.scss';

export const Block = () => {
	const { product } = useProductDataContext();
	const reviews = getRatingCount( product );
	const blockProps = useBlockProps( {
		className: 'wp-block-woocommerce-product-rating',
	} );

	const { isDescendentOfSingleProductBlock } =
		useIsDescendentOfSingleProductBlock( {
			blockClientId: blockProps?.id,
		} );

	const ALLOWED_BLOCKS = [
		'woocommerce/product-rating-stars',
		'woocommerce/product-rating-counter',
	];

	let ratingBlocks: InnerBlockTemplate[];

	if ( reviews && isDescendentOfSingleProductBlock ) {
		ratingBlocks = [
			[ 'woocommerce/product-rating-stars' ],
			[ 'woocommerce/product-rating-counter' ],
		];
	} else {
		ratingBlocks = [ [ 'woocommerce/product-rating-stars' ] ];
	}

	const TEMPLATE: InnerBlockTemplate[] = [
		[
			'core/group',
			{
				layout: { type: 'flex', flexWrap: 'nowrap' },
				style: { spacing: { blockGap: '5px' } },
			},
			ratingBlocks,
		],
	];

	return (
		<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } template={ TEMPLATE } />
	);
};

export default Block;

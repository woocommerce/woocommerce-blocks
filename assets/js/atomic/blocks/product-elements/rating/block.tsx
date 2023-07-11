/**
 * External dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';
import { InnerBlockTemplate } from '@wordpress/blocks';

export const Block = () => {
	const ALLOWED_BLOCKS = [
		'woocommerce/product-rating-stars',
		'woocommerce/product-rating-counter',
	];

	const TEMPLATE: InnerBlockTemplate[] = [
		[
			'core/group',
			{
				layout: { type: 'flex', flexWrap: 'nowrap' },
				style: { spacing: { blockGap: '5px' } },
			},
			[
				[ 'woocommerce/product-rating-stars' ],
				[ 'woocommerce/product-rating-counter' ],
			],
		],
	];

	return (
		<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } template={ TEMPLATE } />
	);
};

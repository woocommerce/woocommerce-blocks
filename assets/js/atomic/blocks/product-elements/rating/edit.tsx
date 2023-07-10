/**
 * External dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { InnerBlockTemplate } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import './editor.scss';

const Edit = () => {
	const ALLOWED_BLOCKS = [
		'woocommerce/product-rating-stars',
		'woocommerce/product-rating-counter',
	];

	const TEMPLATE: InnerBlockTemplate[] = [
		[
			'core/group',
			{
				layout: { type: 'flex', flexWrap: 'nowrap' },
				style: { spacing: { blockGap: '10px' } },
			},
			[
				[ 'woocommerce/product-rating-stars' ],
				[ 'woocommerce/product-rating-counter' ],
			],
		],
	];

	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<InnerBlocks
				allowedBlocks={ ALLOWED_BLOCKS }
				template={ TEMPLATE }
			/>
		</div>
	);
};

export default Edit;

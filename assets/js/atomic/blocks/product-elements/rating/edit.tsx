/**
 * External dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { InnerBlockTemplate } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import './editor.scss';
// import Block from './block';
// import { BlockAttributes } from './types';
// import { useIsDescendentOfSingleProductBlock } from '../shared/use-is-descendent-of-single-product-block';
// import { useIsDescendentOfSingleProductTemplate } from '../shared/use-is-descendent-of-single-product-template';

// const oldEdit = (
// 	props: BlockEditProps< BlockAttributes > & { context: Context }
// ): JSX.Element => {
// 	const { attributes, setAttributes, context } = props;
// 	const blockProps = useBlockProps( {
// 		className: 'wp-block-woocommerce-product-rating',
// 	} );
// 	const blockAttrs = {
// 		...attributes,
// 		...context,
// 		shouldDisplayMockedReviewsWhenProductHasNoReviews: true,
// 	};
// 	const isDescendentOfQueryLoop = Number.isFinite( context.queryId );
// 	const { isDescendentOfSingleProductBlock } =
// 		useIsDescendentOfSingleProductBlock( {
// 			blockClientId: blockProps?.id,
// 		} );
// 	let { isDescendentOfSingleProductTemplate } =
// 		useIsDescendentOfSingleProductTemplate();
//
// 	if ( isDescendentOfQueryLoop || isDescendentOfSingleProductBlock ) {
// 		isDescendentOfSingleProductTemplate = false;
// 	}
//
// 	useEffect( () => {
// 		setAttributes( {
// 			isDescendentOfQueryLoop,
// 			isDescendentOfSingleProductBlock,
// 			isDescendentOfSingleProductTemplate,
// 		} );
// 	}, [
// 		setAttributes,
// 		isDescendentOfQueryLoop,
// 		isDescendentOfSingleProductBlock,
// 		isDescendentOfSingleProductTemplate,
// 	] );
//
// 	return (
// 		<>
// 			<BlockControls>
// 				<AlignmentToolbar
// 					value={ attributes.textAlign }
// 					onChange={ ( newAlign ) => {
// 						setAttributes( { textAlign: newAlign || '' } );
// 					} }
// 				/>
// 			</BlockControls>
// 			<div { ...blockProps }>
// 				<Block { ...blockAttrs } />
// 			</div>
// 		</>
// 	);
// };

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

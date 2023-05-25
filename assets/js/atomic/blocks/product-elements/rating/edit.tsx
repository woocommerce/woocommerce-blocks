/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	AlignmentToolbar,
	BlockControls,
	useBlockProps,
} from '@wordpress/block-editor';
import type { BlockEditProps } from '@wordpress/blocks';
import { useEffect } from '@wordpress/element';
import { ProductQueryContext as Context } from '@woocommerce/blocks/product-query/types';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import Block from './block';
import withProductSelector from '../shared/with-product-selector';
import { BLOCK_TITLE, BLOCK_ICON } from './constants';
import { BlockAttributes } from './types';
import './editor.scss';
import { useIsDescendentOfSingleProductBlock } from '../shared/use-is-descendent-of-single-product-block';

const Edit = (
	props: BlockEditProps< BlockAttributes > & { context: Context }
): JSX.Element => {
	const { attributes, setAttributes, context } = props;
	const blockProps = useBlockProps( {
		className: 'wp-block-woocommerce-product-rating',
	} );
	const blockAttrs = {
		...attributes,
		...context,
		shouldDisplayMockedReviewsWhenProductHasNoReviews: true,
	};
	const isDescendentOfQueryLoop = Number.isFinite( context.queryId );
	const { isDescendentOfSingleProductBlock } =
		useIsDescendentOfSingleProductBlock( {
			blockClientId: blockProps?.id,
		} );
	const { isDescendentOfSingleProductTemplate } = useSelect(
		( select ) => {
			const store = select( 'core/edit-site' );
			const postId = store?.getEditedPostId< string | undefined >();

			return {
				isDescendentOfSingleProductTemplate: Boolean(
					postId?.includes( '//single-product' ) &&
						! isDescendentOfQueryLoop &&
						! isDescendentOfSingleProductBlock
				),
			};
		},
		[ isDescendentOfQueryLoop, isDescendentOfSingleProductBlock ]
	);

	useEffect( () => {
		setAttributes( {
			isDescendentOfQueryLoop,
			isDescendentOfSingleProductBlock,
			isDescendentOfSingleProductTemplate,
		} );
	}, [
		setAttributes,
		isDescendentOfQueryLoop,
		isDescendentOfSingleProductBlock,
		isDescendentOfSingleProductTemplate,
	] );

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={ attributes.textAlign }
					onChange={ ( newAlign ) => {
						setAttributes( { textAlign: newAlign || '' } );
					} }
				/>
			</BlockControls>
			<div { ...blockProps }>
				<Block { ...blockAttrs } />
			</div>
		</>
	);
};

/**
 * The Edit block can be used in several contexts.
 *
 * If the `isDescendentOfSingleProductTemplate` attribute is true, it returns the `Edit` component with the `props` passed in.
 * If it's false, it wraps the `Edit` component with the `withProductSelector` higher-order component, which provides a product selector UI for the user to choose a product to display its rating.
 *
 */
export default (
	props: BlockEditProps< BlockAttributes > & { context: Context }
) => {
	if ( props.attributes.isDescendentOfSingleProductTemplate ) {
		return <Edit { ...props } />;
	}
	return withProductSelector( {
		icon: BLOCK_ICON,
		label: BLOCK_TITLE,
		description: __(
			'Choose a product to display its rating.',
			'woo-gutenberg-products-block'
		),
	} )( Edit )( props );
};

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

/**
 * Internal dependencies
 */
import Block from './block';
import { BlockAttributes } from './types';
import './editor.scss';
import { useIsDescendentOfSingleProductTemplate } from '../shared/use-is-descendent-of-single-product-template';

const Edit = ( {
	attributes,
	setAttributes,
	context,
}: BlockEditProps< BlockAttributes > & { context: Context } ): JSX.Element => {
	const blockProps = useBlockProps( {
		className: 'wp-block-woocommerce-product-rating',
	} );
	const blockAttrs = {
		...attributes,
		...context,
	};
	const isDescendentOfQueryLoop = Number.isFinite( context.queryId );

	const isDescendentOfSingleProductTemplate =
		useIsDescendentOfSingleProductTemplate( { isDescendentOfQueryLoop } );

	useEffect(
		() =>
			setAttributes( {
				isDescendentOfQueryLoop,
				isDescendentOfSingleProductTemplate,
			} ),
		[
			setAttributes,
			isDescendentOfQueryLoop,
			isDescendentOfSingleProductTemplate,
		]
	);

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
export default Edit;

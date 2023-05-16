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
import { Disabled } from '@wordpress/components';
import { ProductQueryContext as Context } from '@woocommerce/blocks/product-query/types';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import Block from './block';
import withProductSelector from '../shared/with-product-selector';
import blockMeta from './block.json';
import { BlockAttributes } from './types';

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
	const { isDescendentOfSingleProductBlock } = useSelect( ( select ) => {
		const { getBlockParentsByBlockName } = select( 'core/block-editor' );
		const blockParentBlocksIds = getBlockParentsByBlockName(
			blockProps?.id?.replace( 'block-', '' ),
			[ 'woocommerce/single-product' ]
		);
		return {
			isDescendentOfSingleProductBlock: blockParentBlocksIds.length > 0,
		};
	} );

	useEffect( () => {
		setAttributes( { isDescendentOfQueryLoop } );
		setAttributes( { isDescendentOfSingleProductBlock } );
	}, [
		setAttributes,
		isDescendentOfQueryLoop,
		isDescendentOfSingleProductBlock,
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
				<Disabled>
					<Block { ...blockAttrs } />
				</Disabled>
			</div>
		</>
	);
};
export default withProductSelector( {
	icon: blockMeta.icon,
	label: blockMeta.name,
	description: __(
		'Choose a product to display its rating.',
		'woo-gutenberg-products-block'
	),
} )( Edit );

/**
 * External dependencies
 */
import { isFeaturePluginBuild } from '@woocommerce/block-settings';
import {
	AlignmentToolbar,
	BlockControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { useEffect } from 'react';

/**
 * Internal dependencies
 */
import Block from './block';
import withProductSelector from '../shared/with-product-selector';
import { BLOCK_TITLE, BLOCK_ICON } from './constants';

const PriceEdit = ( { attributes, setAttributes, context } ) => {
	const blockProps = useBlockProps();
	const isDescendentOfQueryLoop = Number.isFinite( context.queryId );

	useEffect(
		() => setAttributes( { isDescendentOfQueryLoop } ),
		[ setAttributes, isDescendentOfQueryLoop ]
	);

	return (
		<>
			<BlockControls>
				{ isFeaturePluginBuild() && (
					<AlignmentToolbar
						value={ attributes.textAlign }
						onChange={ ( newAlign ) => {
							setAttributes( { textAlign: newAlign } );
						} }
					/>
				) }
			</BlockControls>
			<div { ...blockProps }>
				<Block { ...{ ...attributes, ...context } } />
			</div>
		</>
	);
};

export default withProductSelector( {
	icon: BLOCK_ICON,
	label: BLOCK_TITLE,
	description: __(
		'Choose a product to display its price.',
		'woo-gutenberg-products-block'
	),
} )( PriceEdit );

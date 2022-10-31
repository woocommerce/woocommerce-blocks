/**
 * External dependencies
 */
import { isFeaturePluginBuild } from '@woocommerce/block-settings';
import {
	AlignmentToolbar,
	BlockControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { useEffect } from 'react';

/**
 * Internal dependencies
 */
import Block from './block';
import withProductSelector from '../shared/with-product-selector';
import {
	BLOCK_TITLE as label,
	BLOCK_ICON as icon,
	BLOCK_DESCRIPTION as description,
} from './constants';

interface Attributes {
	textAlign: 'left' | 'center' | 'right';
}

interface Context {
	queryId: number;
}

interface Props {
	attributes: Attributes;
	setAttributes: ( attributes: Record< string, unknown > ) => void;
	context: Context;
}

const PriceEdit = ( {
	attributes,
	setAttributes,
	context,
}: Props ): JSX.Element => {
	const blockProps = useBlockProps();
	const blockAttrs = {
		...attributes,
		...context,
	};
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
				<Block { ...blockAttrs } />
			</div>
		</>
	);
};

export default withProductSelector( { icon, label, description } )( PriceEdit );

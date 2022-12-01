/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Disabled } from '@wordpress/components';
import EditProductLink from '@woocommerce/editor-components/edit-product-link';
import { useBlockProps } from '@wordpress/block-editor';
import type { BlockEditProps } from '@wordpress/blocks';
import { ProductQueryContext as Context } from '@woocommerce/blocks/product-query/types';
import { useEffect } from 'react';

/**
 * Internal dependencies
 */
import Block from './block';
import withProductSelector from '../shared/with-product-selector';
import { BLOCK_TITLE, BLOCK_ICON } from './constants';
import type { BlocksAttributes } from './types';

const Edit = ( {
	attributes,
	setAttributes,
	context,
}: BlockEditProps< BlocksAttributes > & { context: Context } ): JSX.Element => {
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
		<div { ...blockProps }>
			<EditProductLink />
			<Disabled>
				<Block { ...blockAttrs } />
			</Disabled>
		</div>
	);
};

export default withProductSelector( {
	icon: BLOCK_ICON,
	label: BLOCK_TITLE,
	description: __(
		'Choose a product to display its tags.',
		'woo-gutenberg-products-block'
	),
} )( Edit );

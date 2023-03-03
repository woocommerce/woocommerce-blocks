/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import type { BlockEditProps } from '@wordpress/blocks';
import EditProductLink from '@woocommerce/editor-components/edit-product-link';
import { ProductQueryContext as Context } from '@woocommerce/blocks/product-query/types';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Block from './block';
import { BLOCK_TITLE, BLOCK_ICON } from './constants';
import type { Attributes } from './types';
import { ProductSelector } from '../shared/product-selector';
import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

export default ( {
	attributes,
	setAttributes,
	context,
}: BlockEditProps< Attributes > & { context: Context } ): JSX.Element => {
	const blockAttrs = {
		...attributes,
		...context,
	};
	const isDescendentOfQueryLoop = Number.isFinite( context.queryId );

	const { showProductSelector, isDescendentOfSingleProductTemplate } =
		useSelect(
			( select ) => {
				const store = select( 'core/edit-site' );
				const postId = store?.getEditedPostId();

				const descendentOfSingleProductTemplate =
					( postId === 'woocommerce/woocommerce//product-meta' ||
						postId ===
							'woocommerce/woocommerce//single-product' ) &&
					! isDescendentOfQueryLoop;

				return {
					isDescendentOfSingleProductTemplate:
						descendentOfSingleProductTemplate,
					showProductSelector:
						! isDescendentOfQueryLoop &&
						! descendentOfSingleProductTemplate,
				};
			},
			[ isDescendentOfQueryLoop ]
		);

	const blockProps = useBlockProps();

	useEffect(
		() =>
			setAttributes( {
				isDescendentOfQueryLoop,
				isDescendentOfSingleProductTemplate,
				showProductSelector,
			} ),
		[
			isDescendentOfQueryLoop,
			isDescendentOfSingleProductTemplate,
			setAttributes,
			showProductSelector,
		]
	);

	if ( ! showProductSelector ) {
		return (
			<div { ...blockProps }>
				<EditProductLink />
				<Block { ...blockAttrs } />
			</div>
		);
	}

	return (
		<div { ...blockProps }>
			<ProductSelector
				productId={ attributes.productId }
				setAttributes={ setAttributes }
				icon={ BLOCK_ICON }
				label={ BLOCK_TITLE }
				description={ __(
					'Choose a product to display its SKU.',
					'woo-gutenberg-products-block'
				) }
			>
				<EditProductLink />
				<Block { ...blockAttrs } />
			</ProductSelector>
		</div>
	);
};

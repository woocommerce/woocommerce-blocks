/**
 * External dependencies
 */
import { createBlock, type BlockInstance } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { CHECKOUT_PAGE_ID } from '@woocommerce/block-settings';
import { ADMIN_URL } from '@woocommerce/settings';

/**
 * Internal dependencies
 */
import type { OnClickCallbackParameter, InheritedAttributes } from './types';

const isConversionPossible = () => {
	return true;
};

const getButtonLabel = () =>
	__( 'Transform into blocks', 'woo-gutenberg-products-block' );

const getBlockifiedTemplate = ( inheritedAttributes: InheritedAttributes ) =>
	[
		createBlock( 'woocommerce/checkout', {
			...inheritedAttributes,
			className: 'wc-block-checkout',
		} ),
	].filter( Boolean ) as BlockInstance[];

const onClickCallback = ( {
	clientId,
	attributes,
	getBlocks,
	replaceBlock,
	selectBlock,
}: OnClickCallbackParameter ) => {
	replaceBlock( clientId, getBlockifiedTemplate( attributes ) );

	const blocks = getBlocks();

	const groupBlock = blocks.find(
		( block ) =>
			block.name === 'core/group' &&
			block.innerBlocks.some(
				( innerBlock ) =>
					innerBlock.name === 'woocommerce/store-notices'
			)
	);

	if ( groupBlock ) {
		selectBlock( groupBlock.clientId );
	}
};

const getTitle = () => {
	return __( 'Checkout Page Placeholder', 'woo-gutenberg-products-block' );
};

const getDescription = () => {
	return __(
		'This block will render the contents of the classic checkout page. You can transform it into blocks to control the checkout page appearance here instead.',
		'woo-gutenberg-products-block'
	);
};

const getAdditionalActions = () => {
	return [
		{
			label: __( 'Edit page content', 'woo-gutenberg-products-block' ),
			url: `${ ADMIN_URL }post.php?post=${ CHECKOUT_PAGE_ID }&action=edit`,
		},
	];
};

const blockifyConfig = {
	getButtonLabel,
	onClickCallback,
	getBlockifiedTemplate,
	getAdditionalActions,
};

export { blockifyConfig, isConversionPossible, getDescription, getTitle };

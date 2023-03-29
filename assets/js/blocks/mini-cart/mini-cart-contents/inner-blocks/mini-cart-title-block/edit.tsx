/**
 * External dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export const Edit = (): JSX.Element => {
	const blockProps = useBlockProps();

	const TEMPLATE = [
		[ 'woocommerce/mini-cart-title-your-cart-block', {} ],
		[ 'woocommerce/mini-cart-title-items-counter-block', {} ],
	];

	return (
		<div { ...blockProps }>
			<InnerBlocks template={ TEMPLATE } />
		</div>
	);
};

export const Save = (): JSX.Element => {
	return (
		<div { ...useBlockProps.save() }>
			<InnerBlocks.Content />
		</div>
	);
};

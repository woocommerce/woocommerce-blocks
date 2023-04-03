/**
 * External dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export const Edit = (): JSX.Element => {
	const blockProps = useBlockProps();

	const TEMPLATE = [
		[ 'woocommerce/mini-cart-title-label-block', {} ],
		[ 'woocommerce/mini-cart-title-items-counter-block', {} ],
	];

	return (
		<div { ...blockProps }>
			<InnerBlocks
				allowedBlocks={ [
					'woocommerce/mini-cart-title-label-block',
					'woocommerce/mini-cart-title-items-counter-block',
				] }
				template={ TEMPLATE }
				templateLock={ false }
			/>
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

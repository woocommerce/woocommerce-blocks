/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { ProductBestSellersBlock } from './block';

export const Edit = ( props: unknown ): JSX.Element => {
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<ProductBestSellersBlock { ...props } />
		</div>
	);
};

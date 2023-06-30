/**
 * External dependencies
 */
import { BlockAttributes } from '@wordpress/blocks';
import type { BlockEditProps } from '@wordpress/blocks';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

type Context = {
	postId: string;
	postType: string;
	queryId: string;
};

interface Props extends BlockEditProps< BlockAttributes > {
	context: Context;
}

export const Edit = (): JSX.Element => {
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<InnerBlocks
				allowedBlocks={ [ 'woocommerce/product-gallery-large-image' ] }
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

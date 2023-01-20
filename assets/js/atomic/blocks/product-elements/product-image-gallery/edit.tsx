/**
 * Internal dependencies
 */

/**
 * External dependencies
 */
import { WC_BLOCKS_IMAGE_URL } from '@woocommerce/block-settings';
import { isEmptyObject } from '@woocommerce/types';
import { useBlockProps } from '@wordpress/block-editor';
import { BlockAttributes } from '@wordpress/blocks';

const Placeholder = () => {
	return (
		<img
			src={ `${ WC_BLOCKS_IMAGE_URL }template-placeholders/fallback.svg` }
			alt="Placeholder"
		/>
	);
};

type Context = {
	postId: string;
	postType: string;
	queryId: string;
};

interface Props {
	attributes: BlockAttributes;
	context: Context;
}

const Edit = ( { context }: Props ) => {
	const blockProps = useBlockProps();

	if ( isEmptyObject( context ) ) {
		return (
			<div { ...blockProps }>
				<Placeholder />
			</div>
		);
	}
	// We have work on this case when we will work on the Single Product block.
	return '';
};

export default Edit;

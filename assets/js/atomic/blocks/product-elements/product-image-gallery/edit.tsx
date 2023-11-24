/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { BlockAttributes } from '@wordpress/blocks';
import { Disabled } from '@wordpress/components';
import type { BlockEditProps } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { isEmptyObject } from '~/types';
import { WC_BLOCKS_IMAGE_URL } from '~/settings/blocks';
import './editor.scss';

const Placeholder = () => {
	return (
		<div className="wc-block-editor-product-gallery">
			<img
				src={ `${ WC_BLOCKS_IMAGE_URL }block-placeholders/product-image-gallery.svg` }
				alt="Placeholder"
			/>
			<div className="wc-block-editor-product-gallery__other-images">
				{ [ ...Array( 4 ).keys() ].map( ( index ) => {
					return (
						<img
							key={ index }
							src={ `${ WC_BLOCKS_IMAGE_URL }block-placeholders/product-image-gallery.svg` }
							alt="Placeholder"
						/>
					);
				} ) }
			</div>
		</div>
	);
};

type Context = {
	postId: string;
	postType: string;
	queryId: string;
};

interface Props extends BlockEditProps< BlockAttributes > {
	context: Context;
}

const Edit = ( { context }: Props ) => {
	const blockProps = useBlockProps();

	if ( isEmptyObject( context ) ) {
		return (
			<div { ...blockProps }>
				<Disabled>
					<Placeholder />
				</Disabled>
			</div>
		);
	}
	// We have work on this case when we will work on the Single Product block.
	return <></>;
};

export default Edit;

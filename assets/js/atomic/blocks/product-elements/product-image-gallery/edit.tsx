/**
 * External dependencies
 */
import { WC_BLOCKS_IMAGE_URL } from '@woocommerce/block-settings';
import { isEmptyObject } from '@woocommerce/types';
import { useBlockProps } from '@wordpress/block-editor';
import { BlockAttributes } from '@wordpress/blocks';
import { Disabled } from '@wordpress/components';

/**
 * Internal dependencies
 */
import './editor.scss';

const Placeholder = () => {
	return (
		<div className="wc-block-editor-product-gallery">
			<img
				src={ `${ WC_BLOCKS_IMAGE_URL }template-placeholders/fallback.svg` }
				style={ {
					width: '500px',
					height: '500px',
				} }
				alt="Placeholder"
			/>
			<div className="wc-block-editor-product-gallery__gallery">
				{ [ ...Array( 4 ).keys() ].map( ( index ) => {
					return (
						<img
							key={ index }
							src={ `${ WC_BLOCKS_IMAGE_URL }template-placeholders/fallback.svg` }
							style={ {
								width: '100px',
								height: '100px',
							} }
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

interface Props {
	attributes: BlockAttributes;
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
	return '';
};

export default Edit;

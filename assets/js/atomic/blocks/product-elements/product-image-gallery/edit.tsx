/**
 * External dependencies
 */
import { useBorderProps } from '@woocommerce/base-hooks';
import { WC_BLOCKS_IMAGE_URL } from '@woocommerce/block-settings';
import { isEmptyObject } from '@woocommerce/types';
import { useBlockProps } from '@wordpress/block-editor';
import { BlockAttributes } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import './editor.scss';

const Placeholder = ( { attributes }: BlockAttributes ) => {
	const marginProps = useBorderProps( attributes );

	return (
		<div className="wc-block-editor-product-gallery">
			<img
				src={ `${ WC_BLOCKS_IMAGE_URL }template-placeholders/fallback.svg` }
				style={ {
					width: '500px',
					height: '500px',
					...marginProps.style,
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
								...marginProps.style,
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

const Edit = ( { context, attributes }: Props ) => {
	const blockProps = useBlockProps();

	if ( isEmptyObject( context ) ) {
		return (
			<div { ...blockProps }>
				<Placeholder attributes={ attributes } />
			</div>
		);
	}
	// We have work on this case when we will work on the Single Product block.
	return '';
};

export default Edit;

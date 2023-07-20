/**
 * External dependencies
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { Disabled } from '@wordpress/components';
import type { BlockEditProps } from '@wordpress/blocks';
import { WC_BLOCKS_IMAGE_URL } from '@woocommerce/block-settings';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import './editor.scss';
import { BlockSettings } from './block-settings';
// import { Attributes } from './types';

export const Edit = ( {
	attributes,
	setAttributes,
	context,
}: BlockEditProps< Attributes > ) => {
	const blockProps = useBlockProps( {
		className: classNames(
			'wc-block-editor-product-gallery-thumbnails',
			`wc-block-editor-product-gallery-thumbnails-${ context.thumbnailsPosition }`
		),
	} );

	const Placeholder = () => {
		return (
			<>
				{ context.thumbnailsPosition !== 'off' && (
					<div className="wc-block-editor-product-gallery-thumbnails">
						{ [
							...Array(
								context.thumbnailsNumberOfThumbnails
							).keys(),
						].map( ( index ) => {
							return (
								<img
									key={ index }
									src={ `${ WC_BLOCKS_IMAGE_URL }block-placeholders/product-image-gallery.svg` }
									alt="Placeholder"
								/>
							);
						} ) }
					</div>
				) }
			</>
		);
	};

	return (
		<>
			<div { ...blockProps }>
				<InspectorControls>
					<BlockSettings
						attributes={ attributes }
						setAttributes={ setAttributes }
						context={ context }
					/>
				</InspectorControls>
				<Disabled>
					<Placeholder />
				</Disabled>
			</div>
		</>
	);
};

/* eslint-disable @wordpress/no-unsafe-wp-apis */

/**
 * External dependencies
 */
import {
	__experimentalImageEditingProvider as ImageEditingProvider,
	__experimentalImageEditor as GutenbergImageEditor,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { DEFAULT_EDITOR_SIZE } from './constants';

export const ImageEditor = ( {
	backgroundImageId,
	backgroundImageSize,
	backgroundImageSrc,
	isEditingImage,
	setAttributes,
	setIsEditingImage,
} ) => {
	return (
		<>
			<ImageEditingProvider
				id={ backgroundImageId }
				url={ backgroundImageSrc }
				naturalHeight={
					backgroundImageSize.height || DEFAULT_EDITOR_SIZE.height
				}
				naturalWidth={
					backgroundImageSize.width || DEFAULT_EDITOR_SIZE.width
				}
				onSaveImage={ ( { id, url } ) => {
					setAttributes( { mediaId: id, mediaSrc: url } );
				} }
				isEditing={ isEditingImage }
				onFinishEditing={ () => setIsEditingImage( false ) }
			>
				<GutenbergImageEditor
					url={ backgroundImageSrc }
					height={
						backgroundImageSize.height || DEFAULT_EDITOR_SIZE.height
					}
					width={
						backgroundImageSize.width || DEFAULT_EDITOR_SIZE.width
					}
				/>
			</ImageEditingProvider>
		</>
	);
};

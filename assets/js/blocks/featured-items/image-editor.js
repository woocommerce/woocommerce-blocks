/* eslint-disable @wordpress/no-unsafe-wp-apis */

/**
 * External dependencies
 */
import { useEffect, useState } from 'react';
import {
	__experimentalImageEditingProvider as ImageEditingProvider,
	__experimentalImageEditor as GutenbergImageEditor,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { BLOCK_NAMES, DEFAULT_EDITOR_SIZE } from './constants';
import { useBackgroundImage } from './use-background-image';

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

export const withImageEditor = ( Component ) => ( props ) => {
	const [ isEditingImage, setIsEditingImage ] = useState( false );

	const { attributes, isSelected, name, setAttributes } = props;
	const { mediaId, mediaSrc } = attributes;
	const item =
		name === BLOCK_NAMES.featuredProduct ? props.product : props.category;

	const { backgroundImageId, backgroundImageSrc } = useBackgroundImage( {
		item,
		mediaId,
		mediaSrc,
		blockName: name,
	} );

	useEffect( () => {
		setIsEditingImage( false );
	}, [ isSelected ] );

	if ( isEditingImage ) {
		return (
			<ImageEditor
				backgroundImageId={ backgroundImageId }
				backgroundImageSize={ { width: 500, height: 500 } }
				backgroundImageSrc={ backgroundImageSrc }
				isEditingImage={ isEditingImage }
				setAttributes={ setAttributes }
				setIsEditingImage={ setIsEditingImage }
			/>
		);
	}

	return (
		<Component
			{ ...props }
			useEditingImage={ [ isEditingImage, setIsEditingImage ] }
		/>
	);
};

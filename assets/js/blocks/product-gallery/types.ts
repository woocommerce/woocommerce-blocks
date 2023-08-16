/**
 * Internal dependencies
 */
import { ProductGalleryNextPreviousBlockAttributes } from './inner-blocks/product-gallery-large-image-next-previous/types';
import { ThumbnailsPosition } from './inner-blocks/product-gallery-thumbnails/constants';

export interface ProductGalleryBlockAttributes {
	cropImages?: boolean;
	hoverZoom?: boolean;
	fullScreenOnClick?: boolean;
}

export interface ProductGalleryThumbnailsBlockAttributes {
	thumbnailsPosition: ThumbnailsPosition;
	thumbnailsNumberOfThumbnails: number;
	productGalleryClientId: string;
}

export interface ProductGalleryBlockEditProps {
	clientId: string;
	attributes: ProductGalleryThumbnailsBlockAttributes;
	setAttributes: (
		newAttributes: ProductGalleryThumbnailsBlockAttributes
	) => void;
}

export interface ProductGallerySettingsProps {
	attributes: ProductGalleryBlockAttributes;
	setAttributes: ( attributes: ProductGalleryBlockAttributes ) => void;
}

export interface ProductGalleryThumbnailsSettingsProps {
	attributes: ProductGalleryThumbnailsBlockAttributes;
	setAttributes: (
		attributes: ProductGalleryThumbnailsBlockAttributes
	) => void;
	context: ProductGalleryThumbnailsBlockAttributes;
}

export type Context = {
	thumbnailsPosition: ThumbnailsPosition;
	thumbnailsNumberOfThumbnails: number;
	productGalleryClientId: string;
} & ProductGalleryNextPreviousBlockAttributes;

/**
 * Internal dependencies
 */
import { ThumbnailsPosition } from './constants';

export interface BlockAttributes {
	thumbnailsPosition: ThumbnailsPosition;
	thumbnailsNumberOfThumbnails: number;
	productGalleryClientId: string;
}

export interface Context {
	context: {
		thumbnailsPosition: ThumbnailsPosition;
		thumbnailsNumberOfThumbnails: number;
		productGalleryClientId: string;
	};
}

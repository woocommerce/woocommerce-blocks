/**
 * External dependencies
 */
import { createContext, useContext } from '@wordpress/element';

/**
 * Context consumed by inner blocks.
 */
export type ProductGalleryBlockContextProps = {
	thumbnailsPosition: string;
	thumbnailsNumberOfThumbnails: number;
};

export const ProductGalleryBlockContext =
	createContext< ProductGalleryBlockContextProps >( {
		thumbnailsPosition: 'left',
		thumbnailsNumberOfThumbnails: 3,
	} );

export const useProductGalleryBlockContext =
	(): ProductGalleryBlockContextProps => {
		return useContext( ProductGalleryBlockContext );
	};

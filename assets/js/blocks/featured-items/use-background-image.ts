/**
 * External dependencies
 */
import { WP_REST_API_Category } from 'wp-types';
import { ProductResponseItem } from '@woocommerce/types';
import {
	getImageSrcFromProduct,
	getImageIdFromProduct,
} from '@woocommerce/utils';
import { useEffect, useState } from 'react';

/**
 * Internal dependencies
 */
import { BLOCK_NAMES } from './constants';
import {
	getCategoryImageSrc,
	getCategoryImageId,
} from './featured-category/utils';

interface BackgroundProps {
	blockName: string;
	item: ProductResponseItem | WP_REST_API_Category;
	mediaId: number;
	mediaSrc: string;
}

interface BackgroundImage {
	backgroundImageId: number;
	backgroundImageSrc: string;
}

export function useBackgroundImage( {
	blockName,
	item,
	mediaId,
	mediaSrc,
}: BackgroundProps ): BackgroundImage {
	const [ backgroundImageId, setBackgroundImageId ] = useState( 0 );
	const [ backgroundImageSrc, setBackgroundImageSrc ] = useState( '' );

	useEffect( () => {
		if ( mediaId ) {
			setBackgroundImageId( mediaId );
		} else {
			setBackgroundImageId(
				blockName === BLOCK_NAMES.featuredProduct
					? getImageIdFromProduct( item )
					: getCategoryImageId( item )
			);
		}
	}, [ blockName, item, mediaId ] );

	useEffect( () => {
		if ( mediaSrc ) {
			setBackgroundImageSrc( mediaSrc );
		} else {
			setBackgroundImageSrc(
				blockName === BLOCK_NAMES.featuredProduct
					? getImageSrcFromProduct( item )
					: getCategoryImageSrc( item )
			);
		}
	}, [ blockName, item, mediaSrc ] );

	return { backgroundImageId, backgroundImageSrc };
}

/* eslint-disable @wordpress/no-unsafe-wp-apis */

/**
 * External dependencies
 */
import { useState, useCallback, useEffect } from 'react';
import { __experimentalUseGradient as useGradient } from '@wordpress/block-editor';
import {
	getImageIdFromProduct,
	getImageSrcFromProduct,
} from '@woocommerce/utils';

/**
 * Internal dependencies
 */
import {
	getCategoryImageSrc,
	getCategoryImageId,
} from './featured-category/utils';

export function useSetup( {
	isSelected,
	item,
	mediaId,
	mediaSrc,
	metadata,
	setAttributes,
} ) {
	const [ isEditingImage, setIsEditingImage ] = useState( false );
	const [ backgroundImageSize, setBackgroundImageSize ] = useState( {} );
	const { setGradient } = useGradient( {
		gradientAttribute: 'overlayGradient',
		customGradientAttribute: 'overlayGradient',
	} );

	const backgroundImageSrc =
		mediaSrc || metadata.name === 'woocommerce/featured-product'
			? getImageSrcFromProduct( item )
			: getCategoryImageSrc( item );
	const backgroundImageId =
		mediaId || metadata.name === 'woocommerce/featured-product'
			? getImageIdFromProduct( item )
			: getCategoryImageId( item );

	const onResize = useCallback(
		( _event, _direction, elt ) => {
			setAttributes( { minHeight: parseInt( elt.style.height, 10 ) } );
		},
		[ setAttributes ]
	);

	useEffect( () => {
		setIsEditingImage( false );
	}, [ isSelected ] );

	return {
		backgroundImageId,
		backgroundImageSize,
		backgroundImageSrc,
		isEditingImage,
		onResize,
		setBackgroundImageSize,
		setGradient,
		setIsEditingImage,
	};
}

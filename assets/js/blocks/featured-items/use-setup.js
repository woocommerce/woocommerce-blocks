/* eslint-disable @wordpress/no-unsafe-wp-apis */

/**
 * External dependencies
 */
import { useState, useCallback } from 'react';
import { __experimentalUseGradient as useGradient } from '@wordpress/block-editor';

export function useSetup( { setAttributes } ) {
	const [ isEditingImage, setIsEditingImage ] = useState( false );
	const [ backgroundImageSize, setBackgroundImageSize ] = useState( {} );
	const { setGradient } = useGradient( {
		gradientAttribute: 'overlayGradient',
		customGradientAttribute: 'overlayGradient',
	} );

	const onResize = useCallback(
		( _event, _direction, elt ) => {
			setAttributes( { minHeight: parseInt( elt.style.height, 10 ) } );
		},
		[ setAttributes ]
	);

	return {
		backgroundImageSize,
		isEditingImage,
		onResize,
		setBackgroundImageSize,
		setGradient,
		setIsEditingImage,
	};
}

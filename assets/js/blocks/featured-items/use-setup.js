/* eslint-disable @wordpress/no-unsafe-wp-apis */

/**
 * External dependencies
 */
import { useState, useCallback } from 'react';

export function useSetup( { setAttributes } ) {
	const [ backgroundImageSize, setBackgroundImageSize ] = useState( {} );

	const onResize = useCallback(
		( _event, _direction, elt ) => {
			setAttributes( { minHeight: parseInt( elt.style.height, 10 ) } );
		},
		[ setAttributes ]
	);

	return {
		backgroundImageSize,
		onResize,
		setBackgroundImageSize,
	};
}

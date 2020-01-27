/**
 * External dependencies
 */
import { cloneElement } from '@wordpress/element';

function Icon( { srcElement, size = 24, ...props } ) {
	return cloneElement( srcElement, {
		width: size,
		height: size,
		...props,
	} );
}

export default Icon;

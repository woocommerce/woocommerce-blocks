/**
 * External dependencies
 */
import { cloneElement, isValidElement } from '@wordpress/element';

function Icon( { srcElement, size = 24, ...props } ) {
	return (
		isValidElement( srcElement ) &&
		cloneElement( srcElement, {
			width: size,
			height: size,
			...props,
		} )
	);
}

export default Icon;

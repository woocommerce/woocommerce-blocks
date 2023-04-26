/**
 * External dependencies
 */
import classnames from 'classnames';
import { isObject } from '@woocommerce/types';
import { parseStyle } from '@woocommerce/base-utils';

/**
 * Internal dependencies
 */
import { useTypographyProps } from './use-typography-props';
import {
	getColorClassesAndStyles,
	getBorderClassesAndStyles,
	getSpacingClassesAndStyles,
	WithStyle,
} from '../utils';

type StyleProps = {
	className: string;
	style: Record< string, unknown >;
};

/**
 * Parse the style object saved with blocks and returns the CSS class names and inline styles.
 *
 * This hook (and its utilities) borrow functionality from the Gutenberg Block Editor package--something we don't want
 * to import on the frontend.
 */
export const useStyleProps = ( attributes: unknown ): StyleProps => {
	const attributesObject = isObject( attributes ) ? attributes : {};

	const typographyProps = useTypographyProps( attributesObject );
	const style = parseStyle( attributesObject.style );

	const colorProps = getColorClassesAndStyles( {
		style,
	} as WithStyle );

	const borderProps = getBorderClassesAndStyles( {
		style,
	} as WithStyle );

	const spacingProps = getSpacingClassesAndStyles( {
		style,
	} as WithStyle );

	/* TODO
	const { borderColor } = attributesObject;
	if ( borderColor ) {
		const borderColorObject = getMultiOriginColor( {
			colors,
			namedColor: borderColor,
		} );

		borderProps.style.borderColor = borderColorObject.color;
	}
	*/

	return {
		className: classnames(
			typographyProps.className,
			colorProps.className,
			borderProps.className,
			spacingProps.className
		),
		style: {
			...typographyProps.style,
			...colorProps.style,
			...borderProps.style,
			...spacingProps.style,
		},
	};
};

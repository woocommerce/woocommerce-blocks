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

type blockAttributes = {
	style: Record< string, unknown > | string;
};

type StyleProps = {
	className: string;
	style: Record< string, unknown >;
};

/**
 * Returns the CSS class names and inline styles for a block when provided with its props/attributes.
 *
 * This hook (and its utilities) borrow functionality from the Gutenberg Block Editor package--something we don't want
 * to import on the frontend.
 */
export const useStyleProps = ( props: blockAttributes ): StyleProps => {
	const propsObject = isObject( props )
		? props
		: {
				style: {},
		  };

	const styleObject = parseStyle( propsObject.style );

	const colorProps = getColorClassesAndStyles( {
		style: styleObject,
	} as WithStyle );

	const borderProps = getBorderClassesAndStyles( {
		style: styleObject,
	} as WithStyle );

	const spacingProps = getSpacingClassesAndStyles( {
		style: styleObject,
	} as WithStyle );

	const typographyProps = useTypographyProps( propsObject );

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

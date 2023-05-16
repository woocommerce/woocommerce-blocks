/**
 * External dependencies
 */
import { isObject, isString } from '@woocommerce/types';
import { parseStyle } from '@woocommerce/base-utils';
import type { CSSProperties } from 'react';

type WithClass = {
	className: string;
};

type WithStyle = {
	style: CSSProperties;
};

type blockAttributes = {
	style?: CSSProperties | string | undefined;
	// String identifier for the font size preset--not an absolute value.
	fontSize?: string | undefined;
	// String identifier for the font family preset, not the actual font family.
	fontFamily?: string | undefined;
};

export const useTypographyProps = (
	props: blockAttributes
): WithStyle & WithClass => {
	const styleObject = parseStyle( props.style );
	const typography = isObject( styleObject.typography )
		? ( styleObject.typography as CSSProperties )
		: {};

	const classNameFallback = isString( typography.fontFamily )
		? typography.fontFamily
		: '';
	const className = props.fontFamily
		? `has-${ props.fontFamily }-font-family`
		: classNameFallback;

	return {
		className,
		style: {
			fontSize: props.fontSize
				? `var(--wp--preset--font-size--${ props.fontSize })`
				: typography.fontSize,
			fontStyle: typography.fontStyle,
			fontWeight: typography.fontWeight,
			letterSpacing: typography.letterSpacing,
			lineHeight: typography.lineHeight,
			textDecoration: typography.textDecoration,
			textTransform: typography.textTransform,
		},
	};
};

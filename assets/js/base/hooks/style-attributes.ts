/* eslint-disable @wordpress/no-unsafe-wp-apis */
/**
 * External dependencies
 */
import {
	__experimentalUseColorProps,
	__experimentalGetSpacingClassesAndStyles,
	__experimentalUseBorderProps,
} from '@wordpress/block-editor';
import { isFeaturePluginBuild } from '@woocommerce/block-settings';
import { isString, isObject } from '@woocommerce/types';
import { hasSpacingStyleSupport } from '@woocommerce/utils';

type WithClass = {
	className: string;
};

type WithStyle = {
	style: Record< string, unknown >;
};

const parseStyle = ( style: unknown ): Record< string, unknown > => {
	if ( isString( style ) ) {
		return JSON.parse( style ) || {};
	}

	if ( isObject( style ) ) {
		return style;
	}

	return {};
};

export const useSpacingProps = ( attributes: unknown ): WithStyle => {
	if ( ! isFeaturePluginBuild() || ! hasSpacingStyleSupport() ) {
		return {
			style: {},
		};
	}
	const attributesObject = isObject( attributes ) ? attributes : {};
	const style = parseStyle( attributesObject.style );

	return __experimentalGetSpacingClassesAndStyles( {
		...attributesObject,
		style,
	} );
};

export const useTypographyProps = ( attributes: unknown ): WithStyle => {
	const attributesObject = isObject( attributes ) ? attributes : {};
	const style = parseStyle( attributesObject.style );
	const typography = isObject( style.typography )
		? ( style.typography as Record< string, unknown > )
		: {};

	return {
		style: {
			fontSize: attributesObject.fontSize
				? `var(--wp--preset--font-size--${ attributesObject.fontSize })`
				: typography.fontSize,
			lineHeight: typography.lineHeight,
			fontWeight: typography.fontWeight,
			textTransform: typography.textTransform,
			fontFamily: attributesObject.fontFamily,
		},
	};
};

export const useColorProps = ( attributes: unknown ): WithStyle & WithClass => {
	if ( ! isFeaturePluginBuild() ) {
		return {
			className: '',
			style: {},
		};
	}

	const attributesObject = isObject( attributes ) ? attributes : {};
	const style = parseStyle( attributesObject.style );

	return __experimentalUseColorProps( { ...attributesObject, style } );
};

export const useBorderProps = (
	attributes: unknown
): WithStyle & WithClass => {
	if ( ! isFeaturePluginBuild() ) {
		return {
			className: '',
			style: {},
		};
	}

	const attributesObject = isObject( attributes ) ? attributes : {};
	const style = parseStyle( attributesObject.style );

	return __experimentalUseBorderProps( { ...attributesObject, style } );
};

/* eslint-disable @wordpress/no-unsafe-wp-apis */
/**
 * External dependencies
 */
import { __experimentalUseColorProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { isFeaturePluginBuild } from '../settings/blocks/feature-flags';
import { isString, isObject } from '../types/type-guards';

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

const getSpacingStyleInline = (
	key: string,
	values: {
		top: string | null;
		right: string | null;
		bottom: string | null;
		left: string | null;
	}
) => {
	return {
		...( isString( values.top ) && { [ `${ key }Top` ]: values.top } ),
		...( isString( values.right ) && {
			[ `${ key }Right` ]: values.right,
		} ),
		...( isString( values.bottom ) && {
			[ `${ key }Bottom` ]: values.bottom,
		} ),
		...( isString( values.left ) && { [ `${ key }Left` ]: values.left } ),
	};
};

const parseSpacingStyle = (
	spacing: Record< string, unknown >
): Record< string, unknown > => {
	const keys = [ 'margin' ];

	const getValueOrDefault = ( value: unknown ) => {
		return isString( value ) && value.length > 0 ? value : null;
	};

	return Object.keys( spacing ).reduce( ( acc, key ) => {
		const spacingProperty = isObject( spacing[ key ] )
			? ( spacing[ key ] as Record< string, unknown > )
			: {};

		if ( keys.includes( key ) ) {
			return {
				...acc,
				...getSpacingStyleInline( key, {
					top: getValueOrDefault( spacingProperty.top ),
					right: getValueOrDefault( spacingProperty.right ),
					bottom: getValueOrDefault( spacingProperty.bottom ),
					left: getValueOrDefault( spacingProperty.left ),
				} ),
			};
		}

		return acc;
	}, {} );
};

export const useSpacingProps = ( attributes: unknown ): WithStyle => {
	const style = isObject( attributes ) ? parseStyle( attributes.style ) : {};
	const spacingStyles = isObject( style.spacing ) ? style.spacing : {};

	return {
		style: parseSpacingStyle( spacingStyles ),
	};
};

export const useTypographyProps = ( attributes: unknown ): WithStyle => {
	const attributesObject = isObject( attributes ) ? attributes : {};
	const style = parseStyle( attributesObject.style );
	const typography = isObject( style.typography )
		? ( style.typography as Record< string, unknown > )
		: {};

	return {
		style: {
			fontSize: attributesObject.fontSize || typography.fontSize,
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

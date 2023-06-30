/* eslint-disable @typescript-eslint/ban-ts-comment */
/**
 * External dependencies
 */
import { useMemo } from '@wordpress/element';
import {
	store as blockEditorStore,
	getColorClassName,
	InspectorControls,
	useBlockEditContext,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';

interface ColorSetting {
	colorValue: string | undefined;
	onColorChange: ( value: string ) => void;
	label: string;
	resetAllFilter: () => void;
}

interface ColorAttributes {
	[ key: string ]: {
		[ key: string ]: string;
	};
}

export interface CustomColorsMap {
	[ key: string ]: {
		label: string;
		context: string;
	};
}

export interface ColorPaletteOption {
	name: string;
	slug: string;
	color: string;
}

export interface GradientPaletteOption {
	name: string;
	gradient: string;
	slug: string;
}

interface ColorGradientOptionsColorItem {
	name: string;
	colors: ColorPaletteOption[];
}

interface ColorGradientOptionsGradientItem {
	name: string;
	gradients: GradientPaletteOption[];
}

interface ColorGradientOptionsItems {
	colors: [ ColorGradientOptionsColorItem ];
	gradients: [ ColorGradientOptionsGradientItem ];
}

const flattenColors = (
	colorGradientOptions: ColorGradientOptionsItems
): ColorPaletteOption[] & GradientPaletteOption[] => {
	const flattenedColors: ColorPaletteOption[] & GradientPaletteOption[] = [];
	if ( colorGradientOptions.colors ) {
		colorGradientOptions.colors.forEach( ( colorItem ) => {
			flattenedColors.push( ...colorItem.colors );
		} );
	}
	if ( colorGradientOptions.gradients ) {
		colorGradientOptions.gradients.forEach( ( gradientItem ) => {
			flattenedColors.push( ...gradientItem.gradients );
		} );
	}
	return flattenedColors;
};

const getColorObject = (
	colors: ColorPaletteOption[] & GradientPaletteOption[],
	colorValue: string | undefined,
	context: string
) => {
	if ( ! colorValue ) {
		return;
	}
	const colorObject = colors?.find( ( color ) => {
		return color.color === colorValue || color.slug === colorValue;
	} ) as {
		color: string;
		slug?: string | undefined;
		class?: string | undefined;
	};
	if ( ! colorObject.color ) {
		colorObject.color = colorValue;
	}
	colorObject.class = getColorClassName( context, colorObject?.slug );
	return colorObject;
};

const createSetColor = (
	colorName: string,
	context: string,
	colors: ColorPaletteOption[] & GradientPaletteOption[],
	setAttributes: ( attributes: Record< string, unknown > ) => void
): ( ( colorValue?: string ) => void ) => {
	return ( colorValue?: string ) => {
		const colorObject = getColorObject( colors, colorValue, context ) || {};
		setAttributes( {
			[ colorName ]: colorObject,
		} );
	};
};

const createSettings = (
	colorTypes: CustomColorsMap,
	colors: ColorPaletteOption[] & GradientPaletteOption[],
	attributes: ColorAttributes | undefined,
	setAttributes: ( attributes: Record< string, unknown > ) => void
) => {
	return Object.entries( colorTypes ).reduce(
		( settingsAccumulator, [ colorAttributeName, colorAttribute ] ) => {
			const colorSetter = createSetColor(
				colorAttributeName,
				colorAttribute.context,
				colors,
				setAttributes
			);
			const colorSetting = {
				colorValue:
					attributes?.[ colorAttributeName ]?.color ?? undefined,
				label: colorAttribute.label,
				onColorChange: colorSetter,
				resetAllFilter: () => colorSetter(),
			};
			settingsAccumulator.push( colorSetting );
			return settingsAccumulator;
		},
		[] as ColorSetting[]
	);
};

export const ColorPanel = ( {
	colorTypes,
}: {
	colorTypes: CustomColorsMap;
} ) => {
	const colorGradientOptions = useMultipleOriginColorsAndGradients();
	const flattenedColors = flattenColors( colorGradientOptions );
	const { clientId } = useBlockEditContext();
	const attributes = useSelect(
		( select ) => {
			// @ts-ignore @wordpress/block-editor/store types not provided
			const { getBlockAttributes } = select( blockEditorStore );
			return getBlockAttributes( clientId ) || {};
		},
		[ clientId ]
	);
	// @ts-ignore @wordpress/block-editor/store types not provided
	const { updateBlockAttributes } = useDispatch( blockEditorStore );
	const settings = useMemo( () => {
		return createSettings(
			colorTypes,
			flattenedColors,
			attributes,
			( newAttributes ) =>
				updateBlockAttributes( clientId, newAttributes )
		);
	}, [
		colorTypes,
		flattenedColors,
		updateBlockAttributes,
		attributes,
		clientId,
	] );
	return (
		colorGradientOptions.hasColorsOrGradients && (
			// @ts-ignore The dev package version doesn't have types for group.
			<InspectorControls group="color">
				<ColorGradientSettingsDropdown
					__experimentalIsRenderedInSidebar
					settings={ settings }
					panelId={ clientId }
					{ ...colorGradientOptions }
				/>
			</InspectorControls>
		)
	);
};

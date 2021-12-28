/**
 * External dependencies
 */
import { CSSProperties } from 'react';

type ClassAndStyle = {
	class: string | undefined;
	style: CSSProperties | undefined;
};

type WithStyleObject = {
	style: CSSProperties;
};

export const getTextColorClassAndStyleFromAttributeObject = (
	attributesObj: Record< string, unknown > & Partial< WithStyleObject >
): ClassAndStyle => {
	const colorText = attributesObj.textColor;

	if ( colorText ) {
		return {
			class: `has-text-color has-${ colorText }-color`,
			style: undefined,
		};
	}

	if ( attributesObj?.style?.color ) {
		return {
			class: undefined,
			style: { color: attributesObj.style.color },
		};
	}

	return {
		class: undefined,
		style: undefined,
	};
};

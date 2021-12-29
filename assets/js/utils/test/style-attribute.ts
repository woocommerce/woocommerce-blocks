/**
 * Internal dependencies
 */
import { getTextColorClassAndStyleFromAttributeObject } from '../style-attributes';

describe( 'getTextColorClassAndStyleFromAttributeObject', () => {
	const attributesObjectWithTextColor = {
		textColor: 'red',
	};

	const attributesObjectWithStyleObject = {
		style: {
			color: '#FF0000',
		},
	};

	const attributesObjectWithoutStyle = {
		attribute: 'attribute',
		attribut2: 'attribute2',
	};

	test( 'returns an object with a defined class property when the attributes object has textColor', () => {
		const textColorObject = getTextColorClassAndStyleFromAttributeObject(
			attributesObjectWithTextColor
		);

		expect( textColorObject ).toStrictEqual( {
			class: 'has-text-color has-red-color',
			style: undefined,
		} );
	} );

	test( 'returns an object with a defined style property when the attributes object has style object with color attribute defined', () => {
		const textColorObject = getTextColorClassAndStyleFromAttributeObject(
			attributesObjectWithStyleObject
		);

		expect( textColorObject ).toStrictEqual( {
			class: undefined,
			style: { color: '#FF0000' },
		} );
	} );

	test( 'returns an object with class and style properties undefined when the attributes object does not contain text style data', () => {
		const textColorObject = getTextColorClassAndStyleFromAttributeObject(
			attributesObjectWithoutStyle
		);

		expect( textColorObject ).toStrictEqual( {
			class: undefined,
			style: undefined,
		} );
	} );
} );

/**
 * External dependencies
 */
import { useState, useEffect, useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import AttributeSelectControl from './attribute-select-control';
import {
	getVariationMatchingSelectedAttributes,
	getActiveSelectControlOptions,
} from './utils';

/**
 * AttributePicker component.
 *
 * @param {*} props Component props.
 */
const AttributePicker = ( {
	attributes,
	variationAttributes,
	setRequestParams,
} ) => {
	const [ variationId, setVariationId ] = useState( 0 );
	const [ selectedAttributes, setSelectedAttributes ] = useState( {} );

	const attributeNames = Object.keys( attributes );
	const hasSelectedAllAttributes =
		Object.values( selectedAttributes ).filter(
			( selected ) => selected !== ''
		).length === attributeNames.length;

	// Get options for each attribute picker.
	const filteredAttributeOptions = useMemo( () => {
		return getActiveSelectControlOptions(
			attributes,
			variationAttributes,
			selectedAttributes
		);
	}, [ attributes, variationAttributes, selectedAttributes ] );

	// Select variation when selections change.
	useEffect( () => {
		if ( hasSelectedAllAttributes ) {
			setVariationId(
				getVariationMatchingSelectedAttributes(
					attributes,
					variationAttributes,
					selectedAttributes
				)
			);
		}
	}, [
		attributes,
		variationAttributes,
		selectedAttributes,
		hasSelectedAllAttributes,
	] );

	// Unset variation when form is incomplete.
	useEffect( () => {
		if ( ! hasSelectedAllAttributes && variationId > 0 ) {
			setVariationId( 0 );
		}
	}, [ hasSelectedAllAttributes, variationId ] );

	// Set requests params as variation ID and data changes.
	useEffect( () => {
		setRequestParams( {
			id: variationId,
			variation: Object.keys( selectedAttributes ).map(
				( attributeName ) => {
					return {
						attribute: attributeName,
						value: selectedAttributes[ attributeName ],
					};
				}
			),
		} );
	}, [ setRequestParams, variationId, selectedAttributes ] );

	return (
		<div className="wc-block-components-product-add-to-cart-attribute-picker">
			{ attributeNames.map( ( attributeName ) => (
				<AttributeSelectControl
					key={ attributeName }
					attributeName={ attributeName }
					options={ filteredAttributeOptions[ attributeName ] }
					value={ selectedAttributes[ attributeName ] }
					onChange={ ( selected ) => {
						setSelectedAttributes( {
							...selectedAttributes,
							[ attributeName ]: selected,
						} );
					} }
				/>
			) ) }
		</div>
	);
};

export default AttributePicker;

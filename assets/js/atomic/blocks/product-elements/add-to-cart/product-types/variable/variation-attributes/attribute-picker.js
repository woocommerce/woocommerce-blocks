/**
 * External dependencies
 */
import { useState, useEffect, useMemo, useRef } from '@wordpress/element';
import isShallowEqual from '@wordpress/is-shallow-equal';

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
	const attributesRef = useRef( attributes );
	const variationAttributesRef = useRef( variationAttributes );
	const [ variationId, setVariationId ] = useState( 0 );
	const [ selectedAttributes, setSelectedAttributes ] = useState( {} );

	// Keeps refs in sync.
	useEffect( () => {
		if ( ! isShallowEqual( attributesRef.current, attributes ) ) {
			attributesRef.current = attributes;
		}
	}, [ attributes ] );

	useEffect( () => {
		if (
			! isShallowEqual(
				variationAttributesRef.current,
				variationAttributes
			)
		) {
			variationAttributesRef.current = variationAttributes;
		}
	}, [ variationAttributes ] );

	// Get options for each attribute picker.
	const filteredAttributeOptions = useMemo( () => {
		return getActiveSelectControlOptions(
			attributesRef.current,
			variationAttributesRef.current,
			selectedAttributes
		);
	}, [ selectedAttributes ] );

	// Select variations when selections are hange.
	useEffect( () => {
		const hasSelectedAllAttributes =
			Object.values( selectedAttributes ).filter(
				( selected ) => selected !== ''
			).length === Object.keys( attributesRef.current ).length;

		if ( hasSelectedAllAttributes ) {
			setVariationId(
				getVariationMatchingSelectedAttributes(
					attributesRef.current,
					variationAttributesRef.current,
					selectedAttributes
				)
			);
		} else if ( variationId > 0 ) {
			// Unset variation when form is incomplete.
			setVariationId( 0 );
		}
	}, [ selectedAttributes, variationId ] );

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
			{ Object.keys( attributesRef.current ).map( ( attributeName ) => (
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

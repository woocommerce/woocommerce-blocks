/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect, useMemo } from '@wordpress/element';
import { decodeEntities } from '@wordpress/html-entities';
import { SelectControl } from '@wordpress/components';
import { keyBy } from 'lodash';

/**
 * Format variations from the API into a map of just the attribute names and values.
 *
 * @param {Array} variations Variations array.
 */
const getVariationAttributesMap = ( variations ) => {
	const attributesMap = {};

	variations.forEach( ( { id: varId, attributes: variationAttributes } ) => {
		attributesMap[ varId ] = variationAttributes.reduce(
			( acc, { name, value } ) => {
				acc[ name ] = value;
				return acc;
			},
			[]
		);
	} );

	return attributesMap;
};

// Default option for select boxes.
const selectAnOption = {
	value: '',
	label: __( 'Select an option', 'woo-gutenberg-products-block' ),
};

/**
 * VariationAttributeSelect component.
 *
 * @param {*} props Component props.
 */
const VariationAttributeSelect = ( {
	attributeName,
	options = [],
	selected = '',
	onChange = () => {},
} ) => {
	return (
		<SelectControl
			className="wc-block-components-product-add-to-cart-variation-picker-select"
			label={ decodeEntities( attributeName ) }
			value={ selected || '' }
			options={ [ selectAnOption, ...options ] }
			onChange={ onChange }
		/>
	);
};

/**
 * VariationAttributes component.
 *
 * @param {*} props Component props.
 */
const VariationAttributes = ( { product } ) => {
	const [ selectedAttributes, setSelectedAttributes ] = useState( {} );
	const [ variationId, setVariationId ] = useState( 0 );
	const [ isLoading, setIsLoading ] = useState( true );
	const { attributes = [], variations = [] } = product;

	const attributesByName = attributes
		? keyBy(
				Object.values( attributes ).filter(
					( { has_variations: hasVariations } ) => hasVariations
				),
				'name'
		  )
		: {};

	const attributesToVariations = useMemo( () => {
		return variations ? getVariationAttributesMap( variations ) : [];
	}, [ variations ] );

	const filteredAttributeOptions = useMemo( () => {
		if ( ! attributesToVariations ) {
			return [];
		}
		const options = [];
		const hasSelectedAttributes =
			Object.values( selectedAttributes ).filter( Boolean ).length > 0;

		Object.keys( attributesByName ).forEach( ( attributeName ) => {
			const attribute = attributesByName[ attributeName ];
			const attributeTerms = attribute.terms;
			const validTermSlugs = hasSelectedAttributes
				? Object.keys( attributesToVariations )
						.filter( ( varId ) =>
							Object.keys( attributesByName )
								.filter( ( name ) => name !== attributeName )
								.every(
									( name ) =>
										selectedAttributes[ name ] === '' ||
										attributesToVariations[ varId ][
											name
										] === null ||
										attributesToVariations[ varId ][
											name
										] === selectedAttributes[ name ]
								)
						)
						.map(
							( varId ) =>
								attributesToVariations[ varId ][ attributeName ]
						)
				: [ null ];

			options[ attributeName ] = Object.values( attributeTerms )
				.map( ( { name, slug } ) => {
					if (
						validTermSlugs.includes( null ) ||
						validTermSlugs.includes( slug )
					) {
						return {
							value: slug,
							label: name,
						};
					}
					return null;
				} )
				.filter( Boolean );
		} );

		return options;
	}, [ attributesByName, attributesToVariations, selectedAttributes ] );

	// Update state when attributes are first added.
	useEffect( () => {
		if ( isLoading && attributes ) {
			setSelectedAttributes(
				attributes.reduce( ( acc, { name, terms } ) => {
					acc[ name ] = terms[ 0 ].slug;
					return acc;
				}, [] )
			);
			setIsLoading( false );
		}
	}, [ isLoading, selectedAttributes, attributes ] );

	// Select variation when selections change .
	useEffect( () => {
		const allAttributesSelected =
			Object.values( selectedAttributes ).filter(
				( selected ) => selected !== ''
			).length === Object.keys( attributesByName ).length;

		if ( ! allAttributesSelected ) {
			setVariationId( 0 );
			return;
		}

		const matchingVariationId = Object.keys(
			attributesToVariations
		).find( ( varId ) =>
			Object.keys( attributesByName ).every(
				( attributeName ) =>
					attributesToVariations[ varId ][ attributeName ] === null ||
					attributesToVariations[ varId ][ attributeName ] ===
						selectedAttributes[ attributeName ]
			)
		);

		setVariationId( matchingVariationId || 0 );
	}, [ selectedAttributes, attributesByName, attributesToVariations ] );

	if ( ! Object.keys( attributesByName ).length || isLoading ) {
		return null;
	}

	return (
		<div className="wc-block-components-product-add-to-cart-variation-picker">
			{ Object.keys( attributesByName ).map( ( name ) => (
				<VariationAttributeSelect
					key={ name }
					attributeName={ name }
					options={ filteredAttributeOptions[ name ] }
					selected={ selectedAttributes[ name ] }
					onChange={ ( selected ) => {
						setSelectedAttributes( {
							...selectedAttributes,
							[ name ]: selected,
						} );
					} }
				/>
			) ) }
			<p>Matched variation ID: { variationId }</p>
		</div>
	);
};

export default VariationAttributes;

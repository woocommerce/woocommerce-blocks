/**
 * External dependencies
 */
import { keyBy } from 'lodash';

/**
 * Key an array of attributes by name,
 *
 * @param {Object} attributes Attributes array.
 */
export const getAttributes = ( attributes ) => {
	return attributes
		? keyBy(
				Object.values( attributes ).filter(
					( { has_variations: hasVariations } ) => hasVariations
				),
				'name'
		  )
		: [];
};

/**
 * Format variations from the API into a map of just the attribute names and values.
 *
 * @param {Array} variations Variations array.
 */
export const getVariationAttributes = ( variations ) => {
	if ( ! variations ) {
		return {};
	}

	const attributesMap = {};

	variations.forEach( ( { id, attributes } ) => {
		attributesMap[ id ] = attributes.reduce( ( acc, { name, value } ) => {
			acc[ name ] = value;
			return acc;
		}, [] );
	} );

	return attributesMap;
};

/**
 * Given a list of terms, filter them and return valid options for the select boxes.
 *
 * @param {Object} attributeTerms List of attribute term objects.
 * @param {?Array} validAttributeTerms Valid values if selections have been made already.
 * @return {Array} Value/Label pairs of select box options.
 */
export const getValidSelectControlOptions = (
	attributeTerms,
	validAttributeTerms = null
) => {
	return Object.values( attributeTerms )
		.map( ( { name, slug } ) => {
			if (
				validAttributeTerms === null ||
				validAttributeTerms.includes( null ) ||
				validAttributeTerms.includes( slug )
			) {
				return {
					value: slug,
					label: name,
				};
			}
			return null;
		} )
		.filter( Boolean );
};

/**
 * Given a list of terms, filter them and return active options for the select boxes. This factors in
 * which options should be hidden due to current selections.
 *
 * @param {Object} attributes List of attribute names and terms.
 * @param {Object} variationAttributes Attributes for each variation keyed by variation ID.
 * @param {Object} selectedAttributes Attribute Name Value pairs of current selections by the user.
 * @return {Array} Select box options.
 */
export const getActiveSelectControlOptions = (
	attributes,
	variationAttributes,
	selectedAttributes
) => {
	const options = [];
	const attributeNames = Object.keys( attributes );
	const hasSelectedAttributes =
		Object.values( selectedAttributes ).filter( Boolean ).length > 0;

	attributeNames.forEach( ( attributeName ) => {
		const currentAttribute = attributes[ attributeName ];
		const attributeNamesExcludingCurrentAttribute = attributeNames.filter(
			( name ) => name !== attributeName
		);
		const matchingVariationIds = hasSelectedAttributes
			? getVariationsMatchingSelectedAttributes(
					selectedAttributes,
					variationAttributes,
					attributeNamesExcludingCurrentAttribute
			  )
			: null;
		const validAttributeTerms =
			matchingVariationIds !== null
				? matchingVariationIds.map(
						( varId ) =>
							variationAttributes[ varId ][ attributeName ]
				  )
				: null;
		options[ attributeName ] = getValidSelectControlOptions(
			currentAttribute.terms,
			validAttributeTerms
		);
	} );

	return options;
};

/**
 * Given a list of variations and a list of attribute values, return variations which match.
 *
 * Allows an attribute to be excluded by name. This is used to filter displayed options for
 * individual attribute selects.
 *
 * @param {Object} attributes List of attribute names and terms.
 * @param {Object} variationAttributes Attributes for each variation keyed by variation ID.
 * @param {Object} selectedAttributes Attribute Name Value pairs of current selections by the user.
 * @return {Array} List of matching variation IDs.
 */
export const getVariationsMatchingSelectedAttributes = (
	attributes,
	variationAttributes,
	selectedAttributes
) => {
	const attributeNames = Object.keys( attributes );

	return Object.keys( variationAttributes ).filter( ( variationId ) =>
		attributeNames.every( ( attributeName ) => {
			const selectedAttribute = selectedAttributes[ attributeName ] || '';
			const variationAttribute =
				variationAttributes[ variationId ][ attributeName ];

			// If there is no selected attribute, consider this a match.
			if ( selectedAttribute === '' ) {
				return true;
			}
			// If the variation attributes for this attribute are set to null, it matches all values.
			if ( variationAttribute === null ) {
				return true;
			}
			// Otherwise, only match if the selected values are the same.
			return variationAttribute === selectedAttribute;
		} )
	);
};

/**
 * Given a list of variations and a list of attribute values, returns the first matched variation ID.
 *
 * @param {Object} attributes List of attribute names and terms.
 * @param {Object} variationAttributes Attributes for each variation keyed by variation ID.
 * @param {Object} selectedAttributes Attribute Name Value pairs of current selections by the user.
 * @return {number} Variation ID.
 */
export const getVariationMatchingSelectedAttributes = (
	attributes,
	variationAttributes,
	selectedAttributes
) => {
	const matchingVariationIds = getVariationsMatchingSelectedAttributes(
		attributes,
		variationAttributes,
		selectedAttributes
	);
	return matchingVariationIds[ 0 ] || 0;
};

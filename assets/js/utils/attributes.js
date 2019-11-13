/**
 * External dependencies
 */
import { ATTRIBUTES } from '@woocommerce/block-settings';

/**
 * Format an attribute from the settings into an object with standardized keys.
 */
const attributeSettingToObject = ( attribute ) => {
	if ( ! attribute || ! attribute.attribute_name ) {
		return null;
	}
	return {
		id: parseInt( attribute.attribute_id, 10 ),
		name: attribute.attribute_name,
		taxonomy: 'pa_' + attribute.attribute_name,
		label: attribute.attribute_label,
	};
};

/**
 * Format all attribute settings into objects.
 */
const attributeObjects = ATTRIBUTES.reduce( ( acc, current ) => {
	const attributeObject = attributeSettingToObject( current );

	if ( attributeObject.id ) {
		acc.push( attributeObject );
	}

	return acc;
}, [] );

/**
 * Get attribute data by taxonomy.
 *
 * @param {number} attributeId The attribute ID.
 * @return {object} The attribute object or null.
 */
export const getAttributeFromID = ( attributeId ) => {
	if ( ! attributeId ) {
		return null;
	}
	return (
		attributeObjects.find( ( attribute ) => {
			return attribute.id === attributeId;
		} ) || null
	);
};

/**
 * Get attribute data by taxonomy.
 *
 * @param {number} taxonomy The attribute taxonomy name e.g. pa_color.
 * @return {object} The attribute object or null.
 */
export const getAttributeFromTaxonomy = ( taxonomy ) => {
	if ( ! taxonomy ) {
		return null;
	}
	return (
		attributeObjects.find( ( attribute ) => {
			return attribute.taxonomy === taxonomy;
		} ) || null
	);
};

/**
 * Get the taxonomy of an attribute by Attribute ID.
 *
 * @param {number} attributeId The attribute ID.
 * @return {string} The taxonomy name.
 */
export const getTaxonomyFromAttributeId = ( attributeId ) => {
	if ( ! attributeId ) {
		return null;
	}
	const attribute = getAttributeFromID( attributeId );
	return attribute ? attribute.taxonomy : null;
};

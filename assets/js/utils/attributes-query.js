/**
 * External dependencies
 */
import { sortBy, map } from 'lodash';

/**
 * Given a query object, removes an attribute term from the query filter if set.
 * @param {object} query Query object.
 * @param {object} attribute Attribute being filtered.
 * @param {object} attributeTerm Term being filtered

export const removeAttributeFilter = (
	query = [],
	attribute,
	attributeTerm
) => {
	const isFiltering = false;
};

export const addAttributeFilter = () => {}; */

/**
 * Given a query object, sets the query up to filter by a given attribute and attribute terms.
 * @param {object} query Current query object.
 * @param {function} setQuery Callback to update the current query object.
 * @param {object} attribute An attribute object.
 * @param {array} attributeTerms Array of term objects.
 * @param {string} operator Operator for the filter. Valid values: in, and.
 */
export const updateAttributeFilter = (
	query = [],
	setQuery = () => {},
	attribute,
	attributeTerms = [],
	operator = 'in'
) => {
	// Remove current attribute filter from query.
	const returnQuery = query.filter(
		( item ) => item.attribute !== attribute.taxonomy
	);

	// Add a new query for selected terms, if provided.
	if ( attributeTerms.length > 0 ) {
		const filterQuery = {
			attribute: attribute.taxonomy,
			operator,
			slug: map( attributeTerms, 'slug' ),
		};
		returnQuery.push( filterQuery );
	}

	setQuery( sortBy( returnQuery, 'attribute' ) );
};

/**
 * External dependencies
 */
import { addQueryArgs, removeQueryArgs } from '@wordpress/url';

/**
 * Internal dependencies
 */
import { getUrlParameter } from '../../utils/filters';

interface Param {
	attribute: string;
	operator: string;
	slug: Array< string >;
}

export const formatParams = (
	url: string,
	params: Array< Param > = [],
	blockOperator: 'or' | 'and'
) => {
	const paramObject: Record< string, string > = {};

	params.forEach( ( param ) => {
		const { attribute, slug } = param;

		// Custom filters are prefix with `pa_` so we need to remove this.
		const name = attribute.replace( 'pa_', '' );
		const values = slug.join( ',' );
		const queryType = `query_type_${ name }`;
		const type = blockOperator === 'or' ? 'or' : 'and';

		// The URL parameter requires the prefix filter_ with the attribute name.
		paramObject[ `filter_${ name }` ] = values;
		paramObject[ queryType ] = type;
	} );

	// Clean the URL before we add our new query parameters to it.
	const cleanUrl = removeQueryArgs( url, ...Object.keys( paramObject ) );

	return addQueryArgs( cleanUrl, paramObject );
};

export const areAllFiltersRemoved = ( {
	currentCheckedFilters,
	hasSetPhpFilterDefaults,
}: {
	currentCheckedFilters: Array< string >;
	hasSetPhpFilterDefaults: boolean;
} ) => hasSetPhpFilterDefaults && currentCheckedFilters.length === 0;

export const getActiveFilters = (
	isFilteringForPhpTemplateEnabled: boolean,
	attributeObject: Record< string, string > | undefined
) => {
	if ( isFilteringForPhpTemplateEnabled && attributeObject ) {
		const defaultAttributeParam = getUrlParameter(
			`filter_${ attributeObject.name }`
		);
		const defaultCheckedValue =
			typeof defaultAttributeParam === 'string'
				? defaultAttributeParam.split( ',' )
				: [];

		return defaultCheckedValue;
	}

	return [];
};

/**
 * External dependencies
 */
import { isString } from '@woocommerce/types';
import { getUrlParameter } from '@woocommerce/utils';

/**
 * Internal dependencies
 */
import metadata from './block.json';

export const getActiveFilters = ( queryParamKey = 'filter_rating' ) => {
	const params = getUrlParameter( queryParamKey );

	if ( ! params ) {
		return [];
	}

	const parsedParams = isString( params )
		? params.split( ',' )
		: ( params as string[] );

	return parsedParams;
};

export const parseAttributes = ( data: Record< string, unknown > ) => {
	return {
		heading: isString( data?.heading ) ? data.heading : '',
		headingLevel:
			( isString( data?.headingLevel ) &&
				parseInt( data.headingLevel, 10 ) ) ||
			metadata.attributes.headingLevel.default,
		showFilterButton: data?.showFilterButton === 'true',
		showCounts: data?.showCounts !== 'false',
		isPreview: false,
	};
};

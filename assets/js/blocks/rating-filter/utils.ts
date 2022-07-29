/**
 * External dependencies
 */
import { isString } from '@woocommerce/types';
import { getUrlParameter } from '@woocommerce/utils';

export const getActiveFilters = (
	filters: Record< string, string >,
	queryParamKey = 'rating_filter'
) => {
	const params = getUrlParameter( queryParamKey );

	if ( ! params ) {
		return [];
	}

	const parsedParams = isString( params )
		? params.split( ',' )
		: ( params as string[] );

	return Object.keys( filters ).filter( ( filter ) =>
		parsedParams.includes( filter )
	);
};

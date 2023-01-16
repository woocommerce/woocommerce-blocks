/**
 * External dependencies
 */
import { wpx } from '@woocommerce/base-interactivity/wpx';
import { navigate } from '@woocommerce/base-interactivity/router';

const getHrefWithFilters = ( { state } ) => {
	const { minPrice, maxPrice } = state.filters;
	const url = new URL( window.location.href );
	const { searchParams } = url;

	if ( minPrice > 0 ) {
		searchParams.set( 'min_price', minPrice );
	} else {
		searchParams.delete( 'min_price' );
	}

	if ( maxPrice < Infinity ) {
		searchParams.set( 'max_price', maxPrice );
	} else {
		searchParams.delete( 'max_price' );
	}

	return url.href;
};

const initialSearchParams = new URL( window.location.href ).searchParams;
const initialMinPrice = initialSearchParams.get( 'min_price' ) || '';
const initialMaxPrice = initialSearchParams.get( 'max_price' ) || '';

wpx( {
	state: {
		filters: {
			minPrice: parseFloat( initialMinPrice ) || 0,
			maxPrice: parseFloat( initialMaxPrice ) || Infinity,
		},
	},
	actions: {
		filters: {
			setMinPrice: ( { state, event } ) => {
				const value = parseFloat( event.target.value ) || 0;
				state.filters.minPrice = value;
				navigate( getHrefWithFilters( { state } ) );
			},
			setMaxPrice: ( { state, event } ) => {
				const value = parseFloat( event.target.value ) || Infinity;
				state.filters.maxPrice = value;
				navigate( getHrefWithFilters( { state } ) );
			},
		},
	},
} );

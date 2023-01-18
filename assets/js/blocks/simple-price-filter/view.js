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
			maxRange: 90, // TODO: get this value from SSR.
			isMinActive: true,
			isMaxActive: false,
		},
	},
	derived: {
		filters: {
			rangeStyle: ( { state } ) => {
				const { minPrice, maxPrice, maxRange } = state.filters;
				return {
					'--low': `${ ( 100 * minPrice ) / maxRange }%`,
					'--high': `${ ( 100 * maxPrice ) / maxRange }%`,
				};
			},
		},
	},
	actions: {
		filters: {
			setMinPrice: ( { state, event } ) => {
				const value = parseFloat( event.target.value ) || 0;
				state.filters.minPrice = value;
			},
			setMaxPrice: ( { state, event } ) => {
				const value =
					parseFloat( event.target.value ) || state.filters.maxRange;
				state.filters.maxPrice = value;
			},
			updateProducts: ( { state } ) => {
				navigate( getHrefWithFilters( { state } ) );
			},
			reset: ( { state } ) => {
				state.filters.minPrice = 0;
				state.filters.maxPrice = Infinity;
				navigate( getHrefWithFilters( { state } ) );
			},
			updateActiveHandle: ( { state, event } ) => {
				const { minPrice, maxPrice, maxRange } = state.filters;
				const { target, offsetX } = event;
				const xPos = offsetX / target.offsetWidth;
				const minPos = minPrice / maxRange;
				const maxPos = maxPrice / maxRange;

				state.filters.isMinActive =
					Math.abs( xPos - minPos ) < Math.abs( xPos - maxPos );

				state.filters.isMaxActive = ! state.filters.isMinActive;
			},
		},
	},
} );

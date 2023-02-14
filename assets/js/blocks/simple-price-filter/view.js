/**
 * External dependencies
 */
import { store } from '@woocommerce/interactivity/store';
import { navigate } from '@woocommerce/interactivity/router';

const getHrefWithFilters = ( { state } ) => {
	const { minPrice, maxPrice } = state.filters;
	const url = new URL( window.location.href );
	const { searchParams } = url;

	if ( minPrice > 0 ) {
		searchParams.set( 'min_price', minPrice );
	} else {
		searchParams.delete( 'min_price' );
	}

	if ( maxPrice < state.filters.maxRange ) {
		searchParams.set( 'max_price', maxPrice );
	} else {
		searchParams.delete( 'max_price' );
	}

	return url.href;
};

const initialSearchParams = new URL( window.location.href ).searchParams;

// TODO: get this values from SSR
const ssrMaxRange = 90;
const ssrMinPrice =
	parseFloat( initialSearchParams.get( 'min_price' ) || '' ) || 0;
const ssrMaxPrice =
	parseFloat( initialSearchParams.get( 'max_price' ) || '' ) || ssrMaxRange;

store( {
	state: {
		filters: {
			minPrice: ssrMinPrice,
			maxPrice: ssrMaxPrice,
			maxRange: ssrMaxRange,
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
				state.filters.maxPrice = state.filters.maxRange;
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

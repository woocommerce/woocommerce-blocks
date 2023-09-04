/**
 * External dependencies
 */
import { store, navigate } from '@woocommerce/interactivity';

/**
 * Internal dependencies
 */
import { InputActionProps, MouseActionProps, PriceFilterState } from './types';

const getHrefWithFilters = ( { state }: { state: PriceFilterState } ) => {
	const { minPrice, maxPrice } = state.filters;
	const url = new URL( window.location.href );
	const { searchParams } = url;

	if ( minPrice > 0 ) {
		searchParams.set( 'min_price', minPrice.toString() );
	} else {
		searchParams.delete( 'min_price' );
	}

	if ( maxPrice < state.filters.maxRange ) {
		searchParams.set( 'max_price', maxPrice.toString() );
	} else {
		searchParams.delete( 'max_price' );
	}

	searchParams.forEach( ( _, key ) => {
		if ( /query-[0-9]+-page/.test( key ) ) searchParams.delete( key );
	} );

	return url.href;
};

store( {
	state: {
		filters: {
			rangeStyle: ( { state }: { state: PriceFilterState } ) => {
				const { minPrice, maxPrice, maxRange } = state.filters;
				return [
					`--low: ${ ( 100 * minPrice ) / maxRange }%`,
					`--high: ${ ( 100 * maxPrice ) / maxRange }%`,
				].join( ';' );
			},
		},
	},
	actions: {
		filters: {
			setMinPrice: ( { state, event }: InputActionProps ) => {
				const value = parseFloat( event.target.value ) || 0;
				state.filters.minPrice = value;
			},
			setMaxPrice: ( { state, event }: InputActionProps ) => {
				const value =
					parseFloat( event.target.value ) || state.filters.maxRange;
				state.filters.maxPrice = value;
			},
			updateProducts: ( { state }: InputActionProps ) => {
				navigate( getHrefWithFilters( { state } ) );
			},
			reset: ( { state }: InputActionProps ) => {
				state.filters.minPrice = 0;
				state.filters.maxPrice = state.filters.maxRange;
				navigate( getHrefWithFilters( { state } ) );
			},
			updateActiveHandle: ( { state, event }: MouseActionProps ) => {
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

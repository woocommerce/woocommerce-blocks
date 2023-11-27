/**
 * External dependencies
 */
import { store, navigate } from '@woocommerce/interactivity';
import { formatPrice, getCurrency } from '@woocommerce/price-format';
import { HTMLElementEvent } from '@woocommerce/types';

/**
 * Internal dependencies
 */
import { ActionProps, StateProps } from './types';

const getHrefWithFilters = ( state: StateProps ) => {
	const { minPrice, maxPrice, maxRange } = state;
	const url = new URL( window.location.href );
	const { searchParams } = url;

	if ( minPrice > 0 ) {
		searchParams.set( 'min_price', minPrice.toString() );
	} else {
		searchParams.delete( 'min_price' );
	}

	if ( maxPrice < maxRange ) {
		searchParams.set( 'max_price', maxPrice.toString() );
	} else {
		searchParams.delete( 'max_price' );
	}

	searchParams.forEach( ( _, key ) => {
		if ( /query-[0-9]+-page/.test( key ) ) searchParams.delete( key );
	} );

	return url.href;
};

type State = {
	minPrice: number;
	maxPrice: number;
	minRange: number;
	maxRange: number;
	formattedMinPrice: string;
	formattedMaxPrice: string;
};

const { state } = store( 'woocommerce/collection-price-filter', {
	selectors: {
		rangeStyle: () => {
			const { minPrice, maxPrice, minRange, maxRange } = state;
			return [
				`--low: ${
					( 100 * ( minPrice - minRange ) ) / ( maxRange - minRange )
				}%`,
				`--high: ${
					( 100 * ( maxPrice - minRange ) ) / ( maxRange - minRange )
				}%`,
			].join( ';' );
		},
		formattedMinPrice: () => {
			const { minPrice } = state;
			return formatPrice( minPrice, getCurrency( { minorUnit: 0 } ) );
		},
		formattedMaxPrice: () => {
			const { maxPrice } = state;
			return formatPrice( maxPrice, getCurrency( { minorUnit: 0 } ) );
		},
	},
	actions: {
		setMinPrice: ( event: HTMLElementEvent< HTMLInputElement > ) => {
			const value = parseFloat( event.target.value );
			state.minPrice = Math.min(
				Number.isNaN( value ) ? state.minRange : value,
				state.maxRange - 1
			);
			state.maxPrice = Math.max( state.maxPrice, state.minPrice + 1 );
		},
		setMaxPrice: ( event: HTMLElementEvent< HTMLInputElement > ) => {
			const value = parseFloat( event.target.value );
			state.maxPrice = Math.max(
				Number.isNaN( value ) ? state.maxRange : value,
				state.minRange + 1
			);
			state.minPrice = Math.min( state.minPrice, state.maxPrice - 1 );
		},
		updateProductsWithPriceFilter: () => {
			navigate( getHrefWithFilters( { state } ) );
		},
		reset: () => {
			state.minPrice = 0;
			state.maxPrice = state.maxRange;
			navigate( getHrefWithFilters( state ) );
		},
	},
} );

/**
 * External dependencies
 */
import { store } from '@woocommerce/interactivity';

/**
 * Internal dependencies
 */
import { StateProps } from './types';

store( {
	state: {
		filters: {
			rangeStyle: ( { state }: StateProps ) => {
				const { minPrice, maxPrice, maxRange } = state.filters;
				return [
					`--low: ${ ( 100 * minPrice ) / maxRange }%`,
					`--high: ${ ( 100 * maxPrice ) / maxRange }%`,
				].join( ';' );
			},
		},
	},
} );

/**
 * External dependencies
 */
import { store } from '@woocommerce/interactivity';

type StateProps = {
	state: {
		filters: {
			minPrice: number;
			maxPrice: number;
			maxRange: number;
		};
	};
};

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

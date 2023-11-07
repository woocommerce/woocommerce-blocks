/**
 * External dependencies
 */
import {
	store as interactivityStore,
	navigate,
} from '@woocommerce/interactivity';

/**
 * Internal dependencies
 */
import { HTMLElementEvent } from '../../../../types';
import { DropdownContext } from '../../../../../../packages/interactivity-components/dropdown';

const getUrl = ( activeFilters: string ) => {
	const url = new URL( window.location.href );
	const { searchParams } = url;

	searchParams.set( 'filter_stock_status', activeFilters );

	return url.href;
};

type StockFilterState = {
	filters: {
		stockStatus: string;
		activeFilters: string;
		showDropdown: boolean;
	};
};

type ActionProps = {
	state: StockFilterState;
	event: HTMLElementEvent< HTMLInputElement >;
};

interactivityStore( {
	state: {
		filters: {
			stockStatus: '',
			// comma separated list of active filters
			activeFilters: '',
		},
	},
	// effects: {
	// 	filters: {
	// 		updateProductsFromSingleDropdownChoice: ( {
	// 			context,
	// 		}: {
	// 			context: DropdownContext;
	// 		} ) => {
	// 			if ( context.woocommerceDropdown.selectedItem.value ) {
	// 				navigate(
	// 					getUrl( context.woocommerceDropdown.selectedItem.value )
	// 				);
	// 			}
	// 		},
	// 	},
	// },
	actions: {
		filters: {
			navigate: ( { context }: { context: DropdownContext } ) => {
				navigate(
					getUrl( context.woocommerceDropdown.selectedItem.value )
				);
			},
			updateProducts: ( { state, event }: ActionProps ) => {
				const activeFilters = state.filters.activeFilters.split( ',' );

				// if checked and not already in activeFilters, add to activeFilters
				// if not checked and in activeFilters, remove from activeFilters.
				if ( event.target.checked ) {
					if ( ! activeFilters.includes( event.target.value ) ) {
						activeFilters.push( event.target.value );
					}
				} else {
					const index = activeFilters.indexOf( event.target.value );
					if ( index > -1 ) {
						activeFilters.splice( index, 1 );
					}
				}

				state.filters.activeFilters = activeFilters.join( ',' );

				navigate( getUrl( state.filters.activeFilters ) );
			},
		},
	},
} );

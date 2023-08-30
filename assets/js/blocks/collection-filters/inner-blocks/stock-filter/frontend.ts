/**
 * External dependencies
 */
import {
	store as interactivityStore,
	navigate,
} from '@woocommerce/interactivity';

const getUrl = ( { state } ) => {
	const { stockStatus } = state.filters;
	const url = new URL( window.location.href );
	const { searchParams } = url;

	searchParams.set( 'filter_stock_status', stockStatus );

	return url.href;
};

interactivityStore(
	// @ts-expect-error: Store function isn't typed.
	{
		actions: {
			filters: {
				updateProducts: ( { state, event } ) => {
					state.filters.stockStatus = event.target.value;
					navigate( getUrl( { state } ) );
				},
			},
		},
	}
);

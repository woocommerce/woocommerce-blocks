/**
 * External dependencies
 */
import { getContext, navigate, store } from '@woocommerce/interactivity';
import { CheckboxListContext } from '@woocommerce/interactivity-components/checkbox-list';

store( 'woocommerce/collection-rating-filter', {
	actions: {
		updateSelectedFilters: () => {
			const checkboxContext = getContext< CheckboxListContext >(
				'woocommerce/interactivity-checkbox-list'
			);

			const filters = checkboxContext.items
				.filter( ( item ) => {
					return item.checked;
				} )
				.map( ( item ) => {
					return item.value;
				} );

			const url = new URL( window.location.href );

			if ( filters.length ) {
				// add filters to url
				url.searchParams.set( 'rating_filter', filters.join( ',' ) );
			} else {
				// remove filters from url
				url.searchParams.delete( 'rating_filter' );
			}

			navigate( url );
		},
	},
} );

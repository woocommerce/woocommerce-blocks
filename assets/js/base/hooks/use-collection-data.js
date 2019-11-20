/**
 * External dependencies
 */
import { useState } from '@wordpress/element';
import { useQueryStateByContext, useCollection } from '@woocommerce/base-hooks';
import { useCollectionDataContext } from '@woocommerce/base-context/collection-data-context';
import { merge } from 'lodash';
import { useDebounce } from 'use-debounce';

export const useCollectionData = (
	collectionDataQuery = {},
	queryState,
	context
) => {
	const collectionDataContext = useCollectionDataContext();
	context = context || collectionDataContext;
	const [
		collectionDataQueryState,
		setCollectionDataQueryState,
	] = useQueryStateByContext( context );

	// Defer the select query so all collection-data query vars can be gathered.
	const [ shouldSelect, setShouldSelect ] = useState( false );
	const [ debouncedShouldSelect ] = useDebounce( shouldSelect, 50 );

	// Add collectionDataQuery to the state.
	setCollectionDataQueryState(
		context,
		merge( collectionDataQueryState, collectionDataQuery )
	);

	if ( ! shouldSelect ) {
		setShouldSelect( true );
	}

	return useCollection( {
		namespace: '/wc/store',
		resourceName: 'products/collection-data',
		query: {
			...queryState,
			page: undefined,
			per_page: undefined,
			orderby: undefined,
			order: undefined,
			...collectionDataQueryState,
		},
		shouldSelect: debouncedShouldSelect,
	} );
};

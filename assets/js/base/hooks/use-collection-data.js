/**
 * External dependencies
 */
import { useState, useEffect, useMemo } from '@wordpress/element';
import {
	useQueryStateByContext,
	useQueryStateByKey,
	useCollection,
} from '@woocommerce/base-hooks';
import { useCollectionDataContext } from '@woocommerce/base-context/collection-data-context';
import { useDebounce } from 'use-debounce';
import { find, sortBy } from 'lodash';

/**
 * Internal dependencies
 */
import { useShallowEqual } from './use-shallow-equal';

const buildCollectionDataQuery = ( collectionDataQueryState ) => {
	const query = collectionDataQueryState;

	if ( collectionDataQueryState.calculate_attribute_counts ) {
		query.calculate_attribute_counts = sortBy(
			collectionDataQueryState.calculate_attribute_counts.map(
				( { taxonomy, queryType } ) => {
					return {
						taxonomy,
						query_type: queryType,
					};
				}
			),
			[ 'taxonomy', 'query_type' ]
		);
	}

	return query;
};

export const useCollectionData = ( {
	queryAttribute,
	queryPrices,
	queryState,
	context,
} ) => {
	const collectionDataContext = useCollectionDataContext();
	context = context || collectionDataContext;

	const [ collectionDataQueryState ] = useQueryStateByContext( context );
	const [
		calculateAttributesQueryState,
		setCalculateAttributesQueryState,
	] = useQueryStateByKey( 'calculate_attribute_counts', [], context );
	const [
		calculatePriceRangeQueryState,
		setCalculatePriceRangeQueryState,
	] = useQueryStateByKey( 'calculate_price_range', false, context );

	const currentQueryAttribute = useShallowEqual( queryAttribute || {} );
	const currentQueryPrices = useShallowEqual( queryPrices );

	useEffect( () => {
		if ( typeof currentQueryAttribute === 'object' && Object.keys( currentQueryAttribute ).length ) {
			const foundAttribute = find(
				calculateAttributesQueryState,
				( attribute ) => {
					return (
						attribute.taxonomy === currentQueryAttribute.taxonomy
					);
				}
			);

			if ( ! foundAttribute ) {
				const setState = calculateAttributesQueryState;
				setState.push( currentQueryAttribute );
				setCalculateAttributesQueryState( setState );
			}
		}
	}, [ currentQueryAttribute ] );

	useEffect( () => {
		if (
			calculatePriceRangeQueryState !== currentQueryPrices &&
			currentQueryPrices !== undefined
		) {
			setCalculatePriceRangeQueryState( currentQueryPrices );
		}
	}, [ currentQueryPrices ] );

	// Defer the select query so all collection-data query vars can be gathered.
	const [ shouldSelect, setShouldSelect ] = useState( false );
	const [ debouncedShouldSelect ] = useDebounce( shouldSelect, 200 );

	if ( ! shouldSelect ) {
		setShouldSelect( true );
	}

	const collectionDataQueryVars = useMemo( () => {
		return buildCollectionDataQuery( collectionDataQueryState );
	}, [ collectionDataQueryState ] );

	return useCollection( {
		namespace: '/wc/store',
		resourceName: 'products/collection-data',
		query: {
			...queryState,
			page: undefined,
			per_page: undefined,
			orderby: undefined,
			order: undefined,
			...collectionDataQueryVars,
		},
		shouldSelect: debouncedShouldSelect,
	} );
};

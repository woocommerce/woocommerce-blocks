/**
 * External dependencies
 */
import { useState, useEffect, useMemo } from '@wordpress/element';
import { useQueryStateByContext, useCollection } from '@woocommerce/base-hooks';
import { useCollectionDataContext } from '@woocommerce/base-context/collection-data-context';
import { useDebounce } from 'use-debounce';
import { find, sortBy } from 'lodash';

/**
 * Internal dependencies
 */
import { useShallowEqual } from './use-shallow-equal';

const buildCollectionDataQuery = ( collectionDataQueryState ) => {
	const query = {};

	if ( collectionDataQueryState.priceRange ) {
		query.calculate_price_range = true;
	}

	if ( collectionDataQueryState.attributes ) {
		query.calculate_attribute_counts = sortBy(
			collectionDataQueryState.attributes.map(
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

export const useCollectionData = (
	collectionDataQuery = [],
	queryState,
	context
) => {
	const collectionDataContext = useCollectionDataContext();
	context = context || collectionDataContext;

	const [
		collectionDataQueryState,
		setCollectionDataQueryState,
	] = useQueryStateByContext( context );

	const currentCollectionDataQuery = useShallowEqual( collectionDataQuery );

	useEffect( () => {
		const stateAttributes = collectionDataQueryState.attributes || [];

		if ( currentCollectionDataQuery.attribute ) {
			const foundAttribute = find( stateAttributes, ( attribute ) => {
				return (
					attribute.taxonomy ===
					currentCollectionDataQuery.attribute.taxonomy
				);
			} );

			if ( ! foundAttribute ) {
				stateAttributes.push( currentCollectionDataQuery.attribute );
			}
		}

		const mergedQueryState = {
			...collectionDataQueryState,
			...currentCollectionDataQuery,
			attribute: undefined,
			attributes: stateAttributes,
		};

		setCollectionDataQueryState( context, mergedQueryState );

		console.log( 'used effect' ); // eslint-disable-line
	}, [ currentCollectionDataQuery ] );

	// Defer the select query so all collection-data query vars can be gathered.
	const [ shouldSelect, setShouldSelect ] = useState( false );
	const [ debouncedShouldSelect ] = useDebounce( shouldSelect, 200 );

	if ( ! shouldSelect ) {
		setShouldSelect( true );
	}

	const collectionDataQueryVars = useMemo( () => {
		return buildCollectionDataQuery( collectionDataQueryState );
	}, [ collectionDataQueryState, buildCollectionDataQuery ] );

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

/**
 * External dependencies
 */
import { useCollection, useUrlQueryString } from '@woocommerce/base-hooks';
import { useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { renderRemovableListItem } from './utils';
import {
	removeAttributeFilterBySlug,
	getAttributeResourceName,
} from '../../utils/attributes-query';

/**
 * Component that renders active attribute (terms) filters.
 */
const ActiveAttributeFilters = ( {
	attributeObject = {},
	productAttributes,
	setProductAttributes,
} ) => {
	const { results, isLoading } = useCollection( {
		namespace: '/wc/store',
		resourceName: 'products/attributes/terms',
		resourceValues: [ attributeObject.id ],
	} );
	const [ urlState, updateUrlHistory, deleteUrlHistory ] = useUrlQueryString(
		{
			[ getAttributeResourceName( attributeObject.id ) ]: [],
		}
	);

	const attributeLabel = attributeObject.label;
	//if slug in urlState, remove it.
	const urlAttributeState =
		urlState[ getAttributeResourceName( attributeObject.id ) ];

	const currentAttribute = productAttributes.find(
		( { attribute } ) => attribute === attributeObject.taxonomy
	);

	const currentSlugs = currentAttribute.slug;

	const removableListItems = useMemo( () => {
		if ( isLoading || ! currentSlugs || currentSlugs.length === 0 ) {
			return null;
		}
		return currentSlugs.map( ( slug ) => {
			const termObject = results.find( ( term ) => {
				return term.slug === slug;
			} );
			return (
				termObject &&
				renderRemovableListItem(
					attributeLabel,
					termObject.name || slug,
					() => {
						removeAttributeFilterBySlug(
							productAttributes,
							setProductAttributes,
							attributeObject,
							slug
						);
						if (
							urlAttributeState.length > 1 &&
							urlAttributeState.includes( slug )
						) {
							updateUrlHistory( {
								[ getAttributeResourceName(
									attributeObject.id
								) ]: urlAttributeState
									.filter( ( term ) => term !== slug )
									.sort(),
							} );
						} else if ( urlAttributeState.length <= 1 ) {
							deleteUrlHistory( [
								getAttributeResourceName( attributeObject.id ),
							] );
						}
					}
				)
			);
		} );
	}, [
		isLoading,
		currentSlugs,
		productAttributes,
		attributeObject,
		urlAttributeState,
		updateUrlHistory,
	] );
	return removableListItems || null;
};

export default ActiveAttributeFilters;

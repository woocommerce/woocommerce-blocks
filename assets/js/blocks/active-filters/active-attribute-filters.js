/**
 * External dependencies
 */
import {
	useCollection,
	useQueryStateByKey,
	useUrlQueryString,
} from '@woocommerce/base-hooks';

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
const ActiveAttributeFilters = ( { attributeObject = {}, slugs = [] } ) => {
	const { results, isLoading } = useCollection( {
		namespace: '/wc/store',
		resourceName: 'products/attributes/terms',
		resourceValues: [ attributeObject.id ],
	} );

	const [ productAttributes, setProductAttributes ] = useQueryStateByKey(
		'attributes',
		[]
	);
	const [ urlState, updateUrlHistory ] = useUrlQueryString( {
		[ getAttributeResourceName( attributeObject.id ) ]: [],
	} );

	if ( isLoading ) {
		return null;
	}

	const attributeLabel = attributeObject.label;

	return slugs.map( ( slug ) => {
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
					//if slug in urlState, remove it.
					const urlAttributeState =
						urlState[
							getAttributeResourceName( attributeObject.id )
						];
					if (
						urlAttributeState.length > 0 &&
						urlAttributeState.includes( slug )
					) {
						updateUrlHistory( {
							[ getAttributeResourceName(
								attributeObject.id
							) ]: urlAttributeState
								.filter( ( term ) => term !== slug )
								.sort(),
						} );
					}
				}
			)
		);
	} );
};

export default ActiveAttributeFilters;

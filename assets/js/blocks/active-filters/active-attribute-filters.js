/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useCollection, useQueryStateByKey } from '@woocommerce/base-hooks';
import { decodeEntities } from '@wordpress/html-entities';
import { speak } from '@wordpress/a11y';

/**
 * Internal dependencies
 */
import { renderRemovableListItem } from './utils';
import { removeAttributeFilterBySlug } from '../../utils/attributes-query';

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

	if ( isLoading ) {
		return null;
	}

	const attributeLabel = attributeObject.label;

	return slugs.map( ( slug ) => {
		const termObject = results.find( ( term ) => {
			return term.slug === slug;
		} );
		const name = decodeEntities( termObject.name || slug );

		return (
			termObject &&
			renderRemovableListItem( attributeLabel, name, () => {
				removeAttributeFilterBySlug(
					productAttributes,
					setProductAttributes,
					attributeObject,
					slug
				);
				speak(
					sprintf(
						// translators: %s is a filter value (large, medium, blue, yellow...)
						__(
							'%s filter removed',
							'woo-gutenberg-products-block'
						),
						name
					)
				);
			} )
		);
	} );
};

export default ActiveAttributeFilters;

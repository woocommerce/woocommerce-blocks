/**
 * External dependencies
 */
import { useCollection, useQueryStateByKey } from '@woocommerce/base-hooks';
import { decodeEntities } from '@wordpress/html-entities';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { renderRemovableListItem } from './utils';
import { removeAttributeFilterBySlug } from '../../utils/attributes-query';

/**
 * Component that renders active attribute (terms) filters.
 */
const ActiveAttributeFilters = ( {
	attributeObject = {},
	slugs = [],
	operator = 'in',
} ) => {
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

	return slugs.map( ( slug, index ) => {
		const termObject = results.find( ( term ) => {
			return term.slug === slug;
		} );

		let name = decodeEntities( termObject.name || slug );

		if ( index > 0 ) {
			name =
				operator === 'in'
					? sprintf(
							// Translators: %s attribute name.
							__( 'or %s', 'woo-gutenberg-products-block' ),
							name
					  )
					: sprintf(
							// Translators: %s attribute name.
							__( 'and %s', 'woo-gutenberg-products-block' ),
							name
					  );
		}

		return (
			termObject &&
			renderRemovableListItem( {
				type: attributeLabel,
				name,
				removeCallback: () => {
					removeAttributeFilterBySlug(
						productAttributes,
						setProductAttributes,
						attributeObject,
						slug
					);
				},
				showLabel: index === 0,
			} )
		);
	} );
};

export default ActiveAttributeFilters;

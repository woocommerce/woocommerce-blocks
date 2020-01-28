/**
 * External dependencies
 */
import { useCollection, useQueryStateByKey } from '@woocommerce/base-hooks';
import { decodeEntities } from '@wordpress/html-entities';
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';

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

		if ( index > 0 && operator === 'and' ) {
			name = (
				<Fragment>
					<span className="wc-block-active-filters-list-item__operator">
						{ __( 'and', 'woo-gutenberg-products-block' ) }
					</span>
					&nbsp;
					{ name }
				</Fragment>
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

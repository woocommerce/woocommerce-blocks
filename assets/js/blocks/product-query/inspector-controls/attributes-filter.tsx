/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	ExternalLink,
	FormTokenField,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import {
	AttributeMetadata,
	AttributeWithTerms,
	ProductQueryBlock,
} from '../types';
import useProductAttributes from '../useProductAttributes';
import { setQueryAttribute } from '../utils';
import ProductAttributeTermControl from '@woocommerce/editor-components/product-attribute-term-control';
import { EDIT_ATTRIBUTES_URL } from '../constants';

function getAttributeMetadataFromToken(
	token: string,
	productsAttributes: AttributeWithTerms[]
) {
	const [ attributeLabel, termName ] = token.split( ': ' );
	const taxonomy = productsAttributes.find(
		( attribute ) => attribute.attribute_label === attributeLabel
	);

	if ( ! taxonomy )
		throw new Error( 'Product Query Filter: Invalid attribute label' );

	const term = taxonomy.terms.find(
		( currentTerm ) => currentTerm.name === termName
	);

	if ( ! term ) throw new Error( 'Product Query Filter: Invalid term name' );

	return {
		taxonomy: `pa_${ taxonomy.attribute_name }`,
		termId: term.id,
	};
}

function getAttributeFromMetadata(
	metadata: AttributeMetadata,
	productsAttributes: AttributeWithTerms[]
) {
	const taxonomy = productsAttributes.find(
		( attribute ) =>
			attribute.attribute_name === metadata.taxonomy.slice( 3 )
	);

	return {
		taxonomy,
		term: taxonomy?.terms.find( ( term ) => term.id === metadata.termId ),
	};
}

function getInputValueFromQueryParam(
	queryParam: AttributeMetadata[] | undefined,
	productAttributes: AttributeWithTerms[]
): FormTokenField.Value[] {
	return (
		queryParam?.map( ( metadata ) => {
			const { taxonomy, term } = getAttributeFromMetadata(
				metadata,
				productAttributes
			);

			return ! taxonomy || ! term
				? {
						title: __(
							'Saved taxonomy was perhaps deleted or the slug was changed.',
							'woo-gutenberg-products-block'
						),
						value: __(
							`Error with saved taxonomy`,
							'woo-gutenberg-products-block'
						),
						status: 'error',
				  }
				: `${ taxonomy.attribute_label }: ${ term.name }`;
		} ) || []
	);
}

export const AttributesFilter = ( props: ProductQueryBlock ) => {
	const { query } = props.attributes;
	const [ selected, setSelected ] = useState< { id: number }[] >( [] );

	useEffect( () => {
		if ( query.__woocommerceAttributes?.length ) {
			setSelected(
				query.__woocommerceAttributes.map( ( { termId: id } ) => ( {
					id,
				} ) )
			);
		}
	}, [ query.__woocommerceAttributes ] );

	return (
		<ToolsPanelItem
			label={ __( 'Product Attributes', 'woo-gutenberg-products-block' ) }
			hasValue={ () => query.__woocommerceAttributes?.length }
		>
			<ProductAttributeTermControl
				selected={ selected }
				onChange={ ( value ) => {
					const __woocommerceAttributes = value.map(
						( { id, attr_slug } ) => ( {
							termId: id,
							taxonomy: attr_slug,
						} )
					);

					setQueryAttribute( props, {
						__woocommerceAttributes,
					} );
				} }
				operator={ 'any' }
				isCompact={ true }
			/>
			<ExternalLink
				className="woocommerce-product-query-panel__external-link"
				href={ EDIT_ATTRIBUTES_URL }
			>
				{ __( 'Manage attributes', 'woo-gutenberg-products-block' ) }
			</ExternalLink>
		</ToolsPanelItem>
	);
};

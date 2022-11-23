/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	FormTokenField,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { AttributeWithTerms, ProductQueryBlock } from '../types';
import useProductAttributes from '../useProductAttributes';
import { setQueryAttribute } from '../utils';

function getAttributeMetadataFromToken(
	token: string,
	productAttributes: AttributeWithTerms[]
) {
	const [ attributeLabel, termName ] = token.split( ': ' );
	const taxonomy = productAttributes.find(
		( attribute ) => attribute.attribute_label === attributeLabel
	);

	if ( ! taxonomy )
		throw new Error( 'Product Query Filter: Invalid attribute label' );

	const term = taxonomy.terms.find(
		( currentTerm ) => currentTerm.name === termName
	);

	if ( ! term ) throw new Error( 'Product Query Filter: Invalid term name' );

	return {
		taxonomy,
		term,
	};
}

export const AttributesFilter = ( props: ProductQueryBlock ) => {
	const { query } = props.attributes;
	const { isLoadingAttributes, productsAttributes } = useProductAttributes(
		! query.__woocommerceAttributes?.length
	);

	const attributesSuggestions = productsAttributes.reduce( ( acc, curr ) => {
		const namespacedTerms = curr.terms.map(
			( term ) => `${ curr.attribute_label }: ${ term.name }`
		);

		return [ ...acc, ...namespacedTerms ];
	}, [] as string[] );

	return (
		<ToolsPanelItem
			label={ __( 'Product Attributes', 'woo-gutenberg-products-block' ) }
			hasValue={ () => query.__woocommerceStockStatus }
		>
			<FormTokenField
				disabled={ isLoadingAttributes }
				label={ __(
					'Product Attributes',
					'woo-gutenberg-products-block'
				) }
				onChange={ ( attributes ) => {
					let __woocommerceAttributes;

					try {
						__woocommerceAttributes = attributes.map(
							( attribute ) => {
								attribute =
									typeof attribute === 'string'
										? attribute
										: attribute.value;

								return getAttributeMetadataFromToken(
									attribute,
									productsAttributes
								);
							}
						);

						setQueryAttribute( props, {
							__woocommerceAttributes,
						} );
					} catch ( e ) {
						// Show error here
					}
				} }
				suggestions={ attributesSuggestions }
				validateInput={ ( value: string ) =>
					attributesSuggestions.includes( value )
				}
				value={
					isLoadingAttributes
						? [ __( 'Loading…', 'woo-gutenberg-products-block' ) ]
						: query?.__woocommerceAttributes?.map(
								( { taxonomy, term } ) =>
									`${ taxonomy.attribute_label }: ${ term.name }`
						  ) || []
				}
				__experimentalExpandOnFocus={ true }
			/>
		</ToolsPanelItem>
	);
};

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
import { ProductQueryBlock } from '../types';
import useProductAttributes from '../useProductAttributes';
import { setQueryAttribute } from '../utils';

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
					setQueryAttribute( props, {
						__woocommerceAttributes: attributes,
					} );
				} }
				suggestions={ attributesSuggestions }
				validateInput={ ( value: string ) =>
					attributesSuggestions.includes( value )
				}
				value={
					isLoadingAttributes
						? [ __( 'Loading…', 'woo-gutenberg-products-block' ) ]
						: query?.__woocommerceAttributes || []
				}
				__experimentalExpandOnFocus={ true }
			/>
		</ToolsPanelItem>
	);
};

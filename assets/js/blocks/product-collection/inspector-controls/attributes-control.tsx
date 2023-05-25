/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import ProductAttributeTermControl from '@woocommerce/editor-components/product-attribute-term-control';
import { AttributeMetadata } from '@woocommerce/types';
import { SearchListItem } from '@woocommerce/editor-components/search-list-control/types';
import {
	ExternalLink,
	// @ts-expect-error Using experimental features
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { ProductCollectionQuery } from '../types';

const EDIT_ATTRIBUTES_URL =
	'/wp-admin/edit.php?post_type=product&page=product_attributes';

interface Props {
	woocommerceAttributes?: AttributeMetadata[];
	setQueryAttribute: ( value: Partial< ProductCollectionQuery > ) => void;
}

const AttributesControl = ( {
	woocommerceAttributes,
	setQueryAttribute,
}: Props ) => {
	const [ selected, setSelected ] = useState< { id: number }[] >( [] );

	useEffect( () => {
		if ( woocommerceAttributes ) {
			setSelected(
				woocommerceAttributes.map( ( { termId: id } ) => ( {
					id,
				} ) )
			);
		}
	}, [ woocommerceAttributes ] );

	return (
		<ToolsPanelItem
			label={ __( 'Product Attributes', 'woo-gutenberg-products-block' ) }
			hasValue={ () => woocommerceAttributes?.length }
		>
			<ProductAttributeTermControl
				messages={ {
					search: __( 'Attributes', 'woo-gutenberg-products-block' ),
				} }
				selected={ selected }
				onChange={ ( searchListItems: SearchListItem[] ) => {
					const newValue = searchListItems.map(
						( { id, value } ) => ( {
							termId: id as number,
							taxonomy: value as string,
						} )
					);

					setQueryAttribute( {
						woocommerceAttributes: newValue,
					} );
				} }
				operator={ 'any' }
				isCompact={ true }
				type={ 'token' }
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

export default AttributesControl;

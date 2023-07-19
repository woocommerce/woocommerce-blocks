/**
 * External dependencies
 */
import { getProducts } from '@woocommerce/editor-components/utils';
import { ProductResponseItem } from '@woocommerce/types';
import { useState, useEffect, useCallback, useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
	FormTokenField,
	// @ts-expect-error Using experimental features
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { QueryControlProps } from '../types';

/**
 * Returns:
 * - productsMap: Map of products by id and name.
 * - productsList: List of products retrieved.
 */
function useProducts() {
	// Creating a map for fast lookup of products by id or name.
	const [ productsMap, setProductsMap ] = useState<
		Map< number | string, ProductResponseItem >
	>( new Map() );

	// List of products retrieved
	const [ productsList, setProductsList ] = useState< ProductResponseItem[] >(
		[]
	);

	useEffect( () => {
		getProducts( { selected: [] } ).then( ( results ) => {
			const newProductsMap = new Map();
			( results as ProductResponseItem[] ).forEach( ( product ) => {
				newProductsMap.set( product.id, product );
				newProductsMap.set( product.name, product );
			} );

			setProductsList( results as ProductResponseItem[] );
			setProductsMap( newProductsMap );
		} );
	}, [] );

	return { productsMap, productsList };
}

const HandPickedProductsControl = ( {
	query,
	setQueryAttribute,
}: QueryControlProps ) => {
	const selectedProductIds = query.woocommerceHandPickedProducts;
	const { productsMap, productsList } = useProducts();

	const onTokenChange = useCallback(
		( values: string[] ) => {
			// Map the tokens to product ids.
			const newHandPickedProductsSet = values.reduce(
				( acc, nameOrId ) => {
					const product =
						productsMap.get( nameOrId ) ||
						productsMap.get( Number( nameOrId ) );
					if ( product ) acc.add( String( product.id ) );
					return acc;
				},
				new Set< string >()
			);

			setQueryAttribute( {
				woocommerceHandPickedProducts: Array.from(
					newHandPickedProductsSet
				),
			} );
		},
		[ setQueryAttribute, productsMap ]
	);

	const suggestions = useMemo( () => {
		return (
			productsList
				// Filter out products that are already selected.
				.filter(
					( product ) =>
						! selectedProductIds?.includes( String( product.id ) )
				)
				.map( ( product ) => product.name )
		);
	}, [ productsList, selectedProductIds ] );

	const transformTokenIntoProductName = ( token: string ) => {
		const parsedToken = Number( token );

		if ( Number.isNaN( parsedToken ) ) {
			return token;
		}

		const product = productsMap.get( parsedToken );

		return product?.name || '';
	};

	return (
		<ToolsPanelItem
			label={ __(
				'Hand-picked Products',
				'woo-gutenberg-products-block'
			) }
			hasValue={ () => !! selectedProductIds?.length }
			onDeselect={ () => {
				setQueryAttribute( {
					woocommerceHandPickedProducts: [],
				} );
			} }
		>
			<FormTokenField
				disabled={ ! productsMap.size }
				displayTransform={ transformTokenIntoProductName }
				label={ __(
					'Pick some products',
					'woo-gutenberg-products-block'
				) }
				onChange={ onTokenChange }
				suggestions={ suggestions }
				// @ts-expect-error Using experimental features
				__experimentalValidateInput={ ( value: string ) =>
					productsMap.has( value )
				}
				value={
					! productsMap.size
						? [ __( 'Loading…', 'woo-gutenberg-products-block' ) ]
						: selectedProductIds || []
				}
				__experimentalExpandOnFocus={ true }
			/>
		</ToolsPanelItem>
	);
};

export default HandPickedProductsControl;

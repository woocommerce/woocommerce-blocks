/**
 * External dependencies
 */
import { ProductResponseItem } from '@woocommerce/type-defs/product-response';

/**
 * Internal dependencies
 */
import CartCrossSellsProduct from './cart-cross-sells-product';

const placeholderRows = [ ...Array( 3 ) ].map( ( _x, i ) => (
	<CartCrossSellsProduct crossSellsProduct={ {} } key={ i } />
) );

interface CrossSellsProductListProps {
	crossSellsProducts: ProductResponseItem[];
	isLoading: boolean;
	className?: string | undefined;
	columns: number;
}

const CartCrossSellsProductList = ( {
	crossSellsProducts,
	isLoading = false,
	columns,
}: CrossSellsProductListProps ): JSX.Element => {
	const products = isLoading
		? placeholderRows
		: crossSellsProducts.map( ( crossSellsProduct, i ) => {
				if ( i >= columns ) return null;

				return (
					<CartCrossSellsProduct
						crossSellsProduct={ crossSellsProduct }
						isLoading={ isLoading }
						key={ crossSellsProduct.id }
					/>
				);
		  } );

	return <div>{ products }</div>;
};

export default CartCrossSellsProductList;

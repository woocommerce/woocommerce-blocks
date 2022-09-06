/**
 * External dependencies
 */
import { ProductResponseItem } from '@woocommerce/type-defs/product-response';

/**
 * Internal dependencies
 */
import CartCrossSellsProduct from './cart-cross-sells-product';

interface CrossSellsProductListProps {
	crossSellsProducts: ProductResponseItem[];
	className?: string | undefined;
	columns: number;
}

const CartCrossSellsProductList = ( {
	crossSellsProducts,
	columns,
}: CrossSellsProductListProps ): JSX.Element => {
	const products = crossSellsProducts.map( ( crossSellsProduct, i ) => {
		if ( i >= columns ) return null;

		return (
			<CartCrossSellsProduct
				crossSellsProduct={ crossSellsProduct }
				key={ crossSellsProduct.id }
			/>
		);
	} );

	return <div>{ products }</div>;
};

export default CartCrossSellsProductList;

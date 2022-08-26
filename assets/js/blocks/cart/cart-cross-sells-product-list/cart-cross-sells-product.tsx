/**
 * External dependencies
 */
import {
	InnerBlockLayoutContextProvider,
	ProductDataContextProvider,
} from '@woocommerce/shared-context';
import { ProductResponseItem } from '@woocommerce/type-defs/product-response';

/**
 * Internal dependencies
 */
import { Block as ProductImage } from '../../../atomic/blocks/product-elements/image/block';
import { Block as ProductName } from '../../../atomic/blocks/product-elements/title/block';
import { Block as ProductRating } from '../../../atomic/blocks/product-elements/rating/block';
import { Block as ProductSaleBadge } from '../../../atomic/blocks/product-elements/sale-badge/block';
import { Block as ProductPrice } from '../../../atomic/blocks/product-elements/price/block';
import { Block as ProductButton } from '../../../atomic/blocks/product-elements/button/block';
import AddToCartButton from '../../../atomic/blocks/product-elements/add-to-cart/block';

interface CrossSellsProductProps {
	crossSellsProduct: ProductResponseItem;
	isLoading: boolean;
}

const CartCrossSellsProduct = ( {
	crossSellsProduct,
	isLoading,
}: CrossSellsProductProps ): JSX.Element => {
	return (
		<div className="cross-sells-product">
			<InnerBlockLayoutContextProvider
				parentName={ 'woocommerce/cart-cross-sells-block' }
				parentClassName={ 'wp-block-cart-cross-sells-product' }
			>
				<ProductDataContextProvider
					product={ crossSellsProduct }
					isLoading={ isLoading }
				>
					<div>
						<ProductImage />
						<ProductName />
						<ProductRating />
						<ProductSaleBadge />
						<ProductPrice />
					</div>
					{ crossSellsProduct.is_in_stock ? (
						<AddToCartButton />
					) : (
						<ProductButton />
					) }
				</ProductDataContextProvider>
			</InnerBlockLayoutContextProvider>
		</div>
	);
};

export default CartCrossSellsProduct;

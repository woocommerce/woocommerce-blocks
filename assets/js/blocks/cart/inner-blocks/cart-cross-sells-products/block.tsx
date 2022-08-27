/**
 * External dependencies
 */
import { useStoreCart } from '@woocommerce/base-context/hooks';

/**
 * Internal dependencies
 */
import CartCrossSellsProductList from '../../cart-cross-sells-product-list';
import metadata from './block.json';

interface BlockProps {
	className?: string | undefined;
	columns: number;
}

const Block = ( { className, columns }: BlockProps ): JSX.Element => {
	const { crossSellsProducts, cartIsLoading } = useStoreCart();

	if ( typeof columns === 'undefined' ) {
		columns = metadata.attributes.columns.default;
	}

	return (
		<CartCrossSellsProductList
			className={ className }
			columns={ columns }
			crossSellsProducts={ crossSellsProducts }
			isLoading={ cartIsLoading }
		/>
	);
};

export default Block;

/**
 * External dependencies
 */
import { ProductPrice } from '@woocommerce/atomic-components';
import { useProductDataContextContext } from '@woocommerce/shared-context';

const Edit = () => {
	const { product } = useProductDataContextContext();

	return <ProductPrice product={ product } />;
};

export default Edit;

/**
 * External dependencies
 */
import { ProductSummary } from '@woocommerce/atomic-components';
import { useProductDataContextContext } from '@woocommerce/shared-context';

const Edit = () => {
	const { product } = useProductDataContextContext();

	return <ProductSummary product={ product } />;
};

export default Edit;

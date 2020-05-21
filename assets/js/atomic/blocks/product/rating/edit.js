/**
 * External dependencies
 */
import { ProductRating } from '@woocommerce/atomic-components';
import { useProductDataContextContext } from '@woocommerce/shared-context';

const Edit = () => {
	const { product } = useProductDataContextContext();

	return <ProductRating product={ product } />;
};

export default Edit;

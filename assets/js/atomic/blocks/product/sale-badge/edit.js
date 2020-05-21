/**
 * External dependencies
 */
import { ProductSaleBadge } from '@woocommerce/atomic-components';
import { useProductDataContextContext } from '@woocommerce/shared-context';

const Edit = ( { attributes } ) => {
	const { product } = useProductDataContextContext();
	const { align } = attributes;

	return <ProductSaleBadge product={ product } align={ align } />;
};

export default Edit;

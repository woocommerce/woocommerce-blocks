/**
 * External dependencies
 */
import { ProductButton } from '@woocommerce/atomic-components';
import { useProductDataContextContext } from '@woocommerce/shared-context';
import { Disabled } from '@wordpress/components';

const Edit = () => {
	const { product } = useProductDataContextContext();

	return (
		<Disabled>
			<ProductButton product={ product } />
		</Disabled>
	);
};

export default Edit;

/**
 * External dependencies
 */
import { ProductSaleBadge } from '@woocommerce/atomic-components';

const Edit = ( { attributes } ) => {
	const { align } = attributes;

	return <ProductSaleBadge align={ align } />;
};

export default Edit;

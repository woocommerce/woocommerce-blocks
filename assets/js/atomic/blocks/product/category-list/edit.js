/**
 * External dependencies
 */
import { Disabled } from '@wordpress/components';
import EditProductLink from '@woocommerce/block-components/edit-product-link';
import { useProductDataContext } from '@woocommerce/shared-context';

/**
 * Internal dependencies
 */
import Block from './block';

export default ( { attributes } ) => {
	const productDataContext = useProductDataContext();
	const product = productDataContext.product || {};

	return (
		<>
			<EditProductLink productId={ product.id } />
			<Disabled>
				<Block { ...attributes } />
			</Disabled>
		</>
	);
};

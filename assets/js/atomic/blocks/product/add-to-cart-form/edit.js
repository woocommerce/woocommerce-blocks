/**
 * External dependencies
 */
import EditProductLink from '@woocommerce/block-components/edit-product-link';
import { useProductDataContext } from '@woocommerce/shared-context';
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
export default () => {
	const productDataContext = useProductDataContext();
	const product = productDataContext.product || {};

	return (
		<>
			<EditProductLink productId={ product.id } />
			<InnerBlocks
				template={ [
					[ 'woocommerce/product-add-to-cart-form-button' ],
				] }
				templateLock="insert"
			/>
		</>
	);
};

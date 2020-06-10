/**
 * External dependencies
 */
import EditProductLink from '@woocommerce/block-components/edit-product-link';
import { useProductDataContext } from '@woocommerce/shared-context';
import { InnerBlocks } from '@wordpress/block-editor';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './style.scss';

export default ( { attributes } ) => {
	const productDataContext = useProductDataContext();
	const product = productDataContext.product || {};
	const { className } = attributes;

	return (
		<div
			className={ classnames(
				className,
				'wc-block-components-product-add-to-cart-form'
			) }
		>
			<EditProductLink productId={ product.id } />
			<InnerBlocks
				template={ [
					// @todo Add Blocks for Grouped and Variable add to cart forms.
					[ 'woocommerce/product-add-to-cart-form-button' ],
				] }
				templateLock="insert"
			/>
		</div>
	);
};

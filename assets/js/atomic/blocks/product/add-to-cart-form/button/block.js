/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import {
	useInnerBlockLayoutContext,
	useProductDataContext,
} from '@woocommerce/shared-context';

/**
 * Add to Cart Form Qty + Button Block Component.
 *
 * @param {Object} props             Incoming props.
 * @param {string} [props.className] CSS Class name for the component.
 * @param {Object} [props.product]   Optional product object. Product from context will be used if
 *                                   this is not provided.
 * @return {*} The component.
 */
const Block = ( { className, ...props } ) => {
	const { parentClassName } = useInnerBlockLayoutContext();
	const productDataContext = useProductDataContext();
	const product = props.product || productDataContext.product || null;

	return (
		<div
			className={ classnames(
				className,
				'wp-block-button',
				'wc-block-components-product-button',
				`${ parentClassName }__product-add-to-cart`
			) }
		>
			<input type="number" value="1" />
			{ product ? <AddToCartButton /> : <AddToCartButtonPlaceholder /> }
		</div>
	);
};

const AddToCartButton = () => {
	return (
		<button
			className={ classnames(
				'wp-block-button__link',
				'add_to_cart_button',
				'wc-block-components-product-button__button'
			) }
		>
			{ __( 'Add to cart', 'woo-gutenberg-products-block' ) }
		</button>
	);
};

const AddToCartButtonPlaceholder = () => {
	return (
		<button
			className={ classnames(
				'wp-block-button__link',
				'add_to_cart_button',
				'wc-block-components-product-button__button',
				'wc-block-components-product-button__button--placeholder'
			) }
			disabled={ true }
		/>
	);
};

Block.propTypes = {
	className: PropTypes.string,
	product: PropTypes.object,
};

export default Block;

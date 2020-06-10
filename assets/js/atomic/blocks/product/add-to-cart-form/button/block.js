/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { useProductDataContext } from '@woocommerce/shared-context';

/**
 * Internal dependencies
 */
import { useAddToCartFormContext } from '../context';

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
	const {
		quantity,
		setQuantity,
		allowSubmit,
		onSubmit,
	} = useAddToCartFormContext();
	const productDataContext = useProductDataContext();
	const product = props.product || productDataContext.product || {};

	const qtyProps = {
		value: quantity,
		min: 1,
		max: product.quantity_limit || undefined,
		hidden: product.quantity_limit && product.quantity_limit === 1,
		disabled: ! allowSubmit,
		onChange: ( event ) => {
			setQuantity( event.target.value );
		},
	};

	const buttonProps = {
		disabled: ! allowSubmit,
		onClick: onSubmit,
	};

	if ( ! product ) {
		buttonProps.disabled = true;
		qtyProps.disabled = true;
	}

	return (
		<div
			className={ classnames(
				className,
				'wp-block-button',
				'wc-block-components-product-add-to-cart-form-button'
			) }
		>
			<input
				className="wc-block-components-product-add-to-cart-form-button__qty"
				type="number"
				{ ...qtyProps }
			/>
			<button
				className={ classnames(
					'wp-block-button__link',
					'wc-block-components-product-add-to-cart-form-button__button',
					{
						'wc-block-components-product-add-to-cart-form-button__button--placeholder': ! product,
					}
				) }
				{ ...buttonProps }
			>
				{ __( 'Add to cart', 'woo-gutenberg-products-block' ) }
			</button>
		</div>
	);
};

Block.propTypes = {
	className: PropTypes.string,
	product: PropTypes.object,
};

export default Block;

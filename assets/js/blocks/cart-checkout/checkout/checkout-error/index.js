/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { CART_URL } from '@woocommerce/block-settings';
import { Icon, exclamation } from '@woocommerce/icons';
import { getSetting } from '@woocommerce/settings';

/**
 * Gets the checkout error from the server if possible.
 */
const CheckoutErrorMessage = () => {
	const checkoutData = getSetting( 'checkoutData', {} );

	if ( typeof checkoutData.message === 'string' ) {
		return (
			<p className="wc-block-checkout-error__description">
				{ checkoutData.message }
			</p>
		);
	}

	return (
		<p className="wc-block-checkout-error__description">
			{ __(
				'There was a problem creating an order from your cart items. Please go back to your cart and fix any reported problems before retrying.',
				'woo-gutenberg-products-block'
			) }
		</p>
	);
};

/**
 * Renders checkout error state.
 */
const CheckoutError = () => {
	return (
		<div className="wc-block-checkout-error">
			<Icon
				className="wc-block-checkout-error__image"
				alt=""
				srcElement={ exclamation }
				size={ 100 }
			/>
			<strong className="wc-block-checkout-error_title">
				{ __(
					'There was a problem with your cart',
					'woo-gutenberg-products-block'
				) }
			</strong>
			<CheckoutErrorMessage />
			<span className="wp-block-button">
				<a href={ CART_URL } className="wp-block-button__link">
					{ __( 'View your cart', 'woo-gutenberg-products-block' ) }
				</a>
			</span>
		</div>
	);
};

export default CheckoutError;

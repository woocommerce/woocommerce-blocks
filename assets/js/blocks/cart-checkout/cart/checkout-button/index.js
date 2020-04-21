/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { Button } from '@woocommerce/base-components/cart-checkout';
import { CHECKOUT_URL } from '@woocommerce/block-settings';
import { useCheckoutContext } from '@woocommerce/base-context';

/**
 * Internal dependencies
 */
import './style.scss';
import PaymentMethods from '../payment-methods';

/**
 * Checkout button rendered in the full cart page.
 */
const CheckoutButton = ( { link } ) => {
	const { isCalculating } = useCheckoutContext();
	const [ showSpinner, setShowSpinner ] = useState( false );

	return (
		<div className="wc-block-cart__submit-container">
			<Button
				className="wc-block-cart__submit-button"
				href={ link || CHECKOUT_URL }
				disabled={ isCalculating }
				onClick={ () => setShowSpinner( true ) }
				showSpinner={ showSpinner }
			>
				{ __( 'Proceed to Checkout', 'woo-gutenberg-products-block' ) }
			</Button>
			<PaymentMethods />
		</div>
	);
};

export default CheckoutButton;

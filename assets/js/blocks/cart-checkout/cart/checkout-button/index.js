/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { PaymentMethodIcons } from '@woocommerce/base-components/cart-checkout';
import Button from '@woocommerce/base-components/button';
import { CHECKOUT_URL } from '@woocommerce/block-settings';
import { useCheckoutContext } from '@woocommerce/base-context';
import {
	usePaymentMethods,
	usePositionRelativeToViewport,
} from '@woocommerce/base-hooks';

/**
 * Internal dependencies
 */
import './style.scss';

const getIconsFromPaymentMethods = ( paymentMethods ) => {
	return Object.values( paymentMethods ).reduce( ( acc, paymentMethod ) => {
		if ( paymentMethod.icons !== null ) {
			acc = acc.concat( paymentMethod.icons );
		}
		return acc;
	}, [] );
};

/**
 * Checkout button rendered in the full cart page.
 */
const CheckoutButton = ( { link } ) => {
	const { isCalculating } = useCheckoutContext();
	const [ positionObserver, position ] = usePositionRelativeToViewport();
	const [ showSpinner, setShowSpinner ] = useState( false );
	const { paymentMethods } = usePaymentMethods();

	const submitContainerContents = (
		<>
			<Button
				className="wc-block-cart__submit-button"
				href={ link || CHECKOUT_URL }
				disabled={ isCalculating }
				onClick={ () => setShowSpinner( true ) }
				showSpinner={ showSpinner }
			>
				{ __( 'Proceed to Checkout', 'woo-gutenberg-products-block' ) }
			</Button>
			<PaymentMethodIcons
				icons={ getIconsFromPaymentMethods( paymentMethods ) }
			/>
		</>
	);

	return (
		<div className="wc-block-cart__submit">
			{ positionObserver }
			<div className="wc-block-cart__submit-container">
				{ submitContainerContents }
			</div>
			{ position === 'below' && (
				<div className="wc-block-cart__submit-container wc-block-cart__submit-container--sticky">
					{ submitContainerContents }
				</div>
			) }
		</div>
	);
};

export default CheckoutButton;

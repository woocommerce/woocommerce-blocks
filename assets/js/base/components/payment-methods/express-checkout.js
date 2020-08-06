/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useExpressPaymentMethods } from '@woocommerce/base-hooks';
import { StoreNoticesProvider } from '@woocommerce/base-context';
import Title from '@woocommerce/base-components/title';

/**
 * Internal dependencies
 */
import ExpressPaymentMethods from './express-payment-methods';
import './style.scss';

const ExpressCheckoutContainer = ( { children } ) => {
	return (
		<>
			<div className="wc-block-components-express-checkout">
				<div className="wc-block-components-express-checkout__title-container">
					<Title
						className="wc-block-components-express-checkout__title"
						headingLevel="2"
					>
						{ __(
							'Express checkout',
							'woo-gutenberg-products-block'
						) }
					</Title>
				</div>
				<div className="wc-block-components-express-checkout__content">
					<StoreNoticesProvider context="wc/express-payment-area">
						{ children }
					</StoreNoticesProvider>
				</div>
			</div>
			<div className="wc-block-components-express-checkout-continue-rule">
				{ __( 'Or continue below', 'woo-gutenberg-products-block' ) }
			</div>
		</>
	);
};

const CompactExpressCheckoutContainer = ( { children } ) => {
	return (
		<>
			<div className="wc-block-components-express-checkout is-compact">
				<div className="wc-block-components-express-checkout__content">
					<StoreNoticesProvider context="wc/express-payment-area">
						{ children }
					</StoreNoticesProvider>
				</div>
			</div>
			<div className="wc-block-components-express-checkout-continue-rule is-compact">
				{ /* translators: Shown in the Cart block between the express payment methods and the Proceed to Checkout button */ }
				{ __( 'Or', 'woo-gutenberg-products-block' ) }
			</div>
		</>
	);
};

const ExpressCheckoutFormControl = ( { isCompact = false } ) => {
	const { paymentMethods, isInitialized } = useExpressPaymentMethods();

	if (
		! isInitialized ||
		( isInitialized && Object.keys( paymentMethods ).length === 0 )
	) {
		return null;
	}

	if ( isCompact ) {
		return (
			<CompactExpressCheckoutContainer>
				<ExpressPaymentMethods />
			</CompactExpressCheckoutContainer>
		);
	}

	return (
		<ExpressCheckoutContainer>
			<p>
				{ __(
					'In a hurry? Use one of our express checkout options below:',
					'woo-gutenberg-products-block'
				) }
			</p>
			<ExpressPaymentMethods />
		</ExpressCheckoutContainer>
	);
};

export default ExpressCheckoutFormControl;

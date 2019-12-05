/**
 * External dependencies
 */
import { Fragment } from '@wordpress/element';
import { Placeholder } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import FormStep from '@woocommerce/base-components/checkout/form-step';
import CheckoutForm from '@woocommerce/base-components/checkout/form';

/**
 * Internal dependencies
 */
import './style.scss';

/**
 * Component displaying an attribute filter.
 */
const Block = () => {
	return (
		<CheckoutForm>
			<FormStep
				className="wc-blocks-checkout__billing-fields"
				title={ __(
					'Contact information',
					'woo-gutenberg-products-block'
				) }
				description={ __(
					'We\'ll use this email to send you details and updates about your order.',
					'woo-gutenberg-products-block'
				) }
				stepNumber={ 1 }
				id="checkout-billing-fields"
				secondaryAction={
					<Fragment>
						{ __(
							'Already have an account? ',
							'woo-gutenberg-products-block'
						) }
						<a href="/wp-login.php">
							{ __( 'Log in.', 'woo-gutenberg-products-block' ) }
						</a>
					</Fragment>
				}
			>
				<Placeholder>A checkout step, coming soon near you</Placeholder>
			</FormStep>
			<FormStep
				className="wc-blocks-checkout__shipping-fields"
				title={ __(
					'Shipping address',
					'woo-gutenberg-products-block'
				) }
				description={ __(
					'Enter the physical address where you want us to deliver your order.',
					'woo-gutenberg-products-block'
				) }
				stepNumber={ 2 }
				id="checkout-shipping-fields"
			>
				<Placeholder>A checkout step, coming soon near you</Placeholder>
			</FormStep>
			<FormStep
				className="wc-blocks-checkout__shipping-methods"
				title={ __(
					'Shipping options',
					'woo-gutenberg-products-block'
				) }
				description={ __(
					'Select your shipping method below.',
					'woo-gutenberg-products-block'
				) }
				stepNumber={ 3 }
				id="checkout-shipping-methods"
			>
				<Placeholder>A checkout step, coming soon near you</Placeholder>
			</FormStep>
			<FormStep
				className="wc-blocks-checkout__payment-fields"
				title={ __( 'Payment method', 'woo-gutenberg-products-block' ) }
				description={ __(
					'Select a payment method below.',
					'woo-gutenberg-products-block'
				) }
				stepNumber={ 4 }
				id="checkout-payment-fields"
			>
				<Placeholder>A checkout step, coming soon near you</Placeholder>
			</FormStep>
		</CheckoutForm>
	);
};

export default Block;

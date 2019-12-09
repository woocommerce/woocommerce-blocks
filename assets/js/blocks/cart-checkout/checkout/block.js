/**
 * External dependencies
 */
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import FormStep from '@woocommerce/base-components/checkout/form-step';
import CheckoutForm from '@woocommerce/base-components/checkout/form';
import TextInput from '@woocommerce/base-components/text-input';
import InputRow from '@woocommerce/base-components/input-row';

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
				id="billing-fields"
				className="wc-blocks-checkout__billing-fields"
				title={ __(
					'Contact information',
					'woo-gutenberg-products-block'
				) }
				description={ __(
					"We'll use this email to send you details and updates about your order.",
					'woo-gutenberg-products-block'
				) }
				stepNumber={ 1 }
				stepHeadingContent={ () => (
					<Fragment>
						{ __(
							'Already have an account? ',
							'woo-gutenberg-products-block'
						) }
						<a href="/wp-login.php">
							{ __( 'Log in.', 'woo-gutenberg-products-block' ) }
						</a>
					</Fragment>
				) }
			>
				<TextInput
					id="email-field"
					label={ __(
						'Email address',
						'woo-gutenberg-products-block'
					) }
				/>
				<InputRow>
					<TextInput
						id="email-field-2"
						label={ __(
							'Email address',
							'woo-gutenberg-products-block'
						) }
					/>
					<TextInput
						id="name-field"
						label={ __(
							'Name address',
							'woo-gutenberg-products-block'
						) }
					/>
				</InputRow>
				<InputRow>
					<TextInput
						id="name-field-2"
						label={ __(
							'Name address',
							'woo-gutenberg-products-block'
						) }
					/>
					<TextInput
						id="name-field-3"
						label={ __(
							'Name address',
							'woo-gutenberg-products-block'
						) }
					/>
					<TextInput
						id="name-field-4"
						label={ __(
							'Name address',
							'woo-gutenberg-products-block'
						) }
					/>
				</InputRow>
			</FormStep>
		</CheckoutForm>
	);
};

export default Block;

/**
 * External dependencies
 */
import { Fragment, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import AddressForm from '@woocommerce/base-components/address-form';
import FormStep from '@woocommerce/base-components/checkout/form-step';
import CheckoutForm from '@woocommerce/base-components/checkout/form';
import NoShipping from '@woocommerce/base-components/checkout/no-shipping';
import TextInput from '@woocommerce/base-components/text-input';
import ShippingRatesControl, {
	Packages,
} from '@woocommerce/base-components/shipping-rates-control';
import { CheckboxControl } from '@wordpress/components';
import { getCurrencyFromPriceResponse } from '@woocommerce/base-utils';
import FormattedMonetaryAmount from '@woocommerce/base-components/formatted-monetary-amount';
import CheckoutProvider from '@woocommerce/base-context/checkout-context';
import {
	ExpressCheckoutFormControl,
	PaymentMethods,
} from '@woocommerce/base-components/payment-methods';
import { SHIPPING_ENABLED } from '@woocommerce/block-settings';
import { decodeEntities } from '@wordpress/html-entities';

/**
 * Internal dependencies
 */
import './style.scss';
import '../../../payment-methods-demo';

const Block = ( { shippingRates = [], isEditor = false } ) => {
	const [ selectedShippingRate, setSelectedShippingRate ] = useState( {} );
	const [ contactFields, setContactFields ] = useState( {} );
	const [ shouldSavePayment, setShouldSavePayment ] = useState( true );
	const [ shippingFields, setShippingFields ] = useState( {} );

	const renderShippingRatesControlOption = ( option ) => ( {
		label: decodeEntities( option.name ),
		value: option.rate_id,
		description: decodeEntities( option.description ),
		secondaryLabel: (
			<FormattedMonetaryAmount
				currency={ getCurrencyFromPriceResponse( option ) }
				value={ option.price }
			/>
		),
		secondaryDescription: decodeEntities( option.delivery_time ),
	} );

	return (
		<CheckoutProvider>
			<ExpressCheckoutFormControl />
			<CheckoutForm>
				<FormStep
					id="billing-fields"
					className="wc-block-checkout__billing-fields"
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
								{ __(
									'Log in.',
									'woo-gutenberg-products-block'
								) }
							</a>
						</Fragment>
					) }
				>
					<TextInput
						type="email"
						label={ __(
							'Email address',
							'woo-gutenberg-products-block'
						) }
						value={ contactFields.email }
						autoComplete="email"
						onChange={ ( newValue ) =>
							setContactFields( {
								...contactFields,
								email: newValue,
							} )
						}
						required={ true }
					/>
					<CheckboxControl
						className="wc-block-checkout__keep-updated"
						label={ __(
							'Keep me up to date on news and exclusive offers',
							'woo-gutenberg-products-block'
						) }
						checked={ contactFields.keepUpdated }
						onChange={ () =>
							setContactFields( {
								...contactFields,
								keepUpdated: ! contactFields.keepUpdated,
							} )
						}
					/>
				</FormStep>
				{ SHIPPING_ENABLED && (
					<FormStep
						id="shipping-fields"
						className="wc-block-checkout__shipping-fields"
						title={ __(
							'Shipping address',
							'woo-gutenberg-products-block'
						) }
						description={ __(
							'Enter the physical address where you want us to deliver your order.',
							'woo-gutenberg-products-block'
						) }
						stepNumber={ 2 }
					>
						<AddressForm
							onChange={ setShippingFields }
							values={ shippingFields }
						/>
						<TextInput
							type="tel"
							label={ __(
								'Phone',
								'woo-gutenberg-products-block'
							) }
							value={ shippingFields.phone }
							autoComplete="tel"
							onChange={ ( newValue ) =>
								setShippingFields( {
									...shippingFields,
									phone: newValue,
								} )
							}
							required={ true }
						/>
						<CheckboxControl
							className="wc-block-checkout__use-address-for-billing"
							label={ __(
								'Use same address for billing',
								'woo-gutenberg-products-block'
							) }
							checked={ shippingFields.useSameForBilling }
							onChange={ () =>
								setShippingFields( {
									...shippingFields,
									useSameForBilling: ! shippingFields.useSameForBilling,
								} )
							}
						/>
					</FormStep>
				) }
				{ SHIPPING_ENABLED &&
					( shippingRates.length === 0 && isEditor ? (
						<NoShipping />
					) : (
						<FormStep
							id="shipping-option"
							className="wc-block-checkout__shipping-option"
							title={ __(
								'Shipping options',
								'woo-gutenberg-products-block'
							) }
							description={ __(
								'Select your shipping method below.',
								'woo-gutenberg-products-block'
							) }
							stepNumber={ 3 }
						>
							{ shippingRates.length > 0 ? (
								<Packages
									renderOption={
										renderShippingRatesControlOption
									}
									shippingRates={ shippingRates }
									selected={ [
										// This is only rendered in the editor, with placeholder
										// shippingRates, so we can safely fallback to set the
										// first shipping rate as selected and ignore setting
										// an onChange prop.
										shippingRates[ 0 ].shipping_rates[ 0 ]
											.rate_id,
									] }
								/>
							) : (
								<ShippingRatesControl
									address={
										shippingFields.country
											? {
													address_1:
														shippingFields.address_1,
													address_2:
														shippingFields.apartment,
													city: shippingFields.city,
													state: shippingFields.state,
													postcode:
														shippingFields.postcode,
													country:
														shippingFields.country,
											  }
											: null
									}
									noResultsMessage={ __(
										'There are no shipping options available. Please ensure that your address has been entered correctly, or contact us if you need any help.',
										'woo-gutenberg-products-block'
									) }
									selected={ selectedShippingRate.methods }
									renderOption={
										renderShippingRatesControlOption
									}
									onChange={ ( newMethods ) =>
										setSelectedShippingRate( {
											...selectedShippingRate,
											methods: newMethods,
										} )
									}
								/>
							) }
							<CheckboxControl
								className="wc-block-checkout__add-note"
								label="Add order notes?"
								checked={ selectedShippingRate.orderNote }
								onChange={ () =>
									setSelectedShippingRate( {
										...selectedShippingRate,
										orderNote: ! selectedShippingRate.orderNote,
									} )
								}
							/>
						</FormStep>
					) ) }
				<FormStep
					id="payment-method"
					className="wc-block-checkout__payment-method"
					title={ __(
						'Payment method',
						'woo-gutenberg-products-block'
					) }
					description={ __(
						'Select a payment method below.',
						'woo-gutenberg-products-block'
					) }
					stepNumber={ 4 }
				>
					<PaymentMethods />
					{ /*@todo this should be something the payment method controls*/ }
					<CheckboxControl
						className="wc-block-checkout__save-card-info"
						label={ __(
							'Save payment information to my account for future purchases.',
							'woo-gutenberg-products-block'
						) }
						checked={ shouldSavePayment }
						onChange={ () =>
							setShouldSavePayment( ! shouldSavePayment )
						}
					/>
				</FormStep>
			</CheckoutForm>
		</CheckoutProvider>
	);
};

export default Block;

/**
 * External dependencies
 */
import {
	useCheckoutData,
	usePaymentEvents,
	useActivePaymentMethod,
} from '@woocommerce/base-hooks';
import { getPaymentMethods } from '@woocommerce/blocks-registry';
import { useCallback } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Tabs from '../tabs';

const noPaymentMethodTab = () => {
	const label = __( 'Not Existing', 'woo-gutenberg-products-block' );
	return {
		name: label,
		label,
		title: label,
	};
};

const createTabs = ( paymentMethods ) => {
	const paymentMethodsKeys = Object.keys( paymentMethods );
	return paymentMethodsKeys.length > 0
		? paymentMethodsKeys.map( ( key ) => {
				const { tab, ariaLabel } = paymentMethods[ key ];
				return {
					name: key,
					title: tab,
					ariaLabel,
				};
		  } )
		: [ noPaymentMethodTab() ];
};

const paymentMethods = getPaymentMethods();

const PaymentMethods = () => {
	const [ checkoutData ] = useCheckoutData();
	const { dispatch, select } = usePaymentEvents();
	const {
		activePaymentMethod,
		setActivePaymentMethod,
	} = useActivePaymentMethod();
	const getRenderedTab = useCallback(
		() => ( selectedTab ) => {
			const PaymentMethod =
				( paymentMethods[ selectedTab ] &&
					paymentMethods[ selectedTab ].content ) ||
				null;
			// @todo if undefined return placeholder for no registered payment methods
			if ( ! PaymentMethod ) {
				return (
					<p>
						{ __(
							'No payment methods setup',
							'woo-gutenberg-products-block'
						) }
					</p>
				);
			}
			const paymentEvents = { dispatch, select };
			return (
				<PaymentMethod
					isActive
					checkoutData={ checkoutData }
					paymentEvents={ paymentEvents }
				/>
			);
		},
		[ checkoutData, dispatch, select ]
	);
	return (
		<Tabs
			className="wc-component__payment-method-options"
			onSelect={ ( tabName ) => setActivePaymentMethod( tabName ) }
			tabs={ createTabs( paymentMethods ) }
			initialTabName={ activePaymentMethod }
			ariaLabel={ __(
				'Payment Methods',
				'woo-gutenberg-products-block'
			) }
		>
			{ getRenderedTab() }
		</Tabs>
	);
};

export default PaymentMethods;

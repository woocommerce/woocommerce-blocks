/**
 * External dependencies
 */
import {
	useCheckoutData,
	usePaymentEvents,
	useActivePaymentMethod,
	usePaymentMethods,
} from '@woocommerce/base-hooks';
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
				const { label, ariaLabel } = paymentMethods[ key ];
				return {
					name: key,
					title: label,
					ariaLabel,
				};
		  } )
		: [ noPaymentMethodTab() ];
};

const PaymentMethods = () => {
	const [ checkoutData ] = useCheckoutData();
	const { dispatch, select } = usePaymentEvents();
	const { isInitialized, paymentMethods } = usePaymentMethods();
	const {
		activePaymentMethod,
		setActivePaymentMethod,
	} = useActivePaymentMethod();
	const getRenderedTab = useCallback(
		() => ( selectedTab ) => {
			const PaymentMethod =
				( paymentMethods[ selectedTab ] &&
					paymentMethods[ selectedTab ].activeContent ) ||
				null;
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
	if (
		! isInitialized ||
		( Object.keys( paymentMethods ).length === 0 && isInitialized )
	) {
		// @todo this can be a placeholder informing the user there are no
		// payment methods setup?
		return <div>No Payment Methods Initialized</div>;
	}
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

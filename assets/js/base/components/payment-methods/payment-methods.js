/**
 * External dependencies
 */
import {
	usePaymentMethodInterface,
	usePaymentMethods,
} from '@woocommerce/base-hooks';
import {
	cloneElement,
	useRef,
	useCallback,
	useEffect,
} from '@wordpress/element';
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
		title: () => label,
	};
};

const createTabs = ( paymentMethods ) => {
	const paymentMethodsKeys = Object.keys( paymentMethods );
	return paymentMethodsKeys.length > 0
		? paymentMethodsKeys.map( ( key ) => {
				const { label, ariaLabel } = paymentMethods[ key ];
				return {
					name: key,
					title: () => label,
					ariaLabel,
				};
		  } )
		: [ noPaymentMethodTab() ];
};

const PaymentMethods = ( { isEditor } ) => {
	const { isInitialized, paymentMethods } = usePaymentMethods();
	const {
		activePaymentMethod,
		setActivePaymentMethod,
		...paymentMethodInterface
	} = usePaymentMethodInterface();
	const currentPaymentMethodInterface = useRef( paymentMethodInterface );
	const currentPaymentMethods = useRef( paymentMethods );

	// update refs on changes
	useEffect( () => {
		currentPaymentMethods.current = paymentMethods;
		currentPaymentMethodInterface.current = paymentMethodInterface;
	}, [ paymentMethods, paymentMethodInterface ] );

	const getRenderedTab = useCallback(
		() => ( selectedTab ) => {
			let paymentMethod =
				currentPaymentMethods.current[ selectedTab ] || null;
			if ( paymentMethod ) {
				paymentMethod = isEditor
					? paymentMethod.edit
					: paymentMethod.activeContent;
			}
			return paymentMethod
				? cloneElement( paymentMethod, {
						isActive: true,
						...currentPaymentMethodInterface.current,
				  } )
				: null;
		},
		[]
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

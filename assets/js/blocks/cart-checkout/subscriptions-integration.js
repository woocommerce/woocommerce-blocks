/**
 * External dependencies
 */
import { ExperimentalOrderShippingPackages } from '@woocommerce/blocks-checkout';
import { registerPlugin } from '@wordpress/plugins';
import { useStoreCart } from '@woocommerce/base-hooks';
import { useMemo } from '@wordpress/element';
import Packages from '@woocommerce/base-components/cart-checkout/shipping-rates-control/packages.js';

const RenderSubscriptionPackages = () => {
	const {
		extensions: { subscriptions },
	} = useStoreCart();

	// Flatten all packages from recurring carts.
	const packages = useMemo( () => {
		const newPackages = [];

		Object.values( subscriptions ).forEach( ( recurringCart ) => {
			const recurringCartPackages = recurringCart.shipping_rates || [];

			recurringCartPackages.forEach( ( recurringCartPackage ) => {
				newPackages.push( recurringCartPackage );
			} );
		} );

		return newPackages;
	}, [ subscriptions ] );

	if ( ! packages.length ) {
		return null;
	}

	return (
		<ExperimentalOrderShippingPackages>
			<SubscriptionShippingRates packages={ packages } />
		</ExperimentalOrderShippingPackages>
	);
};

const SubscriptionShippingRates = ( { collapsible, packages } ) => {
	return <Packages collapsible={ collapsible } shippingRates={ packages } />;
};

registerPlugin( 'woocommerce-subscriptions-shipping', {
	render: RenderSubscriptionPackages,
} );

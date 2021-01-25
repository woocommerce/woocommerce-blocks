/**
 * External dependencies
 */
import {
	ExperimentalOrderShippingPackages,
	ShippingRatesControlPackage,
} from '@woocommerce/blocks-checkout';
import { registerPlugin } from '@wordpress/plugins';
import { useStoreCart } from '@woocommerce/base-hooks';
import { useMemo } from '@wordpress/element';

const RenderSubscriptionPackages = () => {
	const {
		extensions: { subscriptions },
	} = useStoreCart();

	// Flatten all packages from recurring carts.
	const packages = useMemo(
		() =>
			Object.values( subscriptions )
				.map( ( recurringCart ) => recurringCart.shipping_rates )
				.filter( Boolean )
				.flat(),
		[ subscriptions ]
	);

	return packages.map( ( { package_id: packageId, ...packageData } ) => (
		<ExperimentalOrderShippingPackages key={ packageId }>
			<SubscriptionPackage
				key={ packageId }
				packageId={ packageId }
				packageData={ packageData }
			/>
		</ExperimentalOrderShippingPackages>
	) );
};

const SubscriptionPackage = ( props ) => {
	return <ShippingRatesControlPackage { ...props } />;
};

registerPlugin( 'woocommerce-subscriptions-shipping', {
	render: RenderSubscriptionPackages,
} );

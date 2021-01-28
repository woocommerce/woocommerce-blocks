/**
 * External dependencies
 */
import {
	ExperimentalOrderShippingPackages,
	ShippingRatesControlPackage,
} from '@woocommerce/blocks-checkout';
import { registerPlugin } from '@wordpress/plugins';
import { useMemo } from '@wordpress/element';

const SubscriptionsRecurringPackages = ( {
	extensions,
	collapsible,
	collapse,
	showItems,
	noResultsMessage,
	renderOption,
} ) => {
	const { subscriptions = [] } = extensions;

	// Flatten all packages from recurring carts.
	const packages = useMemo(
		() =>
			Object.values( subscriptions )
				.map( ( recurringCart ) => recurringCart.shipping_rates )
				.filter( Boolean )
				.flat(),
		[ subscriptions ]
	);
	const shouldCollapse = useMemo( () => packages.length > 1 || collapse, [
		packages.length,
		collapse,
	] );
	const shouldShowItems = useMemo( () => packages.length > 1 || showItems, [
		packages.length,
		showItems,
	] );
	return packages.map( ( { package_id: packageId, ...packageData } ) => (
		<ShippingRatesControlPackage
			key={ packageId }
			packageId={ packageId }
			packageData={ packageData }
			collapsible={ collapsible }
			collapse={ shouldCollapse }
			showItems={ shouldShowItems }
			noResultsMessage={ noResultsMessage }
			renderOption={ renderOption }
		/>
	) );
};

const RenderSubscriptionPackages = () => (
	<ExperimentalOrderShippingPackages>
		<SubscriptionsRecurringPackages />
	</ExperimentalOrderShippingPackages>
);

registerPlugin( 'woocommerce-subscriptions-shipping', {
	render: RenderSubscriptionPackages,
} );

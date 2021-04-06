/**
 * External dependencies
 */
import { ShippingRatesControlPackage } from '@woocommerce/blocks-checkout';

/**
 * @typedef {import('react')} React
 */

/**
 * Renders multiple packages within the slotfill.
 *
 * @param {Object} props Incoming props.
 * @param {Array} props.packages Array of packages.
 * @param {React.ReactElement} props.noResultsMessage Rendered when there are no rates in a package.
 * @param {boolean} props.collapsible If the package should be rendered as a
 * collapsible panel.
 * @param {boolean} props.collapse If the panel should be collapsed by default,
 * only works if collapsible is true.
 * @param {boolean} props.showItems If we should items below the package name.
 * @param {Function} [props.renderOption] Function to render a shipping rate.
 * @param {Function} props.useSelectShippingRate useSelectShippingRate hook.
 * @return {React.ReactElement|Array|null} Rendered components.
 */
const Packages = ( {
	packages,
	collapse,
	showItems,
	collapsible,
	noResultsMessage,
	renderOption,
	useSelectShippingRate,
} ) => {
	// If there are no packages, return nothing.
	if ( ! packages.length ) {
		return null;
	}

	return packages.map( ( { package_id: packageId, ...packageData } ) => (
		<ShippingRatesControlPackage
			key={ packageId }
			packageId={ packageId }
			packageData={ packageData }
			collapsible={ collapsible }
			collapse={ collapse }
			showItems={ showItems }
			noResultsMessage={ noResultsMessage }
			renderOption={ renderOption }
			useSelectShippingRate={ useSelectShippingRate }
		/>
	) );
};

export default Packages;

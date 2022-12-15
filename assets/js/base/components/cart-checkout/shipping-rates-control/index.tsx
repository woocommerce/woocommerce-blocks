/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import LoadingMask from '@woocommerce/base-components/loading-mask';
import { ExperimentalOrderShippingPackages } from '@woocommerce/blocks-checkout';
import {
	getShippingRatesPackageCount,
	getShippingRatesRateCount,
} from '@woocommerce/base-utils';
import { useStoreCart, useEditorContext } from '@woocommerce/base-context';

/**
 * Internal dependencies
 */
import ShippingRatesControlPackage from '../shipping-rates-control-package';
import { speakFoundShippingOptions } from './utils';
import type { PackagesProps, ShippingRatesControlProps } from './types';

/**
 * Renders multiple packages within the slotfill.
 */
const Packages = ( {
	packages,
	showItems,
	collapsible,
	noResultsMessage,
	renderOption,
}: PackagesProps ): JSX.Element | null => {
	// If there are no packages, return nothing.
	if ( ! packages.length ) {
		return null;
	}
	return (
		<>
			{ packages.map( ( { package_id: packageId, ...packageData } ) => (
				<ShippingRatesControlPackage
					key={ packageId }
					packageId={ packageId }
					packageData={ packageData }
					collapsible={ collapsible }
					showItems={ showItems }
					noResultsMessage={ noResultsMessage }
					renderOption={ renderOption }
				/>
			) ) }
		</>
	);
};

/**
 * Renders the shipping rates control element.
 */
const ShippingRatesControl = ( {
	shippingRates,
	isLoadingRates,
	className,
	collapsible,
	showItems,
	noResultsMessage,
	renderOption,
	context,
}: ShippingRatesControlProps ): JSX.Element => {
	useEffect( () => {
		if ( isLoadingRates ) {
			return;
		}
		speakFoundShippingOptions(
			getShippingRatesPackageCount( shippingRates ),
			getShippingRatesRateCount( shippingRates )
		);
	}, [ isLoadingRates, shippingRates ] );

	// Prepare props to pass to the ExperimentalOrderShippingPackages slot fill.
	// We need to pluck out receiveCart.
	// eslint-disable-next-line no-unused-vars
	const { extensions, receiveCart, ...cart } = useStoreCart();
	const slotFillProps = {
		className,
		collapsible,
		showItems,
		noResultsMessage,
		renderOption,
		extensions,
		cart,
		components: {
			ShippingRatesControlPackage,
		},
		context,
	};
	const { isEditor } = useEditorContext();

	return (
		<LoadingMask
			isLoading={ isLoadingRates }
			screenReaderLabel={ __(
				'Loading shipping rates…',
				'woo-gutenberg-products-block'
			) }
			showSpinner={ true }
		>
			{ isEditor ? (
				<Packages
					packages={ shippingRates }
					noResultsMessage={ noResultsMessage }
					renderOption={ renderOption }
				/>
			) : (
				<>
					<ExperimentalOrderShippingPackages.Slot
						{ ...slotFillProps }
					/>
					<ExperimentalOrderShippingPackages>
						<Packages
							packages={ shippingRates }
							noResultsMessage={ noResultsMessage }
							renderOption={ renderOption }
						/>
					</ExperimentalOrderShippingPackages>
				</>
			) }
		</LoadingMask>
	);
};

export default ShippingRatesControl;

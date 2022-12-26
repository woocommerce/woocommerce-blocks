/**
 * External dependencies
 */
import { __, _n, sprintf } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { speak } from '@wordpress/a11y';
import LoadingMask from '@woocommerce/base-components/loading-mask';
import { ExperimentalOrderShippingPackages } from '@woocommerce/blocks-checkout';
import {
	getShippingRatesPackageCount,
	getShippingRatesRateCount,
} from '@woocommerce/base-utils';
import { useStoreCart, useEditorContext } from '@woocommerce/base-context';
import { CartResponseShippingRate } from '@woocommerce/types';
import { ReactElement } from 'react';

/**
 * Internal dependencies
 */
import ShippingRatesControlPackage, {
	PackageRateRenderOption,
	TernaryFlag,
} from '../shipping-rates-control-package';

interface PackagesProps {
	packages: CartResponseShippingRate[];
	collapsible?: TernaryFlag;
	showItems?: TernaryFlag;
	noResultsMessage: ReactElement;
	renderOption?: PackageRateRenderOption | undefined;
}

/**
 * Renders multiple packages within the slotfill.
 *
 * @param {Object}                  props                  Incoming props.
 * @param {Array}                   props.packages         Array of packages.
 * @param {boolean|undefined}       props.collapsible      If the package should be rendered as a
 * @param {ReactElement}            props.noResultsMessage Rendered when there are no rates in a package.
 *                                                         collapsible panel.
 * @param {boolean|undefined}       props.showItems        If we should items below the package name.
 * @param {PackageRateRenderOption} [props.renderOption]   Function to render a shipping rate.
 * @return {JSX.Element|null} Rendered components.
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

interface ShippingRatesControlProps {
	collapsible?: TernaryFlag;
	showItems?: TernaryFlag;
	shippingRates: CartResponseShippingRate[];
	className?: string;
	isLoadingRates: boolean;
	noResultsMessage: ReactElement;
	renderOption?: PackageRateRenderOption | undefined;
	context: 'woocommerce/cart' | 'woocommerce/checkout';
}
/**
 * Renders the shipping rates control element.
 *
 * @param {Object}            props                  Incoming props.
 * @param {Array}             props.shippingRates    Array of packages containing shipping rates.
 * @param {boolean}           props.isLoadingRates   True when rates are being loaded.
 * @param {string}            props.className        Class name for package rates.
 * @param {boolean|undefined} [props.collapsible]    If true, when multiple packages are rendered they can be toggled open and closed.
 * @param {boolean|undefined} [props.showItems]      If true, when multiple packages are rendered, you can see each package's items.
 * @param {ReactElement}      props.noResultsMessage Rendered when there are no packages.
 * @param {Function}          [props.renderOption]   Function to render a shipping rate.
 * @param {string}            [props.context]        String equal to the block name where the Slot is rendered
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
		const packageCount = getShippingRatesPackageCount( shippingRates );
		const shippingOptions = getShippingRatesRateCount( shippingRates );
		if ( packageCount === 1 ) {
			speak(
				sprintf(
					/* translators: %d number of shipping options found. */
					_n(
						'%d shipping option was found.',
						'%d shipping options were found.',
						shippingOptions,
						'woo-gutenberg-products-block'
					),
					shippingOptions
				)
			);
		} else {
			speak(
				sprintf(
					/* translators: %d number of shipping packages packages. */
					_n(
						'Shipping option searched for %d package.',
						'Shipping options searched for %d packages.',
						packageCount,
						'woo-gutenberg-products-block'
					),
					packageCount
				) +
					' ' +
					sprintf(
						/* translators: %d number of shipping options available. */
						_n(
							'%d shipping option was found',
							'%d shipping options were found',
							shippingOptions,
							'woo-gutenberg-products-block'
						),
						shippingOptions
					)
			);
		}
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

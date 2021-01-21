/**
 * External dependencies
 */
import { __, _n, sprintf } from '@wordpress/i18n';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { speak } from '@wordpress/a11y';
import LoadingMask from '@woocommerce/base-components/loading-mask';
import {
	getShippingRatesPackageCount,
	getShippingRatesRateCount,
} from '@woocommerce/base-utils';
import { useSelectShippingRate } from '@woocommerce/base-hooks';

/**
 * Internal dependencies
 */
import Package from './package';
import ExperimentalOrderShippingPackages from '../../order-shipping-packages';
import './style.scss';

/**
 * @typedef {import('react')} React
 */

/**
 * Renders the shipping rates control element.
 *
 * @param {Object} props Incoming props.
 * @param {Array} props.shippingRates Array of packages containing shipping rates.
 * @param {boolean} props.shippingRatesLoading True when rates are being loaded.
 * @param {string} props.className Class name for package rates.
 * @param {boolean} props.collapsibleWhenMultiple If true, when multiple packages are rendered they can be toggled open and closed.
 * @param {React.ReactElement} props.noResultsMessage Rendered when there are no packages.
 * @param {Function} props.renderOption Function to render a shipping rate.
 */
const ShippingRatesControl = ( {
	shippingRates,
	shippingRatesLoading,
	className,
	collapsibleWhenMultiple = false,
	noResultsMessage,
	renderOption,
} ) => {
	useEffect( () => {
		if ( shippingRatesLoading ) {
			return;
		}
		const packageCount = getShippingRatesPackageCount( shippingRates );
		const shippingOptions = getShippingRatesRateCount( shippingRates );
		if ( shippingOptions === 0 ) {
			speak(
				__(
					'No shipping options were found.',
					'woo-gutenberg-products-block'
				)
			);
		} else if ( packageCount === 1 ) {
			speak(
				sprintf(
					// translators: %d number of shipping options found.
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
					// translators: %d number of shipping packages packages.
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
						// translators: %d number of shipping options available.
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
	}, [ shippingRatesLoading, shippingRates ] );

	return (
		<LoadingMask
			isLoading={ shippingRatesLoading }
			screenReaderLabel={ __(
				'Loading shipping rates…',
				'woo-gutenberg-products-block'
			) }
			showSpinner={ true }
		>
			<ExperimentalOrderShippingPackages.Slot
				className={ className }
				collapsibleWhenMultiple={ collapsibleWhenMultiple }
				noResultsMessage={ noResultsMessage }
				renderOption={ renderOption }
			/>
			<Packages
				packages={ shippingRates }
				noResultsMessage={ noResultsMessage }
			/>
		</LoadingMask>
	);
};

/**
 * Renders multiple packages within the slotfill.
 *
 * @param {Object} props Incoming props.
 * @param {Array} props.packages Array of packages.
 * @param {React.ReactElement} props.noResultsMessage Rendered when there are no packages.
 * @return {React.ReactElement|Array} Rendered components.
 */
const Packages = ( { packages, noResultsMessage } ) => {
	const { selectShippingRate, selectedShippingRates } = useSelectShippingRate(
		packages
	);

	if ( ! packages.length ) {
		return noResultsMessage;
	}

	return packages.map( ( { package_id: packageId, ...packageData } ) => (
		<ExperimentalOrderShippingPackages key={ packageId }>
			<Package
				key={ packageId }
				packageData={ packageData }
				onSelectRate={ ( newShippingRate ) => {
					selectShippingRate( newShippingRate, packageId );
				} }
				selected={ selectedShippingRates[ packageId ] }
			/>
		</ExperimentalOrderShippingPackages>
	) );
};

ShippingRatesControl.propTypes = {
	noResultsMessage: PropTypes.node.isRequired,
	renderOption: PropTypes.func,
	className: PropTypes.string,
	collapsibleWhenMultiple: PropTypes.bool,
	shippingRates: PropTypes.array,
	shippingRatesLoading: PropTypes.bool,
};

export default ShippingRatesControl;

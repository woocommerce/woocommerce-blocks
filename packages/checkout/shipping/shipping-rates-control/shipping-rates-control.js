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
import { ExperimentalOrderShippingPackages } from '@woocommerce/blocks-checkout';

/**
 * Internal dependencies
 */
import Packages from './packages';
import './style.scss';

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
				collapsibleWhenMultiple={ collapsibleWhenMultiple }
				collapsible={ shippingRates.length > 1 }
			/>
			<ExperimentalOrderShippingPackages>
				<Packages
					className={ className }
					noResultsMessage={ noResultsMessage }
					renderOption={ renderOption }
					shippingRates={ shippingRates }
				/>
			</ExperimentalOrderShippingPackages>
		</LoadingMask>
	);
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
export { Packages };

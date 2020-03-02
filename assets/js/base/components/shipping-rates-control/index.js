/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import { usePrevious } from '@woocommerce/base-hooks';

/**
 * Internal dependencies
 */
import Packages from './packages';
import LoadingMask from '../loading-mask';
import './style.scss';

const ShippingRatesControl = ( {
	shippingRates,
	shippingRatesLoading,
	className,
	noResultsMessage,
	onChange,
	renderOption,
	selected = [],
} ) => {
	const previousShippingRates = usePrevious(
		shippingRates,
		( newRates ) => newRates.length > 0
	);

	if ( shippingRatesLoading ) {
		return (
			<LoadingMask
				screenReaderLabel={ __(
					'Loading shipping rates…',
					'woo-gutenberg-products-block'
				) }
				showSpinner={ false }
			>
				<Packages
					className={ className }
					noResultsMessage={ noResultsMessage }
					onChange={ onChange }
					renderOption={ renderOption }
					selected={ selected }
					shippingRates={ previousShippingRates || shippingRates }
				/>
			</LoadingMask>
		);
	}

	return (
		<Packages
			className={ className }
			noResultsMessage={ noResultsMessage }
			onChange={ onChange }
			renderOption={ renderOption }
			selected={ selected }
			shippingRates={ shippingRates }
		/>
	);
};

ShippingRatesControl.propTypes = {
	address: PropTypes.shape( {
		address_1: PropTypes.string,
		address_2: PropTypes.string,
		city: PropTypes.string,
		state: PropTypes.string,
		postcode: PropTypes.string,
		country: PropTypes.string,
	} ),
	noResultsMessage: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	renderOption: PropTypes.func.isRequired,
	className: PropTypes.string,
	selected: PropTypes.arrayOf( PropTypes.string ),
};

export default ShippingRatesControl;
export { Packages };

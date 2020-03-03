/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { useState } from '@wordpress/element';
import { useSelectShippingRate } from '@woocommerce/base-hooks';

/**
 * Internal dependencies
 */
import Package from './package';
import './style.scss';

const Packages = ( {
	className,
	noResultsMessage,
	renderOption,
	shippingRates = [],
} ) => {
	const selectShippingRate = useSelectShippingRate();
	const initiallySelectedRates = shippingRates.map(
		( p ) => p.shipping_rates.find( ( rate ) => rate.selected ).rate_id
	);
	const [ selectedShipping, setSelectedShipping ] = useState(
		initiallySelectedRates
	);
	return shippingRates.map( ( shippingRate, i ) => (
		<Package
			key={ shippingRate.package_id }
			className={ className }
			noResultsMessage={ noResultsMessage }
			onChange={ ( newShippingRate ) => {
				setSelectedShipping( [ newShippingRate ] );
				selectShippingRate( newShippingRate, i );
			} }
			renderOption={ renderOption }
			selected={ selectedShipping[ i ] }
			shippingRate={ shippingRate }
			showItems={ shippingRates.length > 1 }
			title={ shippingRates.length > 1 ? shippingRate.name : null }
		/>
	) );
};

Packages.propTypes = {
	renderOption: PropTypes.func.isRequired,
	className: PropTypes.string,
	noResultsMessage: PropTypes.string,
	shippingRates: PropTypes.arrayOf(
		PropTypes.shape( {
			items: PropTypes.arrayOf(
				PropTypes.shape( {
					key: PropTypes.string,
					name: PropTypes.string,
					quantity: PropTypes.number,
				} )
			).isRequired,
		} ).isRequired
	).isRequired,
};

export default Packages;

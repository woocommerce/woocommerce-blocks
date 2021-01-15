/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import Package from './package';
import './style.scss';

const Packages = ( {
	className,
	collapsible = false,
	noResultsMessage = null,
	renderOption,
	shippingRates = [],
	selectShippingRate,
} ) => {
	if ( ! shippingRates.length ) {
		return noResultsMessage;
	}

	return (
		<div className="wc-block-components-shipping-rates-control">
			{ shippingRates.map(
				( { package_id: packageId, ...packageData } ) => (
					<Package
						key={ packageId }
						packageData={ packageData }
						className={ className }
						collapsible={ collapsible }
						noResultsMessage={ noResultsMessage }
						onSelectRate={ ( newShippingRate ) => {
							selectShippingRate( newShippingRate, packageId );
						} }
						renderOption={ renderOption }
						showItems={ shippingRates.length > 1 }
						title={
							shippingRates.length > 1 ? packageData.name : null
						}
					/>
				)
			) }
		</div>
	);
	/* eslint-enable */
};

Packages.propTypes = {
	renderOption: PropTypes.func.isRequired,
	className: PropTypes.string,
	collapsible: PropTypes.bool,
	noResultsMessage: PropTypes.node,
	shippingRates: PropTypes.arrayOf(
		PropTypes.shape( {
			items: PropTypes.arrayOf(
				PropTypes.shape( {
					key: PropTypes.string,
					name: PropTypes.string,
					quantity: PropTypes.number,
				} )
			).isRequired,
			package_id: PropTypes.oneOfType( [
				PropTypes.number,
				PropTypes.string,
			] ),
			name: PropTypes.string,
			destination: PropTypes.object,
			shipping_rates: PropTypes.arrayOf( PropTypes.object ),
		} ).isRequired
	).isRequired,
	selectShippingRate: PropTypes.func.isRequired,
};

export default Packages;

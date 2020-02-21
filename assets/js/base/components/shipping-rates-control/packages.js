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
	noResultsMessage,
	onChange,
	renderOption,
	selected = [],
	shippingRates,
} ) => {
	return shippingRates.map( ( shippingRate, i ) => (
		<Package
			key={ Object.keys( shippingRate.items ).join() }
			className={ className }
			noResultsMessage={ noResultsMessage }
			onChange={ ( newShippingRate ) => {
				const newSelected = [ ...selected ];
				newSelected[ i ] = newShippingRate;
				onChange( newSelected );
			} }
			renderOption={ renderOption }
			selected={ selected[ i ] }
			shippingRate={ shippingRate }
			showItems={ shippingRates.length > 1 }
		/>
	) );
};

Packages.propTypes = {
	noResultsMessage: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	renderOption: PropTypes.func.isRequired,
	className: PropTypes.string,
	selected: PropTypes.arrayOf( PropTypes.string ),
	shippingRates: PropTypes.arrayOf(
		PropTypes.shape( {
			items: PropTypes.object.isRequired,
		} ).isRequired
	).isRequired,
};

export default Packages;

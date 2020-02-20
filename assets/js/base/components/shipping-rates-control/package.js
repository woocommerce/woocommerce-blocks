/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { Fragment } from '@wordpress/element';
import { decodeEntities } from '@wordpress/html-entities';

/**
 * Internal dependencies
 */
import PackageOptions from './package-options';
import './style.scss';

const Package = ( {
	className,
	noResultsMessage,
	onChange,
	renderOption,
	selected,
	shippingRate,
	showItems,
} ) => {
	return (
		<Fragment>
			<PackageOptions
				className={ className }
				noResultsMessage={ noResultsMessage }
				onChange={ onChange }
				options={ shippingRate.shipping_rates }
				renderOption={ renderOption }
				selected={ selected }
			/>
			{ showItems && (
				<small>
					{ Object.values( shippingRate.items )
						.map(
							( v ) =>
								`${ decodeEntities( v.name ) } ×${ v.quantity }`
						)
						.join( ', ' ) }
				</small>
			) }
		</Fragment>
	);
};

Package.propTypes = {
	noResultsMessage: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	renderOption: PropTypes.func.isRequired,
	shippingRate: PropTypes.shape( {
		shipping_rates: PropTypes.arrayOf( PropTypes.object ).isRequired,
		items: PropTypes.objectOf(
			PropTypes.shape( {
				name: PropTypes.string.isRequired,
				quantity: PropTypes.number.isRequired,
			} ).isRequired
		).isRequired,
	} ).isRequired,
	className: PropTypes.string,
	selected: PropTypes.string,
	showItems: PropTypes.bool,
};

export default Package;

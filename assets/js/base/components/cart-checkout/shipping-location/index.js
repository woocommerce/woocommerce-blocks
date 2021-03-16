/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { __, sprintf } from '@wordpress/i18n';
import {
	SHIPPING_COUNTRIES,
	SHIPPING_STATES,
} from '@woocommerce/block-settings';
import { decodeEntities } from '@wordpress/html-entities';

/**
 * Shows a formatted shipping location.
 *
 * @param {Object} props Incoming props for the component.
 * @param {Object} props.address Incoming address information.
 */
const ShippingLocation = ( { address } ) => {
	// we bail early if we don't have an address.
	if ( Object.values( address ).length === 0 ) {
		return null;
	}
	const formattedCountry =
		typeof SHIPPING_COUNTRIES[ address.country ] === 'string'
			? decodeEntities( SHIPPING_COUNTRIES[ address.country ] )
			: '';

	const formattedState =
		typeof SHIPPING_STATES[ address.country ] === 'object' &&
		typeof SHIPPING_STATES[ address.country ][ address.state ] === 'string'
			? decodeEntities(
					SHIPPING_STATES[ address.country ][ address.state ]
			  )
			: address.state;

	const addressParts = [];

	addressParts.push( address.postcode.toUpperCase() );
	addressParts.push( address.city );
	addressParts.push( formattedState );
	addressParts.push( formattedCountry );

	const formattedLocation = addressParts.filter( Boolean ).join( ', ' );

	if ( ! formattedLocation ) {
		return null;
	}

	return (
		<span className="wc-block-components-shipping-address">
			{ sprintf(
				/* translators: %s location. */
				__( 'Shipping to %s', 'woo-gutenberg-products-block' ),
				formattedLocation
			) + ' ' }
		</span>
	);
};

ShippingLocation.propTypes = {
	address: PropTypes.shape( {
		city: PropTypes.string,
		state: PropTypes.string,
		postcode: PropTypes.string,
		country: PropTypes.string,
	} ),
};

export default ShippingLocation;

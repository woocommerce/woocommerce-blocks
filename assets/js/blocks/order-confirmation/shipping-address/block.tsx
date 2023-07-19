/**
 * External dependencies
 */
import { useCheckoutAddress } from '@woocommerce/base-context';
import { getSetting } from '@woocommerce/settings';
import { __ } from '@wordpress/i18n';

const Block = (): JSX.Element => {
	const { shippingAddress } = useCheckoutAddress();
	const {
		address_1: address1,
		address_2: address2,
		city,
		postcode,
		country,
		first_name: firstName,
		last_name: lastName,
		state,
		phone,
	} = shippingAddress || {};

	// Contains country names.
	const countries = getSetting< Record< string, string > >( 'countries', {} );
	const fullCountryName = countries[ country ] || country;
	const fallback = __(
		'This order has no shipping address.',
		'woo-gutenberg-products-block'
	);

	return (
		<>
			{ shippingAddress && Object.keys( shippingAddress ).length > 0 ? (
				<address>
					{ firstName } { lastName }
					<br />
					{ address1 }
					<br />
					{ address2 }
					<br />
					{ city }
					<br />
					{ state }
					<br />
					{ postcode }
					<br />
					{ fullCountryName }
					<br />
					<br />
					{ phone }
					<br />
				</address>
			) : (
				fallback
			) }
		</>
	);
};

export default Block;

/**
 * External dependencies
 */
import { useCheckoutAddress } from '@woocommerce/base-context';

const Block = (): JSX.Element => {
	const { billingAddress } = useCheckoutAddress();
	const {
		address_1: address1,
		address_2: address2,
		city,
		postcode,
		country,
		first_name: firstName,
		last_name: lastName,
		state,
		email,
		phone,
	} = billingAddress;

	return (
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
			{ country }
			<br />
			<br />
			{ phone }
			<br />
			<br />
			{ email }
			<br />
		</address>
	);
};

export default Block;

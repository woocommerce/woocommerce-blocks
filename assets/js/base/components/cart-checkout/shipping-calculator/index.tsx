/**
 * External dependencies
 */
import type { CustomerAddress } from '@woocommerce/settings';
import { useCustomerData } from '@woocommerce/base-context/hooks';

/**
 * Internal dependencies
 */
import ShippingCalculatorAddress from './address';
import './style.scss';

interface ShippingCalculatorProps {
	onUpdate?: ( newAddress: CustomerAddress ) => void;
	addressFields?: Partial< keyof CustomerAddress >[];
}

const ShippingCalculator = ( {
	onUpdate = () => {
		/* Do nothing */
	},
	addressFields = [ 'country', 'state', 'city', 'postcode' ],
}: ShippingCalculatorProps ): JSX.Element => {
	const { shippingAddress, setShippingAddress, setBillingAddress } =
		useCustomerData();
	return (
		<div className="wc-block-components-shipping-calculator">
			<ShippingCalculatorAddress
				address={ shippingAddress }
				addressFields={ addressFields }
				onUpdate={ ( newAddress ) => {
					setShippingAddress( newAddress );
					setBillingAddress( newAddress );
					onUpdate( newAddress );
				} }
			/>
		</div>
	);
};

export default ShippingCalculator;

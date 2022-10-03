/**
 * External dependencies
 */
import type { EnteredAddress } from '@woocommerce/types';
import { useCustomerData } from '@woocommerce/base-context/hooks';

/**
 * Internal dependencies
 */
import ShippingCalculatorAddress from './address';
import './style.scss';

interface ShippingCalculatorProps {
	onUpdate?: ( newAddress: EnteredAddress ) => void;
	addressFields?: Partial< keyof EnteredAddress >[];
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

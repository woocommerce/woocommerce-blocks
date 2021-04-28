/**
 * External dependencies
 */
import { useShippingDataContext } from '@woocommerce/base-context';
import type { Address } from '@woocommerce/type-defs/customer';

/**
 * Internal dependencies
 */
import ShippingCalculatorAddress from './address';
import './style.scss';

interface ShippingCalculatorProps {
	onUpdate?: ( newAddress: Address ) => void;
	addressFields?: Partial< keyof Address >[];
}

const ShippingCalculator = ( {
	onUpdate = () => {
		/* Do nothing */
	},
	addressFields = [ 'country', 'state', 'city', 'postcode' ],
}: ShippingCalculatorProps ): JSX.Element => {
	const { shippingAddress, setShippingAddress } = useShippingDataContext();
	return (
		<div className="wc-block-components-shipping-calculator">
			<ShippingCalculatorAddress
				address={ shippingAddress }
				addressFields={ addressFields }
				onUpdate={ ( newAddress ) => {
					setShippingAddress( newAddress );
					onUpdate( newAddress );
				} }
			/>
		</div>
	);
};

export default ShippingCalculator;

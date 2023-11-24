/**
 * External dependencies
 */
import type { ShippingAddress } from '@woocommerce/settings';
import { dispatch } from '@wordpress/data';
import { CART_STORE_KEY, processErrorResponse } from '@woocommerce/block-data';
import { StoreNoticesContainer } from '@woocommerce/blocks-components';

/**
 * Internal dependencies
 */
import { removeNoticesWithContext } from '~/base/utils';
import { useCustomerData } from '~/base/context/hooks';
import ShippingCalculatorAddress from './address';
import './style.scss';

interface ShippingCalculatorProps {
	onUpdate?: ( newAddress: ShippingAddress ) => void;
	onCancel?: () => void;
	addressFields?: Partial< keyof ShippingAddress >[];
}

const ShippingCalculator = ( {
	onUpdate = () => {
		/* Do nothing */
	},
	onCancel = () => {
		/* Do nothing */
	},
	addressFields = [ 'country', 'state', 'city', 'postcode' ],
}: ShippingCalculatorProps ): JSX.Element => {
	const { shippingAddress } = useCustomerData();
	const noticeContext = 'wc/cart/shipping-calculator';
	return (
		<div className="wc-block-components-shipping-calculator">
			<StoreNoticesContainer context={ noticeContext } />
			<ShippingCalculatorAddress
				address={ shippingAddress }
				addressFields={ addressFields }
				onCancel={ onCancel }
				onUpdate={ ( newAddress ) => {
					// Updates the address and waits for the result.
					dispatch( CART_STORE_KEY )
						.updateCustomerData(
							{
								shipping_address: newAddress,
							},
							false
						)
						.then( () => {
							removeNoticesWithContext( noticeContext );
							onUpdate( newAddress );
						} )
						.catch( ( response ) => {
							processErrorResponse( response, noticeContext );
						} );
				} }
			/>
		</div>
	);
};

export default ShippingCalculator;

/**
 * Internal dependencies
 */
import { SHIPPING_STATES } from '~/settings/blocks';
import StateInput from './state-input';
import type { StateInputProps } from './StateInputProps';

const ShippingStateInput = ( props: StateInputProps ): JSX.Element => {
	return <StateInput states={ SHIPPING_STATES } { ...props } />;
};

export default ShippingStateInput;

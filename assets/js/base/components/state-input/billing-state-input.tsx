/**
 * Internal dependencies
 */
import { ALLOWED_STATES } from '~/settings/blocks';
import StateInput from './state-input';
import type { StateInputProps } from './StateInputProps';

const BillingStateInput = ( props: StateInputProps ): JSX.Element => {
	return <StateInput states={ ALLOWED_STATES } { ...props } />;
};

export default BillingStateInput;

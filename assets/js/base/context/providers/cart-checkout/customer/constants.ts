/**
 * Internal dependencies
 */
import type { CustomerDataContextType } from './types';

export const defaultBillingData: CustomerDataContextType[ 'billingData' ] = {
	first_name: '',
	last_name: '',
	company: '',
	address_1: '',
	address_2: '',
	city: '',
	state: '',
	postcode: '',
	country: '',
	email: '',
	phone: '',
};

export const defaultShippingAddress: CustomerDataContextType[ 'shippingAddress' ] = {
	first_name: '',
	last_name: '',
	company: '',
	address_1: '',
	address_2: '',
	city: '',
	state: '',
	postcode: '',
	country: '',
	phone: '',
};

export interface Address {
	// eslint-disable-next-line camelcase
	first_name: string;
	// eslint-disable-next-line camelcase
	last_name: string;
	company: string;
	// eslint-disable-next-line camelcase
	address_1: string;
	// eslint-disable-next-line camelcase
	address_2: string;
	city: string;
	state: string;
	postcode: string;
	country: string;
}

export type ShippingAddress = Address;
export type BillingAddress = Address;

export interface AddressField {
	label: string;
	optionalLabel: string;
	autocomplete: string;
	autocapitalize?: 'sentences' | 'characters';
	required: boolean;
	hidden: boolean;
	index: number;
	priority?: number | string;
}

export interface AddressFields {
	// eslint-disable-next-line camelcase
	first_name: AddressField;
	// eslint-disable-next-line camelcase
	last_name: AddressField;
	company: AddressField;
	// eslint-disable-next-line camelcase
	address_1: AddressField;
	// eslint-disable-next-line camelcase
	address_2: AddressField;
	country: AddressField;
	city: AddressField;
	state: AddressField;
	postcode: AddressField;
}

export type CountryAddressFields = Record< string, AddressFields >;

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

export interface AddressFieldConfiguration {
	label: string;
	optionalLabel: string;
	autocomplete: string;
	autocapitalize?: 'sentences' | 'characters';
	required: boolean;
	hidden: boolean;
	index: number;
	priority?: number | string;
	errorMessage?: string;
}

export type KeyedAddressFieldConfiguration = AddressFieldConfiguration & {
	key: keyof AddressFields;
};

export interface AddressFields {
	// eslint-disable-next-line camelcase
	first_name: AddressFieldConfiguration;
	// eslint-disable-next-line camelcase
	last_name: AddressFieldConfiguration;
	company: AddressFieldConfiguration;
	// eslint-disable-next-line camelcase
	address_1: AddressFieldConfiguration;
	// eslint-disable-next-line camelcase
	address_2: AddressFieldConfiguration;
	country: AddressFieldConfiguration;
	city: AddressFieldConfiguration;
	state: AddressFieldConfiguration;
	postcode: AddressFieldConfiguration;
}

export type CountryAddressFields = Record< string, AddressFields >;

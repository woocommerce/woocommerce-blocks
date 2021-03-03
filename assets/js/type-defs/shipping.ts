/* eslint-disable camelcase*/

/**
 * External dependencies
 */
import type { ReactElement } from 'react';

export interface Rate {
	currency_code: string;
	currency_decimal_separator: string;
	currency_minor_unit: number;
	currency_prefix: string;
	currency_suffix: string;
	currency_symbol: string;
	currency_thousand_separator: string;
	delivery_time: string;
	description: string;
	id: number;
	meta_data: [ { key: 'Items'; value: 'Beanie &times; 2' } ];
	method_id: string;
	name: string;
	price: string;
	rate_id: string;
	selected: boolean;
	taxes: string;
}

export interface PackageRateOption {
	label: string;
	value: string;
	description?: string | ReactElement;
	secondaryLabel?: string | ReactElement;
	secondaryDescription?: string;
	id?: string;
}

interface PackageItem {
	name: string;
	key: string;
	quantity: number;
}

interface Destination {
	address_1: string;
	address_2: string;
	city: string;
	state: string;
	postcode: string;
	country: string;
}

export interface PackageProps {
	packageId: string;
	renderOption: ( option: Rate ) => PackageRateOption;
	collapse: boolean;
	packageData: {
		destination: Destination;
		name: string;
		shipping_rates: Rate[];
		items: PackageItem[];
	};
	className?: string;
	collapsible?: boolean;
	noResultsMessage: ReactElement;
	showItems: boolean;
}

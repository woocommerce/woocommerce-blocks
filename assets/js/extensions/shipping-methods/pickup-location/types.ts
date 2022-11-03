/**
 * Internal dependencies
 */
import type { SortableData } from '../shared-components';

export interface PickupLocation {
	name: string;
	details: string;
	enabled: boolean;
	address: {
		address_1: string;
		city: string;
		state: string;
		postcode: string;
		country: string;
	};
}

export interface SortablePickupLocation extends PickupLocation, SortableData {}

export type ShippingMethodSettings = {
	enabled: boolean;
	title: string;
	tax_status: string;
	cost: string;
};

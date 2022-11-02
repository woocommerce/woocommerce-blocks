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

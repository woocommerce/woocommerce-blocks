/**
 * External dependencies
 */
import {
	emptyHiddenAddressFields,
	isAddressComplete,
} from '@woocommerce/base-utils';

describe( 'emptyHiddenAddressFields', () => {
	it( "Removes state from an address where the country doesn't use states", () => {
		const address = {
			first_name: 'Jonny',
			last_name: 'Awesome',
			company: 'WordPress',
			address_1: '123 Address Street',
			address_2: 'Address 2',
			city: 'Vienna',
			postcode: '1120',
			country: 'AT',
			state: 'CA', // This should be removed.
			email: 'jonny.awesome@email.com',
			phone: '',
		};
		const filteredAddress = emptyHiddenAddressFields( address );
		expect( filteredAddress ).toHaveProperty( 'state', '' );
	} );
} );

describe( 'isAddressComplete', () => {
	it( 'correctly checks a fully empty address', () => {
		const address = {
			first_name: '',
			last_name: '',
			company: '',
			address_1: '',
			address_2: '',
			city: '',
			postcode: '',
			country: '',
			state: '',
			email: '',
			phone: '',
		};
		expect( isAddressComplete( address ) ).toBe( false );
	} );

	it( 'correctly checks a partially empty address', () => {
		const address = {
			first_name: 'Vernon',
			last_name: 'Dursley',
			company: 'Grunnings',
			address_1: '',
			address_2: '',
			city: '',
			postcode: '',
			country: '',
			state: '',
			email: 'test@gmail.com',
			phone: '+12345',
		};
		expect( isAddressComplete( address ) ).toBe( false );

		// Still incomplete as no country, city, or postcode data is present.
		address.address_1 = '4 Privet Drive';
		address.address_2 = 'Little Whinging';
		expect( isAddressComplete( address ) ).toBe( false );

		address.city = 'Surrey';
		expect( isAddressComplete( address ) ).toBe( false );

		address.postcode = 'WD25 7LR';
		address.country = 'GB';
		expect( isAddressComplete( address ) ).toBe( true );
	} );
} );

/**
 * Internal dependencies
 */
import { transformProductData } from '../products-middleware';
import {
	wooCommerceAPIResponse,
	wooCommerceBlocksStoreAPIResponse,
} from './mocks';

describe( 'transformProductData', () => {
	it( 'changes WooCommerce API response to WooCommerce Blocks Store API response', () => {
		const product0 = wooCommerceAPIResponse[ 0 ];
		const expected0 = wooCommerceBlocksStoreAPIResponse[ 0 ];

		const product1 = wooCommerceAPIResponse[ 1 ];
		const expected1 = wooCommerceBlocksStoreAPIResponse[ 1 ];

		expect( transformProductData( product0 ) ).toEqual( expected0 );
		expect( transformProductData( product1 ) ).toEqual( expected1 );
	} );
} );

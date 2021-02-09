/**
 * Internal dependencies
 */
import {
	__experimentalRegisterCheckoutFilters,
	__experimentalApplyCheckoutFilter,
} from '../';

jest.mock( '@woocommerce/block-settings', () => {
	const originalModule = jest.requireActual( '@woocommerce/settings' );
	return {
		// @ts-ignore We know @woocommerce/settings is an object.
		...originalModule,
		CURRENT_USER_IS_ADMIN: true,
	};
} );

describe( 'Checkout registry (as admin user)', () => {
	test( 'should throw if the filter throws and user is an admin', () => {
		const filterName = 'loremIpsum';
		const value = 'Hello World';
		__experimentalRegisterCheckoutFilters( filterName, {
			[ filterName ]: () => {
				throw new Error( 'test error' );
			},
		} );

		expect( () => {
			__experimentalApplyCheckoutFilter( {
				filterName,
				defaultValue: value,
			} );
		} ).toThrow();
	} );
} );

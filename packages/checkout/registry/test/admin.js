/**
 * External dependencies
 */
import { renderHook } from '@testing-library/react-hooks';
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
		const filterName = 'ErrorTestFilter';
		const value = 'Hello World';
		__experimentalRegisterCheckoutFilters( filterName, {
			[ filterName ]: () => {
				throw new Error( 'test error' );
			},
		} );

		const { result } = renderHook( () =>
			__experimentalApplyCheckoutFilter( {
				filterName,
				defaultValue: value,
			} )
		);
		expect( result.error ).toEqual( Error( 'test error' ) );
	} );

	test( 'should throw if validation throws and user is an admin', () => {
		const filterName = 'ValidationTestFilter';
		const value = 'Hello World';
		__experimentalRegisterCheckoutFilters( filterName, {
			[ filterName ]: ( val ) => val,
		} );
		const { result } = renderHook( () =>
			__experimentalApplyCheckoutFilter( {
				filterName,
				defaultValue: value,
				validation: () => {
					throw Error( 'validation error' );
				},
			} )
		);
		expect( result.error ).toEqual( Error( 'validation error' ) );
	} );
} );

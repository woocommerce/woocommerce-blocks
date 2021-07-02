/**
 * External dependencies
 */
import { render, act } from '@testing-library/react';
import { StoreNoticesWithSnackbarProvider } from '@woocommerce/base-context/providers';

/**
 * Internal dependencies
 */
import { useStoreNoticesWithSnackbar } from '../use-store-snackbar-notices';

describe( 'useStoreNoticesWithSnackbar', () => {
	function setup() {
		const returnVal = {};

		function TestComponent() {
			Object.assign( returnVal, useStoreNoticesWithSnackbar() );

			return null;
		}

		render(
			<StoreNoticesWithSnackbarProvider>
				<TestComponent />
			</StoreNoticesWithSnackbarProvider>
		);

		return returnVal;
	}

	test( 'allows adding and removing notices and checking if there are notices of a specific type', () => {
		const storeNoticesData = setup();

		// Assert initial state.
		expect( storeNoticesData.notices ).toEqual( [] );
		expect( storeNoticesData.hasNoticesOfType( 'default' ) ).toBe( false );
		expect( storeNoticesData.hasNoticesOfType( 'snackbar' ) ).toBe( false );

		// Add error notice.
		act( () => {
			storeNoticesData.addErrorNotice( 'Error notice' );
		} );

		expect( storeNoticesData.notices.length ).toBe( 1 );
		expect( storeNoticesData.hasNoticesOfType( 'default' ) ).toBe( true );
		expect( storeNoticesData.hasNoticesOfType( 'snackbar' ) ).toBe( false );

		// Add snackbar notice.
		act( () => {
			storeNoticesData.addSnackbarNotice( 'Snackbar notice' );
		} );

		expect( storeNoticesData.notices.length ).toBe( 2 );
		expect( storeNoticesData.hasNoticesOfType( 'default' ) ).toBe( true );
		expect( storeNoticesData.hasNoticesOfType( 'snackbar' ) ).toBe( true );

		// Remove error notice.
		act( () => {
			storeNoticesData.removeNotices( 'error' );
		} );

		expect( storeNoticesData.notices.length ).toBe( 1 );
		expect( storeNoticesData.hasNoticesOfType( 'default' ) ).toBe( false );
		expect( storeNoticesData.hasNoticesOfType( 'snackbar' ) ).toBe( true );

		// Remove all remaining notices.
		act( () => {
			storeNoticesData.removeNotices();
		} );

		expect( storeNoticesData.notices.length ).toBe( 0 );
		expect( storeNoticesData.hasNoticesOfType( 'default' ) ).toBe( false );
		expect( storeNoticesData.hasNoticesOfType( 'snackbar' ) ).toBe( false );
	} );
} );

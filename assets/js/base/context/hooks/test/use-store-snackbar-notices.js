/**
 * External dependencies
 */
import { render, act } from '@testing-library/react';

/**
 * Internal dependencies
 */
import { useStoreSnackbarNotices } from '../use-store-snackbar-notices';
import { StoreSnackbarNoticesProvider } from '../../providers/store-snackbar-notices';

describe( 'useStoreNoticesWithSnackbar', () => {
	function setup() {
		const returnVal = {};

		function TestComponent() {
			Object.assign( returnVal, useStoreSnackbarNotices() );

			return null;
		}

		render(
			<StoreSnackbarNoticesProvider>
				<TestComponent />
			</StoreSnackbarNoticesProvider>
		);

		return returnVal;
	}

	test( 'allows adding and removing notices and checking if there are notices of a specific type', () => {
		const storeNoticesData = setup();

		// Assert initial state.
		expect( storeNoticesData.notices ).toEqual( [] );

		// Add snackbar notice.
		act( () => {
			storeNoticesData.addSnackbarNotice( 'Snackbar notice' );
		} );

		expect( storeNoticesData.notices.length ).toBe( 1 );

		// Remove all remaining notices.
		act( () => {
			storeNoticesData.removeNotices();
		} );

		expect( storeNoticesData.notices.length ).toBe( 0 );
	} );
} );

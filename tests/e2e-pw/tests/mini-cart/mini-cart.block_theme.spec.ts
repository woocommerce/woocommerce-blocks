/**
 * External dependencies
 */
import { test, expect } from '@woocommerce/e2e-playwright-utils';

test.describe( 'test', () => {
	test( `flaky test`, ( {}, testInfo ) => {
		if ( testInfo.retry > 0 ) {
			expect( true ).toBe( true );
		}
		expect( true ).toBe( false );
	} );
} );

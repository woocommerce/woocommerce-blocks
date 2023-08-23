/**
 * External dependencies
 */
import { test as Test } from '@wordpress/e2e-test-utils-playwright';

const getFreshSession = () => {
	return {
		cookies: [],
		origins: [],
	};
};

export const useIncognito = ( test: typeof Test ) => {
	test.use( {
		storageState: getFreshSession(),
	} );
};

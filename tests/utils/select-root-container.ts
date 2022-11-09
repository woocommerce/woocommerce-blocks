/**
 * External dependencies
 */
import { canvas } from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
import SELECTORS from './selectors';

export const selectRootContainer = async () => {
	await canvas().click( SELECTORS.rootContainer );
};

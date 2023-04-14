/**
 * External dependencies
 */
import { PlaywrightWorkerArgs } from '@playwright/test/types/test';

/**
 * Gets a page which is logged in with an admin session. This is what a merchant will see.
 */
export const getMerchantPage = async (
	browser: PlaywrightWorkerArgs[ 'browser' ]
) => {
	const context = await browser.newContext( {
		storageState: process.env.ADMINSTATE,
	} );
	return await context.newPage();
};

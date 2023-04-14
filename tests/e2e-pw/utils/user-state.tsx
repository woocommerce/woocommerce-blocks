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

/**
 * Gets a page logged in with a user session. This is a shopper who has logged into their account.
 */
export const getShopperPage = async (
	browser: PlaywrightWorkerArgs[ 'browser' ]
) => {
	const context = await browser.newContext( {
		storageState: process.env.CUSTOMERSTATE,
	} );
	return await context.newPage();
};

/**
 * Gets a page not logged in with any session. This will be a shopper who has not logged into their account yet.
 */
export const getLoggedOutShopperPage = async (
	browser: PlaywrightWorkerArgs[ 'browser' ]
) => {
	const context = await browser.newContext( {
		storageState: null,
	} );
	return await context.newPage();
};

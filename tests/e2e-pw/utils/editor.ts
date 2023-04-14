/**
 * External dependencies
 */
import { PlaywrightTestArgs } from '@playwright/test/types/test';

/**
 * Toggles the global inserter.
 */
export async function toggleGlobalBlockInserter(
	page: PlaywrightTestArgs[ 'page' ]
) {
	// "Add block" selector is required to make sure performance comparison
	// doesn't fail on older branches where we still had "Add block" as label.
	await page.click(
		'.edit-post-header [aria-label="Add block"],' +
			'.edit-site-header [aria-label="Add block"],' +
			'.edit-post-header [aria-label="Toggle block inserter"],' +
			'.edit-site-header [aria-label="Toggle block inserter"],' +
			'.edit-widgets-header [aria-label="Add block"],' +
			'.edit-widgets-header [aria-label="Toggle block inserter"],' +
			'.edit-site-header-edit-mode__inserter-toggle'
	);
}

/**
 * Checks if the global inserter is open.
 *
 * @return {Promise<boolean>} Whether the inserter is open or not.
 */
async function isGlobalInserterOpen( page: PlaywrightTestArgs[ 'page' ] ) {
	return await page.evaluate( () => {
		// "Add block" selector is required to make sure performance comparison
		// doesn't fail on older branches where we still had "Add block" as
		// label.
		return !! document.querySelector(
			'.edit-post-header [aria-label="Add block"].is-pressed,' +
				'.edit-site-header-edit-mode [aria-label="Add block"].is-pressed,' +
				'.edit-post-header [aria-label="Toggle block inserter"].is-pressed,' +
				'.edit-site-header [aria-label="Toggle block inserter"].is-pressed,' +
				'.edit-widgets-header [aria-label="Toggle block inserter"].is-pressed,' +
				'.edit-widgets-header [aria-label="Add block"].is-pressed,' +
				'.edit-site-header-edit-mode__inserter-toggle.is-pressed'
		);
	} );
}

/**
 * Opens the global inserter.
 */
export async function openGlobalBlockInserter(
	page: PlaywrightTestArgs[ 'page' ]
) {
	if ( ! ( await isGlobalInserterOpen( page ) ) ) {
		await toggleGlobalBlockInserter( page ); // Waiting here is necessary because sometimes the inserter takes more
		// time to render than Puppeteer takes to complete the 'click' action.

		await page.waitForSelector( '.block-editor-inserter__menu' );
	}
}
/**
 * Closes the global inserter.
 */
export async function closeGlobalBlockInserter(
	page: PlaywrightTestArgs[ 'page' ]
) {
	if ( await isGlobalInserterOpen( page ) ) {
		await toggleGlobalBlockInserter( page );
	}
}

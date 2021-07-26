/**
 * External dependencies
 */
import {
	openGlobalBlockInserter,
	pressKeyWithModifier,
	focusSelectedBlock,
	waitForInserterCloseAndContentFocus,
} from '@wordpress/e2e-test-utils';

const INSERTER_SEARCH_SELECTOR =
	'.components-search-control__input,.block-editor-inserter__search input,.block-editor-inserter__search-input,input.block-editor-inserter__search';

/**
 * Search for block in the global inserter.
 *
 * @see https://github.com/WordPress/gutenberg/blob/2356b2d3165acd0af980d52bc93fb1e42748bb25/packages/e2e-test-utils/src/inserter.js#L95
 *
 * @param {string} searchTerm The text to search the inserter for.
 */
export async function searchForBlock( searchTerm ) {
	await openGlobalBlockInserter();
	await page.waitForSelector( INSERTER_SEARCH_SELECTOR );
	await page.focus( INSERTER_SEARCH_SELECTOR );
	await pressKeyWithModifier( 'primary', 'a' );
	await page.keyboard.type( searchTerm );
}

/**
 * Opens the inserter, searches for the given term, then selects the first
 * result that appears. It then waits briefly for the block list to update.
 *
 * @param {string} searchTerm The text to search the inserter for.
 */
export async function insertBlock( searchTerm ) {
	await searchForBlock( searchTerm );
	const insertButton = await page.waitForXPath(
		`//button//span[contains(text(), '${ searchTerm }')]`
	);
	await insertButton.click();
	await focusSelectedBlock();
	// We should wait until the inserter closes and the focus moves to the content.
	await waitForInserterCloseAndContentFocus();
}

/**
 * Opens the inserter, searches for the given term, then selects the first
 * result that appears.
 *
 * @param {string} searchTerm The text to search the inserter for.
 */
export async function insertBlockDontWaitForInsertClose( searchTerm ) {
	await searchForBlock( searchTerm );
	const insertButton = (
		await page.$x( `//button//span[contains(text(), '${ searchTerm }')]` )
	 )[ 0 ];
	await insertButton.click();
}

export const closeInserter = async () => {
	if (
		await page.evaluate( () => {
			return !! document.querySelector(
				'.edit-post-header [aria-label="Add block"]'
			);
		} )
	) {
		await page.click( '.edit-post-header [aria-label="Add block"]' );
		return;
	}
	await page.click(
		'.edit-post-header [aria-label="Toggle block inserter"]'
	);
};

/**
 * External dependencies
 */
import {
	disableSiteEditorWelcomeGuide,
	openGlobalBlockInserter,
	pressKeyWithModifier,
	visitAdminPage,
	visitSiteEditor,
} from '@wordpress/e2e-test-utils';
import { WP_ADMIN_DASHBOARD } from '@woocommerce/e2e-utils';

/**
 * @typedef {import('@types/puppeteer').Page} Page
 * @typedef {import('@types/puppeteer').ElementHandle} ElementHandle
 */

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
	await page.waitForSelector( INSERTER_SEARCH_SELECTOR );
	await page.focus( INSERTER_SEARCH_SELECTOR );
	await pressKeyWithModifier( 'primary', 'a' );
	await page.keyboard.type( searchTerm );
}

/**
 * Opens the inserter, searches for the given term, then selects the first
 * result that appears.
 *
 * @param {string} searchTerm The text to search the inserter for.
 */
export async function insertBlockDontWaitForInsertClose( searchTerm ) {
	await openGlobalBlockInserter();
	await searchForBlock( searchTerm );
	const insertButton = (
		await page.$x( `//button//span[text()='${ searchTerm }']` )
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

const WP_ADMIN_WIDGETS_EDITOR = WP_ADMIN_DASHBOARD + 'widgets.php';

export const openWidgetEditor = async () => {
	await page.goto( WP_ADMIN_WIDGETS_EDITOR, {
		waitUntil: 'networkidle0',
	} );
};

export const closeModalIfExists = async () => {
	if (
		await page.evaluate( () => {
			return !! document.querySelector( '.components-modal__header' );
		} )
	) {
		await page.click(
			'.components-modal__header [aria-label="Close dialog"]'
		);
	}
};

export const openWidgetsEditorBlockInserter = async () => {
	await page.click(
		'.edit-widgets-header [aria-label="Add block"],.edit-widgets-header [aria-label="Toggle block inserter"]'
	);
};

export const isBlockInsertedInWidgetsArea = async ( blockName ) => {
	const widgetAreaSelector = '.wp-block-widget-area';

	const widgetsArea = await page.$$( widgetAreaSelector );

	return widgetsArea.some(
		async ( widgetArea ) =>
			( await widgetArea.$$( `[data-block-title="${ blockName }"]` )
				.length ) > 0
	);
};
/**
 * Visits the Site Editor main page in Core WordPress
 *
 * There are two different possible site editor pages:
 *
 * 1. `themes.php?page=gutenberg-edit-site` is the one used and available if the Gutenberg plugin is enabled.
 * 2. `site-editor.php` is the one available in WP Core.
 *
 * @param {string} query String to be serialized as query portion of URL.
 * @param {'core' | 'gutenberg'} [editorContext='core'] Whether to go to the Gutenberg URL or the Core one.
 */
export async function goToSiteEditor( query, editorContext = 'core' ) {
	if ( editorContext === 'gutenberg' ) {
		await visitSiteEditor( query );
	} else {
		await visitAdminPage( 'site-editor.php', query );
		await disableSiteEditorWelcomeGuide();
	}
}

/**
 * Gets the text value of an element
 *
 * If the element is an `input` it will get the `value`, otherwise,
 * it will get the `textContent`.
 *
 * @param {string} selector The selector of the desired element
 * @param {Page | ElementHandle} [root=page] The root from which to search for the selector
 *
 * @return {Promise<string[]>} An array of text contained in those selected elements
 */
export async function getTextContent( selector, root = page ) {
	return root.$$eval( selector, ( $elements ) => {
		return $elements.map(
			( $element ) => $element.value || $element.textContent
		);
	} );
}

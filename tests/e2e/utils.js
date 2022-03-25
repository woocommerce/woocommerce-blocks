/**
 * External dependencies
 */
import config from 'config';
import {
	activateTheme,
	disableSiteEditorWelcomeGuide,
	openGlobalBlockInserter,
	pressKeyWithModifier,
	switchUserToAdmin,
	visitAdminPage,
} from '@wordpress/e2e-test-utils';
import { addQueryArgs } from '@wordpress/url';
import { WP_ADMIN_DASHBOARD } from '@woocommerce/e2e-utils';
import fs from 'fs';

/**
 * Internal dependencies
 */
import { elementExists, getElementData, getTextContent } from './page-utils';
import { PERFORMANCE_REPORT_FILENAME } from '../utils/constants';

/**
 * @typedef {import('@types/puppeteer').ElementHandle} ElementHandle
 * @typedef {import('@wordpress/blocks').Block} WPBlock
 */

/**
 * @typedef {{ addedBy: string, hasActions: boolean, templateTitle: string }} TemplateTableItem
 */

export const BASE_URL = config.get( 'url' );
export const GUTENBERG_EDITOR_CONTEXT =
	process.env.GUTENBERG_EDITOR_CONTEXT || 'core';
export const DEFAULT_TIMEOUT = 30000;

const SELECTORS = {
	canvas: 'iframe[name="editor-canvas"]',
	inserter: {
		search:
			'.components-search-control__input,.block-editor-inserter__search input,.block-editor-inserter__search-input,input.block-editor-inserter__search',
	},
	templatesListTable: {
		actionsContainer: '.edit-site-list-table__actions',
		cells: '.edit-site-list-table-column',
		headings: 'thead th.edit-site-list-table-column',
		root: '.edit-site-list-table',
		rows: '.edit-site-list-table-row',
		templateTitle: '[data-wp-component="Heading"]',
	},
	themesPage: {
		currentTheme: '.theme.active',
	},
	toolbar: {
		confirmSave: '.editor-entities-saved-states__save-button',
		saveButton: '.edit-site-save-button__button',
		savePrompt: '.entities-saved-states__text-prompt',
	},
};

/**
 * Search for block in the global inserter.
 *
 * @see https://github.com/WordPress/gutenberg/blob/2356b2d3165acd0af980d52bc93fb1e42748bb25/packages/e2e-test-utils/src/inserter.js#L95
 *
 * @param {string} searchTerm The text to search the inserter for.
 */
export async function searchForBlock( searchTerm ) {
	await page.waitForSelector( SELECTORS.inserter.search );
	await page.focus( SELECTORS.inserter.search );
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
 * 1. `themes.php?page=gutenberg-edit-site` this is a legacy editor access used for WP <=5.8.
 * 2. `site-editor.php` is the new way of accessing the editor in WP >=5.9+.
 *
 * @param {string} query String to be serialized as query portion of URL.
 * @param {'core' | 'gutenberg'} [editorContext='core'] Whether to go to the Gutenberg URL or the Core one.
 */
export async function goToSiteEditor(
	query,
	editorContext = GUTENBERG_EDITOR_CONTEXT
) {
	// There is a bug in Gutenberg/WPCore now that makes it impossible to rely on site-editor.php on setups
	// with locally installed Gutenberg. Details in https://github.com/WordPress/gutenberg/issues/39639.
	// TODO: Update to always use site-editor.php once WordPress 6.0 is released and fix is verified.
	// 		 Remove usage of GUTENBERG_EDITOR_CONTEXT from from here and from workflows.

	let editorPath = 'site-editor.php';
	let queryString = query;

	if ( editorContext === 'gutenberg' ) {
		editorPath = 'themes.php';
		queryString = addQueryArgs( queryString, {
			page: 'gutenberg-edit-site',
		} );
	}

	await visitAdminPage( editorPath, queryString );
	await disableSiteEditorWelcomeGuide();
}

/**
 * Waits for the Gutenberg canvas to be available
 *
 * @param {number} [timeout=DEFAULT_TIMEOUT] The amount of ms to wait for the element
 *
 * @return {Promise<?ElementHandle>} The canvas element handle
 */
export function waitForCanvas( timeout = DEFAULT_TIMEOUT ) {
	return page.waitForSelector( SELECTORS.canvas, { timeout } );
}

/**
 * Saves a template
 */
export async function saveTemplate() {
	const { confirmSave, saveButton, savePrompt } = SELECTORS.toolbar;

	await page.click( saveButton );
	await page.waitForSelector( savePrompt );

	await page.click( confirmSave );
	await page.waitForSelector( `${ saveButton }[aria-disabled="true"]` );
	await page.waitForResponse( ( res ) => {
		// Will match both templates and template_parts endpoints.
		return res.url().includes( '/wp/v2/template' );
	} );
}

/**
 * Gets all available templates from the template list table UI
 *
 * @return {Promise<TemplateTableItem[]>} A promise of an array of informations about the templates extracted from the UI
 */
export async function getAllTemplates() {
	const { templatesListTable } = SELECTORS;

	await page.waitForSelector( templatesListTable.root );
	const table = await page.$( templatesListTable.root );

	if ( ! table ) throw new Error( 'Templates table not found' );

	const rows = await table.$$( templatesListTable.rows );

	return Promise.all(
		rows.map( async ( row ) => ( {
			addedBy: (
				await getTextContent( templatesListTable.cells, row )
			 )[ 1 ],
			hasActions: await elementExists(
				templatesListTable.actionsContainer,
				row
			),
			templateTitle: (
				await getTextContent( templatesListTable.templateTitle, row )
			 )[ 0 ],
		} ) )
	);
}

/**
 * Gets all the blocks that fulfill a given predicate
 *
 * @param {( block: WPBlock ) => boolean} predicate The function invoked per iteration
 * @return {Promise< Partial< WPBlock >[] >} The blocks which have been found
 */
export async function filterCurrentBlocks( predicate ) {
	/**
	 * @type {WPBlock[]}
	 */
	const blocks = await page.evaluate( () => {
		/**
		 * Gets all serializeable data from a block
		 *
		 * @param {WPBlock} block A Gutenberg Block
		 * @return {Partial<WPBlock>} A block with unserializeable values turned to `null`
		 */
		function getSerializeableBlockData( block ) {
			return JSON.parse( JSON.stringify( block ) );
		}

		const blockEditorStore = window.wp.data.select( 'core/block-editor' );
		/**
		 * @type {string[]}
		 */
		const allClientIds = blockEditorStore.getClientIdsWithDescendants();

		return allClientIds.map( ( id ) =>
			getSerializeableBlockData( blockEditorStore.getBlock( id ) )
		);
	} );

	return blocks.filter( predicate );
}

/**
 * Sets up a suite to use a theme without side-effects
 *
 * *Note:* this “hook” is supposed to be used within `describe` calls to
 * make it easier to set theme dependencies for tests without messing
 * the environment of any other test and to explicitly declare a
 * dependency.
 *
 * @param {string} themeSlug The theme the test suite should use
 */
export function useTheme( themeSlug ) {
	let previousTheme;

	beforeAll( async () => {
		await switchUserToAdmin();
		await visitAdminPage( 'themes.php' );

		previousTheme = await getElementData(
			SELECTORS.themesPage.currentTheme,
			'slug'
		);

		await activateTheme( themeSlug );
	} );

	afterAll( async () => {
		await activateTheme( previousTheme );
	} );
}

/**
 * Takes an average value of all items in an array.
 *
 * @param {Array} array An array of numbers to take an average from.
 * @return {number} The average value of all members of the array.
 */
const average = ( array ) => array.reduce( ( a, b ) => a + b ) / array.length;

/**
 * Writes a line to the e2e performance result for the current test containing longest, shortest, and average run times.
 *
 * @param {string} description Message to describe what you're logging the performance of.
 * @param {Array} times array of times to record.
 */
export const logPerformanceResult = ( description, times ) => {
	const roundedTimes = times.map(
		( time ) => Math.round( time + Number.EPSILON * 100 ) / 100
	);
	fs.appendFileSync(
		PERFORMANCE_REPORT_FILENAME,
		JSON.stringify( {
			description,
			longest: Math.max( ...roundedTimes ),
			shortest: Math.min( ...roundedTimes ),
			average: average( roundedTimes ),
		} ) + '\n'
	);
};

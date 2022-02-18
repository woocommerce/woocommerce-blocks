/**
 * External dependencies
 */
import {
	openGlobalBlockInserter,
	pressKeyWithModifier,
} from '@wordpress/e2e-test-utils';
import { WP_ADMIN_DASHBOARD } from '@woocommerce/e2e-utils';

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
 *
 * @param {Array} taxRates - An array of tax objects, usually from e2e fixture data
 * @param {string} country - A shortcode for the country to apply taxes for
 * @param {Array} products - products to calculate taxes for
 * @return {Object} of the form: { labbel: 'VAT', value: '$12.30' }
 */
export function getExpectedTaxes( taxRates, country, products = [] ) {
	const taxRatesForCountry = taxRates.filter(
		( taxRate ) => taxRate.country === country
	);

	const total = products.reduce(
		( previous, current ) =>
			parseFloat( previous.regular_price ) +
			parseFloat( current.regular_price ),
		{ regular_price: 0 }
	);

	return taxRatesForCountry.map( ( taxRate ) => {
		const taxCalc = (
			parseFloat( total ) *
			( parseFloat( taxRate.rate ) / 100 )
		).toFixed( 2 );

		return { label: taxRate.name, value: `$${ taxCalc }` };
	} );
}

/**
 * Return the taxes from the checkout or cart pages as an array of objects
 * that can be used in comparison operations
 *
 * @return {Object} of the form: { labbel: 'VAT', value: '$12.30' }
 */
export async function getTaxesFromCurrentPage() {
	return await page.$$eval(
		'.wc-block-components-totals-taxes .wc-block-components-totals-item',
		( nodes ) =>
			nodes.map( ( node ) => {
				const label = node.querySelector(
					'.wc-block-components-totals-item__label'
				)?.innerText;
				const value = node.querySelector(
					'.wc-block-components-totals-item__value'
				)?.innerText;
				return { label, value };
			} )
	);
}

export async function sleep( seconds ) {
	return await new Promise( ( resolve ) =>
		setTimeout( resolve, seconds * 1000 )
	);
}

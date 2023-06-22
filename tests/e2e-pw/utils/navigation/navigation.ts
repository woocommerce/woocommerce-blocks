/**
 * External dependencies
 */
import { PlaywrightTestArgs } from '@playwright/test';
import { BlockData } from '@woocommerce/e2e-types';

/**
 * Closes any modals in the editor if they are open.
 */
export const closeModalIfExists = async (
	page: PlaywrightTestArgs[ 'page' ]
) => {
	// The modal close button can have different aria-labels, depending on the version of Gutenberg/WP.
	// Newer versions (WP >=6.2) use `Close`, while older versions (WP <6.1) use `Close dialog`.
	const closeButton = await page.$(
		'.components-modal__header [aria-label="Close"], .components-modal__header [aria-label="Close dialog"]'
	);
	if ( closeButton ) {
		await closeButton.click();
	}
};

/**
 * Goes to the edit page of a specified block.
 */
export const editBlockPage = async (
	page: PlaywrightTestArgs[ 'page' ],
	{ title, selectors }: BlockData
) => {
	const {
		editor: { block: blockSelector },
	} = selectors;
	await page.goto(
		`/wp-admin/edit.php?post_type=page&s=${ encodeURIComponent( title ) }`
	);

	// This is the link to the edit page of the block, this is the page's title.
	await page
		.getByRole( 'link', { name: `“${ title } block” (Edit)` } )
		.click();

	await page.waitForLoadState( 'networkidle' );
	await page.waitForSelector( blockSelector );
	await closeModalIfExists( page );
};

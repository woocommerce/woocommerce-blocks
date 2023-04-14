/**
 * External dependencies
 */
import { PlaywrightTestArgs } from '@playwright/test/types/test';

/**
 * Internal dependencies
 */
import { BlockTestingProperties } from '../types';

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
	{ title, selector }: BlockTestingProperties
) => {
	await page.goto(
		`/wp-admin/edit.php?post_type=page&s=${ encodeURIComponent( title ) }`
	);

	// This is the link to the edit page of the block, this is the page's title.
	await page
		.getByLabel( `“${ title }” (Edit)` )
		.getByText( title, { exact: true } )
		.click();
	await page.waitForLoadState( 'networkidle' );
	await page.waitForSelector( selector );
	await closeModalIfExists( page );
};

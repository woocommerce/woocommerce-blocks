/**
 * External dependencies
 */
import { PlaywrightTestArgs } from '@playwright/test/types/test';

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

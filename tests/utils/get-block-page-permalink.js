/**
 * External dependencies
 */
import {
	ensureSidebarOpened,
	findSidebarPanelToggleButtonWithTitle,
} from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
import { visitBlockPage } from './visit-block-page';

/**
 * Gets the permalink of a page where the block editor is in use.
 *
 * @param {string} blockPage The name of the page whose permalink you want to get.
 * @return {Promise<string>} Returns the permalink of the page.
 */
export async function getBlockPagePermalink( blockPage ) {
	await visitBlockPage( blockPage );
	await ensureSidebarOpened();
	const panelButton = await findSidebarPanelToggleButtonWithTitle(
		'Permalink'
	);

	const ensureLinkClickable = async ( page ) => {
		let linkVisible =
			( await page.$( '.edit-post-post-link__link' ) ) !== null;
		do {
			if ( ! linkVisible ) {
				await panelButton.click( 'button' );
			}
			linkVisible =
				( await page.$( '.edit-post-post-link__link' ) ) !== null;
		} while ( ! linkVisible );
	};

	await ensureLinkClickable( page );

	await page.waitForSelector( '.edit-post-post-link__link' );
	return await page.$eval( '.edit-post-post-link__link', ( el ) =>
		el.getAttribute( 'href' )
	);
}

export default getBlockPagePermalink;

/**
 * External dependencies
 */
import {
	ensureSidebarOpened,
	findSidebarPanelToggleButtonWithTitle,
	findSidebarPanelWithTitle,
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
	//check if the panel is closed
	const panelClosed =
		( await page.$( '.edit-post-post-link__link' ) ) === null;
	if ( panelClosed ) {
		await panelButton.click();
	}
	await page.waitForSelector( '.edit-post-post-link__link' );
	const panelTitleBar = await findSidebarPanelWithTitle( 'Permalink' );
	// Get the actual panel that contains the link
	const panel = ( await panelTitleBar.$x( '..' ) )[ 0 ];
	return await panel.$eval( '.edit-post-post-link__link', ( el ) =>
		el.getAttribute( 'href' )
	);
}

export default getBlockPagePermalink;

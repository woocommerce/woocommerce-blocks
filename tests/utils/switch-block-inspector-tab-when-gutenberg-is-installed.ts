/**
 * External dependencies
 */
import {
	ensureSidebarOpened,
	switchBlockInspectorTab,
} from '@wordpress/e2e-test-utils';

export const switchBlockInspectorTabWhenGutenbergIsInstalled = async (
	tabName: string
) => {
	// Open the sidebar in case it was closed.
	await ensureSidebarOpened();

	const blockButton = await page.waitForXPath(
		"//button[contains(text(), 'Block')]"
	);
	if ( ! blockButton ) {
		throw new Error( `Could not find Block button` );
	}
	blockButton?.click();

	// Switch to the tab.
	await switchBlockInspectorTab( tabName );
};

/**
 * External dependencies
 */
import { switchBlockInspectorTab } from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
import { openSettingsSidebar } from '../e2e/utils.js';

export const switchBlockInspectorTabWhenGutenbergIsInstalled = async (
	tabName: string
) => {
	// Open the sidebar in case it was closed.
	await openSettingsSidebar();

	// Switch to the tab.
	await switchBlockInspectorTab( tabName );
};

/**
 * External dependencies
 */
import { switchBlockInspectorTab } from '@wordpress/e2e-test-utils';

export const switchBlockInspectorTabWhenGutenbergIsInstalled = async (
	tabName: string
) => {
	await switchBlockInspectorTab( tabName );
};

/**
 * External dependencies
 */
import { canvas } from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
import SELECTORS from './selectors';

/**
 * Click on the top left of editor wrapper, the side effect is unfocusing the
 * selected block.
 */
export const selectEditorWrapper = async () => {
	const wrapper = await canvas().waitForSelector( SELECTORS.editorWrapper );
	// Find its coordinates
	const rect = await canvas().evaluate( ( el ) => {
		const { x, y } = el.getBoundingClientRect();
		return { x, y };
	}, wrapper );
	await canvas().mouse.click( rect.x, rect.y );
};

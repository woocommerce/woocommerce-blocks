/**
 * External dependencies
 */
import { publishPost } from '@wordpress/e2e-test-utils';

export async function saveOrPublish( retry = 0 ) {
	const link = await page.evaluate( () =>
		wp.data.select( 'core/editor' ).getPermalink()
	);
	if ( link.match( 'auto-draft' ) ) {
		await publishPost();
	} else {
		const publishButton = await page.$(
			'.editor-post-publish-button.editor-post-publish-button__button:not([aria-disabled="true"])'
		);
		if ( publishButton ) {
			await publishButton.click();
			// A success notice should show up
			await page.waitForSelector( '.components-snackbar' );
		} else if ( retry < 5 ) {
			await page.waitForTimeout( 1000 );
			await saveOrPublish( retry + 1 );
		}
	}
}

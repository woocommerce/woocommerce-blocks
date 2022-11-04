/**
 * External dependencies
 */
import { publishPost } from '@wordpress/e2e-test-utils';

export async function saveOrPublish() {
	const link = await page.evaluate( () =>
		wp.data.select( 'core/editor' ).getPermalink()
	);
	if ( link.match( 'auto-draft' ) ) {
		await publishPost();
	} else {
		const publishButton = await page.waitForSelector(
			'.editor-post-publish-button.editor-post-publish-button__button:not([aria-disabled="true"])'
		);
		if ( publishButton ) {
			await publishButton.click();
			// A success notice should show up
			try {
				await page.waitForSelector( '.components-snackbar' );
			} catch ( e ) {
				// If the notice doesn't show up, it's probably because there's a race condition
				// with the publish button being disabled at the time clicking it. In that case,
				// we click the publich button again.
				await publishButton.click();
				await page.waitForSelector( '.components-snackbar' );
			}
		}
	}
}

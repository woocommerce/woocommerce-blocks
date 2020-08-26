export async function closeInserter() {
	await page.click( '.edit-post-header [aria-label="Add block"]' );
}

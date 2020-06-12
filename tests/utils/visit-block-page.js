/**
 * External dependencies
 */
import {
	createNewPost,
	visitAdminPage,
	insertBlock,
	getEditedPostContent,
} from '@wordpress/e2e-test-utils';
import { outputFile } from 'fs-extra';
import { dirname } from 'path';
import kebabCase from 'lodash/kebabCase';

async function visitPage( link ) {
	await page.goto( link );
	const isWelcomeGuideActive = await page.evaluate( () =>
		wp.data.select( 'core/edit-post' ).isFeatureActive( 'welcomeGuide' )
	);

	if ( isWelcomeGuideActive ) {
		await page.evaluate( () =>
			wp.data.dispatch( 'core/edit-post' ).toggleFeature( 'welcomeGuide' )
		);
	}
}
export async function visitBlockPage( title ) {
	let link = '';
	// Visit Import Products page.
	await visitAdminPage( 'edit.php', 'post_type=page' );
	// search for the page.
	if ( await page.$( '#post-search-input' ) ) {
		await page.type( '#post-search-input', title );
		await page.click( '#search-submit', { waitUntil: 'domcontentloaded' } );
		const pageLink = await page.$x( `//a[contains(text(), '${ title }')]` );
		if ( ( await pageLink.length ) > 0 ) {
			link = await page.evaluate(
				( a ) => a.getAttribute( 'href' ),
				pageLink[ 0 ]
			);
		}
	}
	if ( link ) {
		await visitPage( link );
	} else {
		await createNewPost( { postType: 'page', title } );
		await insertBlock( title.replace( /block/i, '' ).trim() );
		const pageContent = await getEditedPostContent();
		await outputFile(
			`${ dirname(
				module.parent.parent.filename ||
					module.parent.filename ||
					module.filename
			) }/__fixtures__/${ kebabCase(
				title.replace( /block/i, '' ).trim()
			) }.fixture.json`,
			JSON.stringify( {
				title,
				pageContent,
			} )
		);
	}
}

export default visitBlockPage;

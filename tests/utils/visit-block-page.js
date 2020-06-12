/* eslint-disable no-console */
/**
 * External dependencies
 */
import {
	createNewPost,
	visitAdminPage,
	insertBlock,
	getEditedPostContent,
	publishPost,
} from '@wordpress/e2e-test-utils';
import { outputFile } from 'fs-extra';
import { dirname } from 'path';
import kebabCase from 'lodash/kebabCase';

async function visitPage( link ) {
	await page.goto( link );
	const isWelcomeGuideActive = await page.evaluate( () =>
		wp.data.select( 'core/edit-post' ).isFeatureActive( 'welcomeGuide' )
	);
	const isFullscreenMode = await page.evaluate( () =>
		wp.data.select( 'core/edit-post' ).isFeatureActive( 'fullscreenMode' )
	);

	if ( isWelcomeGuideActive ) {
		await page.evaluate( () =>
			wp.data.dispatch( 'core/edit-post' ).toggleFeature( 'welcomeGuide' )
		);
	}

	if ( isFullscreenMode ) {
		await page.evaluate( () =>
			wp.data
				.dispatch( 'core/edit-post' )
				.toggleFeature( 'fullscreenMode' )
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
		console.log( `searched for ${ title }'s page` );
		const pageLink = await page.$x( `//a[contains(text(), '${ title }')]` );
		console.log(
			`we have ${ pageLink.length } result for ${ title }'s page`
		);
		if ( ( await pageLink.length ) > 0 ) {
			console.log( `going to ${ title }'s page` );
			link = await page.evaluate(
				( a ) => a.getAttribute( 'href' ),
				pageLink[ 0 ]
			);
		}
	}
	if ( link ) {
		await visitPage( link );
	} else {
		console.log( `creating ${ title }'s page` );
		await createNewPost( { postType: 'page', title } );
		await insertBlock( title.replace( /block/i, '' ).trim() );
		await publishPost();
		const pageId = await page.evaluate( () =>
			wp.data.select( 'core/editor' ).getCurrentPostId()
		);
		const pageContent = await getEditedPostContent();
		await outputFile(
			`${ dirname(
				module.parent.parent.filename ||
					module.parent.filename ||
					module.filename
			) }/__fixture__/${ kebabCase(
				title.replace( /block/i, '' ).trim()
			) }.fixture.json`,
			JSON.stringify( {
				title,
				pageContent,
			} )
		);
		return pageId;
	}
}

export default visitBlockPage;

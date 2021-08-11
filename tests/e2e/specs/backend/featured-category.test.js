/**
 * External dependencies
 */
import {
	switchUserToAdmin,
	getEditedPostContent,
	openDocumentSettingsSidebar,
} from '@wordpress/e2e-test-utils';
import { queries, getDocument } from 'pptr-testing-library';
import {
	findLabelWithText,
	visitBlockPage,
} from '@woocommerce/blocks-test-utils';

async function saveOrPublish() {
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
		}
	}
}

const block = {
	name: 'Featured Category',
	slug: 'woocommerce/featured-category',
	class: '.wc-block-featured-category',
};

describe( `${ block.name } Block`, () => {
	beforeAll( async () => {
		await switchUserToAdmin();
		await visitBlockPage( `${ block.name } Block` );
	} );

	it( 'renders without crashing', async () => {
		await expect( page ).toRenderBlock( block );
	} );

	it( 'shows all possible categories', async () => {
		expect(
			await page.$$eval(
				'.wc-block-featured-category__selection li',
				( category ) => category.length
			)
			// Capacity has only three attributes
		).toEqual( 2 );
	} );

	it( 'can toggle description', async () => {
		await page.click(
			'.wc-block-featured-category__selection li input[aria-label="Music, has 2 products"]'
		);
		await page.click( '.wc-block-featured-category__selection button' );
		await openDocumentSettingsSidebar();
		const document = await getDocument( page );
		const showDescriptionButton = await queries.getByLabelText(
			document,
			/Show description/i
		);
		await showDescriptionButton.click();
		await expect( page ).not.toMatchElement(
			'.wc-block-featured-category__description'
		);
		await showDescriptionButton.click();
		await expect( page ).toMatchElement(
			'.wc-block-featured-category__description'
		);
	} );

	it( 'can change overlay', async () => {
		await openDocumentSettingsSidebar();
		await page.click( 'button[aria-label="Color: Red"]' );
		const style = await page.$eval( block.class, ( el ) => {
			return el.style.backgroundColor;
		} );
		await expect( style ).toEqual( 'rgb(228, 209, 209)' );
	} );

	it( 'renders on the frontend', async () => {
		await saveOrPublish();
		const link = await page.evaluate( () =>
			wp.data.select( 'core/editor' ).getPermalink()
		);
		await page.goto( link, { waitUntil: 'networkidle2' } );
		await page.waitForSelector( block.class );
		await expect( page ).toMatchElement(
			'h2.wc-block-featured-category__title',
			{
				text: 'Music',
			}
		);
	} );
} );

/**
 * External dependencies
 */
import {
	getEditedPostContent,
	switchUserToAdmin,
	openDocumentSettingsSidebar,
	publishPost,
} from '@wordpress/e2e-test-utils';
import { getDocument, queries } from 'pptr-testing-library';

import {
	visitBlockPage,
	clearAndFillInput,
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
	name: 'Filter Products by Attribute',
	slug: 'woocommerce/attribute-filter',
	class: '.wc-block-attribute-filter',
};

if ( process.env.WP_VERSION < 5.3 )
	// eslint-disable-next-line jest/no-focused-tests
	test.only( 'skipping all other things', () => {} );

describe( `${ block.name } Block`, () => {
	beforeAll( async () => {
		await switchUserToAdmin();
		await visitBlockPage(
			`${ block.name } Block`
		);

		await page.type(
			'.wc-block-attribute-filter__selection .components-text-control__input',
			'Capacity'
		);
		await page.click(
			'.woocommerce-search-list__list label:first-of-type'
		);
		await page.click(
			'.wc-block-attribute-filter__selection > button'
		);
	} );

	it( 'renders without crashing', async () => {
		await expect( page ).toRenderBlock( block );
	} );

	it( 'allows title to be manipulated', async () => {
		await openDocumentSettingsSidebar();

		await clearAndFillInput(
			'.wp-block[data-type="woocommerce/attribute-filter"] textarea.wc-block-editor-components-title',
			'New Title'
		);
		await page.click(
			'.components-toolbar button[aria-label="Heading 6"]'
		);
		await expect(
			page
		).toMatchElement(
			'.wp-block[data-type="woocommerce/attribute-filter"] h6 textarea',
			{ text: 'New Title' }
		);

		await clearAndFillInput(
			'.wp-block[data-type="woocommerce/attribute-filter"] textarea.wc-block-editor-components-title',
			'Filter by Capacity'
		);
		await page.click(
			'.components-toolbar button[aria-label="Heading 3"]'
		);
	} );

	it( 'renders correctly', async () => {
		// await page.click('.wc-block-attribute-filter');
		// await page.click('.block-editor-block-toolbar__slot button[aria-label="Edit"]')
		expect(
			await page.$$eval(
				'.wc-block-attribute-filter-list li',
				( attributes ) => attributes.length
			)
			// our test data loads 5 for the color attribute.
		).toBeGreaterThanOrEqual( 2 );
	} );

	it( 'can hide product count', async () => {
		await openDocumentSettingsSidebar();
		await expect( page ).toMatchElement(
			'.wc-block-attribute-filter-list-count'
		);
		const document = await getDocument( page );
		const productCountToggle = await queries.getByLabelText(
			document,
			/Product count/i
		);
		await productCountToggle.click();
		await expect( page ).not.toMatchElement(
			'.wc-block-attribute-filter-list-count'
		);
		await productCountToggle.click();
	} );

	it( 'can toggle go button', async () => {
		await openDocumentSettingsSidebar();
		await expect( page ).not.toMatchElement(
			'.wc-block-filter-submit-button'
		);
		const document = await getDocument( page );
		const filterButtonToggle = await queries.getByLabelText(
			document,
			/Filter button/i
		);
		await filterButtonToggle.click();
		await expect( page ).toMatchElement( '.wc-block-filter-submit-button' );
		await filterButtonToggle.click();
	} );

	it( 'can switch attribute', async () => {
		await openDocumentSettingsSidebar();
		const document = await getDocument( page );

		const attributePickerPanel = await queries.getByText(
			document,
			/Filter Products by Attribute/i,
			{ selector: '.components-button.components-panel__body-toggle' }
		);
		await attributePickerPanel.click();
		const capacityAttributeButton = await queries.getByText(
			document,
			/Capacity/i,
			{ selector: '.woocommerce-search-list__item-name' }
		);
		await capacityAttributeButton.click();
		await page.waitForSelector(
			'.wc-block-attribute-filter-list:not(.is-loading)'
		);
		expect(
			await page.$$eval(
				'.wc-block-attribute-filter-list li',
				( reviews ) => reviews.length
			)
			// Capacity has only three attributes
		).toEqual( 2 );

		const shadeAttributeButton = await queries.getByText(
			document,
			/Shade/i,
			{ selector: '.woocommerce-search-list__item-name' }
		);
		await shadeAttributeButton.click();
		await capacityAttributeButton.click();
	} );

	it( 'renders on the frontend', async () => {
		await saveOrPublish();
		const link = await page.evaluate( () =>
			wp.data.select( 'core/editor' ).getPermalink()
		);
		await page.goto( link, { waitUntil: 'networkidle2' } );
		await page.waitForSelector( '.wp-block-woocommerce-attribute-filter' );
		await expect( page ).toMatchElement(
			'.wp-block-woocommerce-attribute-filter h3',
			{
				text: 'Filter by Capacity',
			}
		);

		expect(
			await page.$$eval(
				'.wc-block-attribute-filter-list li',
				( reviews ) => reviews.length
			)
			// Capacity has only two attributes
		).toEqual( 2 );
	} );
} );

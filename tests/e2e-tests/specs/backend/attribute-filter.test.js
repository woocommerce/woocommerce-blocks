/**
 * External dependencies
 */
import {
	getEditedPostContent,
	switchUserToAdmin,
	openDocumentSettingsSidebar,
} from '@wordpress/e2e-test-utils';
import { getDocument, queries } from 'pptr-testing-library';

import { visitBlockPage } from '@woocommerce/blocks-test-utils';

async function saveOrPublish() {
	const publishButton = await page.$(
		'.editor-post-publish-button.editor-post-publish-button__button:not([aria-disabled="true"])'
	);
	if ( publishButton ) {
		await publishButton.click();
		// A success notice should show up
		return page.waitForSelector( '.components-snackbar' );
	}
}
const block = {
	name: 'Filter Products by Attribute',
	slug: 'woocommerce/attribute-filter',
	class: '.wc-block-attribute-filter',
};

describe( `${ block.name } Block`, () => {
	beforeAll( async () => {
		await switchUserToAdmin();
		await visitBlockPage( `${ block.name } Block` );
		await page.type(
			'.wc-block-attribute-filter__selection .components-text-control__input',
			'Color'
		);
		await page.click(
			'.woocommerce-search-list__list .components-menu-item__button:first-child'
		);
		await page.click( '.wc-block-attribute-filter__selection > button' );
	} );

	it( 'renders without crashing', async () => {
		await expect( page ).toRenderBlock( block );
	} );

	it( 'renders correctly', async () => {
		expect(
			await page.$$eval(
				'.wc-block-attribute-filter-list li',
				( attributes ) => attributes.length
			)
			// our test data loads 5 for the color attribute.
		).toBeGreaterThanOrEqual( 2 );
	} );

	it( 'allows title can be manipulated', async () => {
		await expect( page ).toFill(
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

		expect( await getEditedPostContent() ).toMatchSnapshot();

		await expect( page ).toFill(
			'.wp-block[data-type="woocommerce/attribute-filter"] textarea.wc-block-editor-components-title',
			'Filter by Color'
		);
		await page.click(
			'.components-toolbar button[aria-label="Heading 3"]'
		);
	} );

	it( 'can hide product count', async () => {
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
		const document = await getDocument( page );

		const attributePickerPanel = await queries.getByText(
			document,
			/Filter Products by Attribute/i,
			{ selector: '.components-button.components-panel__body-toggle' }
		);
		await attributePickerPanel.click();
		const sizeAttributeButton = await queries.getByText(
			document,
			/Size/i,
			{ selector: '.woocommerce-search-list__item-name' }
		);
		await sizeAttributeButton.click();
		await page.waitForSelector(
			'.wc-block-attribute-filter-list:not(.is-loading)'
		);
		expect(
			await page.$$eval(
				'.wc-block-attribute-filter-list li',
				( reviews ) => reviews.length
			)
			// Size has only three attributes
		).toEqual( 3 );

		const colorAttributeButton = await queries.getByText(
			document,
			/Color/i,
			{ selector: '.woocommerce-search-list__item-name' }
		);
		await colorAttributeButton.click();
	} );

	it( 'renders on the frontend', async () => {
		await saveOrPublish();
		await openDocumentSettingsSidebar();
		await page.click(
			'button.edit-post-sidebar__panel-tab[data-label="Document"]'
		);
		const document = await getDocument( page );
		const PermalinkTab = await queries.getByText( document, /permalink/i, {
			selector: '.components-button.components-panel__body-toggle',
		} );
		await PermalinkTab.click();
		const link = await page.$eval(
			'a.components-external-link.edit-post-post-link__link',
			( a ) => a.getAttribute( 'href' )
		);
		await page.goto( link );
		await page.waitForSelector( '.wp-block-woocommerce-attribute-filter' );

		await expect( page ).toMatchElement(
			'.wp-block-woocommerce-attribute-filter h3',
			{
				text: 'Filter by Color',
			}
		);

		expect(
			await page.$$eval(
				'.wc-block-attribute-filter-list li',
				( reviews ) => reviews.length
			)
			// Size has only three attributes
		).toEqual( 5 );
	} );
} );

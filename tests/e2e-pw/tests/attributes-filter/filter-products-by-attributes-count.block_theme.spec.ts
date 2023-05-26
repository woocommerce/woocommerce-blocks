/**
 * External dependencies
 */
import { test, expect } from '@woocommerce/e2e-playwright-utils';
import { cli } from '@woocommerce/e2e-utils';

const prepareAttributes = async ( page ) => {
	/*
	 * Intercept the dialog event.
	 * This is needed because when the regenerate
	 * button is clicked, a dialog is shown.
	 */
	page.on( 'dialog', async ( dialog ) => {
		await dialog.accept();
	} );

	await page.goto( '/wp-admin/admin.php?page=wc-status&tab=tools' );

	await page.waitForSelector(
		'.regenerate_product_attributes_lookup_table input'
	);

	await page.click( '.regenerate_product_attributes_lookup_table input' );

	/*
	 * Note that the two commands below are intentionally
	 * duplicated as we need to run the cron task twice as
	 * we need to process more than 1 batch of items.
	 */
	await cli(
		`npm run wp-env run tests-cli wp action-scheduler run --hooks="woocommerce_run_product_attribute_lookup_regeneration_callback"`
	);

	await cli(
		`npm run wp-env run tests-cli wp action-scheduler run --hooks="woocommerce_run_product_attribute_lookup_regeneration_callback"`
	);
};

test.describe( 'Filter by Attributes Block - with All products Block', () => {
	test.beforeAll( async () => {
		await cli(
			`npm run wp-env run tests-cli wp plugin activate woocommerce-blocks`
		);
	} );

	test.beforeEach( async ( { page } ) => {
		await prepareAttributes( page );
	} );

	test( 'should show the correct count number of products based on the filter (color=blue|query_type_color=or)', async ( {
		page,
	} ) => {
		await page.goto(
			'/filter-by-attributes-block/?filter_color=blue&query_type_color=or'
		);
		await page.waitForLoadState( 'networkidle' );

		// Check if the page has loaded successfully.
		const pageTitle = await page.$( 'h1.wp-block-post-title' );
		expect( await pageTitle?.innerText() ).toBe(
			'Filter by Attributes Block'
		);

		const expectedValues = [ '4', '0', '2', '2', '0' ];

		const lists = await page.$$(
			'ul.wc-block-attribute-filter-list > li:not([class^="is-loading"]) .wc-filter-element-label-list-count > span:not([class^="screen-reader"])'
		);

		let index = 0;

		for ( const list of lists ) {
			const count = await list.innerText();

			expect( count.includes( expectedValues[ index ] ) ).toBe( true );
			index++;
		}
	} );

	test( 'should show the correct count number of products based on the filter (color=blue,gray|query_type_color=or)', async ( {
		page,
	} ) => {
		await page.goto(
			'/filter-by-attributes-block/?filter_color=blue,gray&query_type_color=or'
		);
		await page.waitForLoadState( 'networkidle' );

		// Check if the page has loaded successfully.
		const pageTitle = await page.$( '.wp-block-post-title' );
		expect( await pageTitle?.innerText() ).toBe(
			'Filter by Attributes Block'
		);

		const expectedValues = [ '4', '3', '2', '2', '0' ];

		const lists = await page.$$(
			'ul.wc-block-attribute-filter-list > li:not([class^="is-loading"]) .wc-filter-element-label-list-count > span:not([class^="screen-reader"])'
		);

		let index = 0;

		for ( const list of lists ) {
			const count = await list.innerText();

			expect( count.includes( expectedValues[ index ] ) ).toBe( true );
			index++;
		}
	} );

	test( 'should show the correct count number of products based on the filter (color=blue|query_type_color=or|min_price=15|max_price=40)', async ( {
		page,
	} ) => {
		await page.goto(
			'/filter-by-attributes-block/?filter_color=blue&query_type_color=or&min_price=15&max_price=40'
		);
		await page.waitForLoadState( 'networkidle' );

		// Check if the page has loaded successfully.
		const pageTitle = await page.$( '.wp-block-post-title' );
		expect( await pageTitle?.innerText() ).toBe(
			'Filter by Attributes Block'
		);

		const expectedValues = [ '2', '0', '1', '1', '0' ];

		const lists = await page.$$(
			'ul.wc-block-attribute-filter-list > li:not([class^="is-loading"]) .wc-filter-element-label-list-count > span:not([class^="screen-reader"])'
		);

		let index = 0;

		for ( const list of lists ) {
			const count = await list.innerText();

			expect( count.includes( expectedValues[ index ] ) ).toBe( true );
			index++;
		}
	} );
} );

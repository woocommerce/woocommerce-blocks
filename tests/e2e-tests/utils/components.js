/**
 * @format
 */

/**
 * Internal dependencies
 */
import { StoreOwnerFlow } from './flows';
import { clickTab, uiUnblocked } from './index';

const config = require( 'config' );
const simpleProductName = config.get( 'products.simple.name' );

const verifyAndPublish = async () => {
	// Wait for auto save
	await page.waitFor( 2000 );

	// Publish product
	await expect( page ).toClick( '#publish' );
	await page.waitForSelector( '.updated.notice' );

	// Verify
	await expect( page ).toMatchElement( '.updated.notice', {
		text: 'Product published.',
	} );
};

/**
 * Create simple product.
 */
const createSimpleProduct = async () => {
	// Go to "add product" page
	await StoreOwnerFlow.openNewProduct();

	// Make sure we're on the add order page
	await expect( page.title() ).resolves.toMatch( 'Add new product' );

	// Set product data
	await expect( page ).toFill( '#title', simpleProductName );
	await clickTab( 'General' );
	await expect( page ).toFill( '#_regular_price', '9.99' );

	await verifyAndPublish();

	const simplePostId = await page.$( '#post_ID' );
	let simplePostIdValue = await (
		await simplePostId.getProperty( 'value' )
	 ).jsonValue();
	return simplePostIdValue;
};

/**
 * Create variable product.
 */
const createVariableProduct = async () => {
	// Go to "add product" page
	await StoreOwnerFlow.openNewProduct();

	// Make sure we're on the add order page
	await expect( page.title() ).resolves.toMatch( 'Add new product' );

	// Set product data
	await expect( page ).toFill(
		'#title',
		'Variable Product with Three Variations'
	);
	await expect( page ).toSelect( '#product-type', 'Variable product' );

	// Create attributes for variations
	await clickTab( 'Attributes' );
	await expect( page ).toSelect(
		'select[name="attribute_taxonomy"]',
		'Custom product attribute'
	);

	for ( let i = 0; i < 3; i++ ) {
		await expect( page ).toClick( 'button.add_attribute', { text: 'Add' } );
		// Wait for attribute form to load
		await uiUnblocked();

		await page.focus( `input[name="attribute_names[${ i }]"]` );
		await expect( page ).toFill(
			`input[name="attribute_names[${ i }]"]`,
			'attr #' + ( i + 1 )
		);
		await expect( page ).toFill(
			`textarea[name="attribute_values[${ i }]"]`,
			'val1 | val2'
		);
		await expect( page ).toClick(
			`input[name="attribute_variation[${ i }]"]`
		);
	}

	await expect( page ).toClick( 'button', { text: 'Save attributes' } );

	// Wait for attribute form to save (triggers 2 UI blocks)
	await uiUnblocked();
	await page.waitFor( 1000 );
	await uiUnblocked();

	// Create variations from attributes
	await clickTab( 'Variations' );
	await page.waitForSelector( 'select.variation_actions:not([disabled])' );
	await page.focus( 'select.variation_actions' );
	await expect( page ).toSelect(
		'select.variation_actions',
		'Create variations from all attributes'
	);

	const firstDialog = await expect( page ).toDisplayDialog( async () => {
		// Using this technique since toClick() isn't working.
		// See: https://github.com/GoogleChrome/puppeteer/issues/1805#issuecomment-464802876
		page.$eval( 'a.do_variation_action', ( elem ) => elem.click() );
	} );

	expect( firstDialog.message() ).toMatch(
		'Are you sure you want to link all variations?'
	);

	const secondDialog = await expect( page ).toDisplayDialog( async () => {
		await firstDialog.accept();
	} );

	expect( secondDialog.message() ).toMatch( '8 variations added' );
	await secondDialog.dismiss();

	// Set some variation data
	await uiUnblocked();
	await uiUnblocked();

	await page.waitForSelector( '.woocommerce_variation .handlediv' );

	// Verify that variations were created
	await Promise.all( [
		expect( page ).toMatchElement( 'select[name="attribute_attr-1[0]"]', {
			text: 'val1',
		} ),
		expect( page ).toMatchElement( 'select[name="attribute_attr-2[0]"]', {
			text: 'val1',
		} ),
		expect( page ).toMatchElement( 'select[name="attribute_attr-3[0]"]', {
			text: 'val1',
		} ),

		expect( page ).toMatchElement( 'select[name="attribute_attr-1[1]"]', {
			text: 'val1',
		} ),
		expect( page ).toMatchElement( 'select[name="attribute_attr-2[1]"]', {
			text: 'val1',
		} ),
		expect( page ).toMatchElement( 'select[name="attribute_attr-3[1]"]', {
			text: 'val2',
		} ),

		expect( page ).toMatchElement( 'select[name="attribute_attr-1[2]"]', {
			text: 'val1',
		} ),
		expect( page ).toMatchElement( 'select[name="attribute_attr-2[2]"]', {
			text: 'val2',
		} ),
		expect( page ).toMatchElement( 'select[name="attribute_attr-3[2]"]', {
			text: 'val1',
		} ),

		expect( page ).toMatchElement( 'select[name="attribute_attr-1[3]"]', {
			text: 'val1',
		} ),
		expect( page ).toMatchElement( 'select[name="attribute_attr-2[3]"]', {
			text: 'val2',
		} ),
		expect( page ).toMatchElement( 'select[name="attribute_attr-3[3]"]', {
			text: 'val2',
		} ),

		expect( page ).toMatchElement( 'select[name="attribute_attr-1[4]"]', {
			text: 'val2',
		} ),
		expect( page ).toMatchElement( 'select[name="attribute_attr-2[4]"]', {
			text: 'val1',
		} ),
		expect( page ).toMatchElement( 'select[name="attribute_attr-3[4]"]', {
			text: 'val1',
		} ),

		expect( page ).toMatchElement( 'select[name="attribute_attr-1[5]"]', {
			text: 'val2',
		} ),
		expect( page ).toMatchElement( 'select[name="attribute_attr-2[5]"]', {
			text: 'val1',
		} ),
		expect( page ).toMatchElement( 'select[name="attribute_attr-3[5]"]', {
			text: 'val2',
		} ),

		expect( page ).toMatchElement( 'select[name="attribute_attr-1[6]"]', {
			text: 'val2',
		} ),
		expect( page ).toMatchElement( 'select[name="attribute_attr-2[6]"]', {
			text: 'val2',
		} ),
		expect( page ).toMatchElement( 'select[name="attribute_attr-3[6]"]', {
			text: 'val1',
		} ),

		expect( page ).toMatchElement( 'select[name="attribute_attr-1[7]"]', {
			text: 'val2',
		} ),
		expect( page ).toMatchElement( 'select[name="attribute_attr-2[7]"]', {
			text: 'val2',
		} ),
		expect( page ).toMatchElement( 'select[name="attribute_attr-3[7]"]', {
			text: 'val2',
		} ),
	] );

	await expect( page ).toClick(
		'.woocommerce_variation:nth-of-type(2) .handlediv'
	);
	await page.waitFor( 2000 );
	await page.focus( 'input[name="variable_is_virtual[0]"]' );
	await expect( page ).toClick( 'input[name="variable_is_virtual[0]"]' );
	await expect( page ).toFill(
		'input[name="variable_regular_price[0]"]',
		'9.99'
	);

	await expect( page ).toClick(
		'.woocommerce_variation:nth-of-type(3) .handlediv'
	);
	await page.waitFor( 2000 );
	await page.focus( 'input[name="variable_is_virtual[1]"]' );
	await expect( page ).toClick( 'input[name="variable_is_virtual[1]"]' );
	await expect( page ).toFill(
		'input[name="variable_regular_price[1]"]',
		'11.99'
	);

	await expect( page ).toClick(
		'.woocommerce_variation:nth-of-type(4) .handlediv'
	);
	await page.waitFor( 2000 );
	await page.focus( 'input[name="variable_manage_stock[2]"]' );
	await expect( page ).toClick( 'input[name="variable_manage_stock[2]"]' );
	await expect( page ).toFill(
		'input[name="variable_regular_price[2]"]',
		'20'
	);
	await expect( page ).toFill( 'input[name="variable_weight[2]"]', '200' );
	await expect( page ).toFill( 'input[name="variable_length[2]"]', '10' );
	await expect( page ).toFill( 'input[name="variable_width[2]"]', '20' );
	await expect( page ).toFill( 'input[name="variable_height[2]"]', '15' );

	await page.focus( 'button.save-variation-changes' );
	await expect( page ).toClick( 'button.save-variation-changes', {
		text: 'Save changes',
	} );

	await verifyAndPublish();

	const variablePostId = await page.$( '#post_ID' );
	let variablePostIdValue = await (
		await variablePostId.getProperty( 'value' )
	 ).jsonValue();
	return variablePostIdValue;
};

export { createSimpleProduct, createVariableProduct };

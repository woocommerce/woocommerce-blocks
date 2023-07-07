/**
 * External dependencies
 */
import { expect, test } from '@woocommerce/e2e-playwright-utils';
import {
	installPluginFromPHPFile,
	uninstallPluginFromPHPFile,
} from '@woocommerce/e2e-mocks/custom-plugins';

/**
 * Internal dependencies
 */
import { blockData, handleAddToCartAjaxSetting } from './utils';

test.describe( `${ blockData.name } Block`, () => {
	test.beforeEach( async ( { frontendUtils, storeApiUtils } ) => {
		await storeApiUtils.cleanCart();
		await frontendUtils.goToShop();
	} );

	test( 'is visible', async ( { frontendUtils } ) => {
		const blocks = await frontendUtils.getBlockByName( blockData.name );
		const productsDisplayed = 16;
		expect( await blocks.count() ).toEqual( productsDisplayed );
	} );
	test( 'add product to the cart', async ( { frontendUtils, page } ) => {
		const blocks = await frontendUtils.getBlockByName( blockData.name );
		const block = blocks.first();
		const button = await block.getByRole( 'button' );

		const productId = await button.getAttribute( 'data-product_id' );

		const productName = await page
			.locator( `li.post-${ productId } h3` )
			.textContent();

		if ( ! productName ) {
			return test.fail();
		}

		await Promise.all( [
			block.locator( 'loading' ).waitFor( {
				state: 'detached',
			} ),
			block.click(),
		] );

		await expect( button ).toHaveClass( /added/ );
		await expect( button ).toHaveText( '1 in the cart' );
		await expect( await block.getByRole( 'link' ) ).toBeVisible();

		await frontendUtils.goToCheckout();
		const productElement = await page.getByText( productName, {
			exact: true,
		} );
		await expect( productElement ).toBeVisible();
	} );
	test( 'add product to the cart - with ajax disabled', async ( {
		frontendUtils,
		page,
		admin,
	} ) => {
		await handleAddToCartAjaxSetting( admin, page, { isChecked: true } );
		await frontendUtils.goToShop();

		const blocks = await frontendUtils.getBlockByName( blockData.name );
		const block = blocks.first();
		const button = await block.getByRole( 'link' );

		const productId = await button.getAttribute( 'data-product_id' );

		const productName = await page
			.locator( `li.post-${ productId } h3` )
			.textContent();

		if ( ! productName ) {
			return test.fail();
		}

		await block.click();
		await page.waitForLoadState( 'networkidle' );

		await expect(
			await page.locator( `a[href*="cart=${ productId }"]` )
		).toBeVisible();

		await frontendUtils.goToCheckout();

		const productElement = await page.getByText( productName, {
			exact: true,
		} );

		await expect( productElement ).toBeVisible();

		await admin.page.goto(
			'wp-admin/admin.php?page=wc-settings&tab=products'
		);

		await handleAddToCartAjaxSetting( admin, page, { isChecked: false } );
	} );

	test( 'the filter `woocommerce_product_add_to_cart_text` is applied', async ( {
		frontendUtils,
	} ) => {
		await installPluginFromPHPFile(
			`${ __dirname }/update-product-button-text.php`
		);
		await frontendUtils.goToShop();
		const blocks = await frontendUtils.getBlockByName( blockData.name );
		const buttonWithNewText = await blocks.getByText( 'Buy Now' ).count();

		const productsDisplayed = 16;
		expect( buttonWithNewText ).toEqual( productsDisplayed );
	} );

	test.afterAll( async ( { storeApiUtils } ) => {
		await storeApiUtils.cleanCart();
		await uninstallPluginFromPHPFile(
			`${ __dirname }/update-product-button-text.php`
		);
	} );
} );

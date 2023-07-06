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
import { blockData } from './utils';

test.describe( `${ blockData.name } Block`, async () => {
	test.beforeAll( async () => {
		await installPluginFromPHPFile(
			`${ __dirname }/update-product-button-text.php`
		);
	} );

	test( 'the filter `woocommerce_product_add_to_cart_text` is applied', async ( {
		frontendUtils,
	} ) => {
		await frontendUtils.goToShop();
		const blocks = await frontendUtils.getBlockByName( blockData.name );
		const buttonWithNewText = await blocks.getByText( 'Buy Now' ).count();

		const productsDisplayed = 16;
		expect( buttonWithNewText ).toEqual( productsDisplayed );
	} );

	test.afterAll( async () => {
		await uninstallPluginFromPHPFile(
			`${ __dirname }/update-product-button-text.php`
		);
	} );
} );

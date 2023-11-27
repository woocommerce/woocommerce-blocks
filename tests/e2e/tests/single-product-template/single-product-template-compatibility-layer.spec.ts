/**
 * External dependencies
 */
import { test, expect } from '@woocommerce/e2e-playwright-utils';
import {
	installPluginFromPHPFile,
	uninstallPluginFromPHPFile,
} from '@woocommerce/e2e-mocks/custom-plugins';

/**
 * Internal dependencies
 */

type Scenario = {
	title: string;
	dataTestId: string;
	content: string;
	amount: number;
};

const singleOccurranceScenarios: Scenario[] = [
	{
		title: 'Before Single Product',
		dataTestId: 'woocommerce_before_single_product',
		content: 'Hook: woocommerce_before_single_product',
		amount: 1,
	},
	{
		title: 'Before Add To Cart Button',
		dataTestId: 'woocommerce_before_add_to_cart_button',
		content: 'Hook: woocommerce_before_add_to_cart_button',
		amount: 1,
	},
	{
		title: 'Single Product Summary',
		dataTestId: 'woocommerce_single_product_summary',
		content: 'Hook: woocommerce_single_product_summary',
		amount: 1,
	},
	{
		title: 'Product Meta Start',
		dataTestId: 'woocommerce_product_meta_start',
		content: 'Hook: woocommerce_product_meta_start',
		amount: 1,
	},
	{
		title: 'After Single Product Summary',
		dataTestId: 'woocommerce_after_single_product_summary',
		content: 'Hook: woocommerce_after_single_product_summary',
		amount: 1,
	},
	{
		title: 'After Single Product',
		dataTestId: 'woocommerce_after_single_product',
		content: 'Hook: woocommerce_after_single_product',
		amount: 1,
	},
];

const compatiblityPluginFileName = 'compatibility-plugin.php';

test.describe( 'Compatibility Layer with Product Collection block', () => {
	test.beforeAll( async () => {
		await installPluginFromPHPFile(
			`${ __dirname }/${ compatiblityPluginFileName }`
		);
	} );

	test.describe(
		'Product Archive with Product Collection block',
		async () => {
			test.beforeAll( async ( { page } ) => {
				await page.goto( '/product/hoodie/' );
			} );

			for ( const scenario of singleOccurranceScenarios ) {
				test( `${ scenario.title } is attached to the page`, async ( {
					page,
				} ) => {
					const hooks = page.getByTestId( scenario.dataTestId );

					await expect( hooks ).toHaveCount( scenario.amount );
					await expect( hooks ).toHaveText( scenario.content );
				} );
			}
		}
	);
} );

test.afterAll( async ( { requestUtils } ) => {
	await uninstallPluginFromPHPFile(
		`${ __dirname }/${ compatiblityPluginFileName }`
	);
	await requestUtils.deleteAllTemplates( 'wp_template' );
} );

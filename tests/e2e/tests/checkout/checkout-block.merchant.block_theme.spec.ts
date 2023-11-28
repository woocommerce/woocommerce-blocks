/**
 * External dependencies
 */
import { BlockData } from '@woocommerce/e2e-types';
import { test as base, expect } from '@woocommerce/e2e-playwright-utils';

/**
 * Internal dependencies
 */
import { CheckoutPage } from './checkout.page';
import { REGULAR_PRICED_PRODUCT_NAME } from './constants';

const blockData: BlockData = {
	name: 'Checkout',
	slug: 'woocommerce/checkout',
	mainClass: '.wp-block-woocommerce-checkout',
	selectors: {
		editor: {
			block: '.wp-block-woocommerce-checkout',
			insertButton: "//button//span[text()='Checkout']",
		},
		frontend: {},
	},
};
const test = base.extend< { checkoutPageObject: CheckoutPage } >( {
	checkoutPageObject: async ( { page }, use ) => {
		const pageObject = new CheckoutPage( {
			page,
		} );
		await use( pageObject );
	},
} );
test.describe( 'Merchant → Checkout', () => {
	// `as string` is safe here because we know the variable is a string, it is defined above.
	const blockSelectorInEditor = blockData.selectors.editor.block as string;

	test.describe( 'Can adjust T&S and Privacy Policy options', () => {
		test.beforeAll( async ( { browser } ) => {
			const page = await browser.newPage();
			await page.goto(
				`${ process.env.WORDPRESS_BASE_URL }/?setup_terms_and_privacy`
			);
			await expect(
				page.getByText( 'Terms & Privacy pages set up.' )
			).toBeVisible();
			await page.close();
		} );

		test.afterAll( async ( { browser } ) => {
			const page = await browser.newPage();
			await page.goto(
				`${ process.env.WORDPRESS_BASE_URL }/?teardown_terms_and_privacy`
			);
			await expect(
				page.getByText( 'Terms & Privacy pages teared down.' )
			).toBeVisible();
			await page.close();
		} );

		test( 'Merchant can see T&S and Privacy Policy links without checkbox', async ( {
			frontendUtils,
			checkoutPageObject,
		} ) => {
			await frontendUtils.goToShop();
			await frontendUtils.addToCart( REGULAR_PRICED_PRODUCT_NAME );
			await frontendUtils.goToCheckout();
			await expect(
				frontendUtils.page.getByText(
					'By proceeding with your purchase you agree to our Terms and Conditions and Privacy Policy'
				)
			).toBeVisible();
			await checkoutPageObject.fillInCheckoutWithTestData();
			await checkoutPageObject.placeOrder();
			await expect(
				frontendUtils.page.getByText(
					'Thank you. Your order has been received.'
				)
			).toBeVisible();
		} );
	} );

	test.describe( 'in page editor', () => {
		test.beforeEach( async ( { editorUtils, admin, editor } ) => {
			await admin.visitSiteEditor( {
				postId: 'woocommerce/woocommerce//page-checkout',
				postType: 'wp_template',
			} );
			await editorUtils.enterEditMode();
			await editor.openDocumentSettingsSidebar();
		} );

		test( 'renders without crashing and can only be inserted once', async ( {
			page,
			editorUtils,
		} ) => {
			const blockPresence = await editorUtils.getBlockByName(
				blockData.slug
			);
			expect( blockPresence ).toBeTruthy();

			await editorUtils.openGlobalBlockInserter();
			await page.getByPlaceholder( 'Search' ).fill( blockData.slug );
			const checkoutBlockButton = page.getByRole( 'option', {
				name: blockData.name,
				exact: true,
			} );
			await expect( checkoutBlockButton ).toHaveAttribute(
				'aria-disabled',
				'true'
			);
		} );

		test( 'toggling shipping company hides and shows address field', async ( {
			editor,
		} ) => {
			await editor.selectBlocks(
				blockSelectorInEditor +
					'  [data-type="woocommerce/checkout-shipping-address-block"]'
			);
			const checkbox = editor.page.getByRole( 'checkbox', {
				name: 'Company',
				exact: true,
			} );
			await checkbox.check();
			await expect( checkbox ).toBeChecked();
			await expect(
				editor.canvas.locator(
					'div.wc-block-components-address-form__company'
				)
			).toBeVisible();

			await checkbox.uncheck();
			await expect( checkbox ).not.toBeChecked();
			await expect(
				editor.canvas.locator(
					'.wc-block-checkout__shipping-fields .wc-block-components-address-form__company'
				)
			).toBeHidden();
		} );

		test( 'toggling billing company hides and shows address field', async ( {
			editor,
		} ) => {
			await editor.canvas.click( 'body' );
			await editor.canvas
				.getByLabel( 'Use same address for billing' )
				.uncheck();

			await editor.selectBlocks(
				blockSelectorInEditor +
					'  [data-type="woocommerce/checkout-billing-address-block"]'
			);
			const checkbox = editor.page.getByRole( 'checkbox', {
				name: 'Company',
				exact: true,
			} );
			await checkbox.check();
			await expect( checkbox ).toBeChecked();
			await expect(
				editor.canvas.locator(
					'.wc-block-checkout__billing-fields .wc-block-components-address-form__company'
				)
			).toBeVisible();

			await checkbox.uncheck();
			await expect( checkbox ).not.toBeChecked();
			await expect(
				editor.canvas.locator(
					'div.wc-block-components-address-form__company'
				)
			).toBeHidden();
		} );
	} );
} );

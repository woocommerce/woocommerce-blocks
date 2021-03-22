/**
 * External dependencies
 */
import {
	switchUserToAdmin,
	ensureSidebarOpened,
	openPublishPanel,
	findSidebarPanelWithTitle,
	findSidebarPanelToggleButtonWithTitle,
} from '@wordpress/e2e-test-utils';
import { shopper } from '@woocommerce/e2e-utils';

/**
 * Internal dependencies
 */
import { visitPostOfType } from '../../../utils/visit-block-page';
import { getBlockPagePermalink, getNormalPagePermalink } from '../../../utils';
const block = {
	name: 'Cart',
	slug: 'woocommerce/cart',
	class: '.wc-block-cart',
};

if ( process.env.WOOCOMMERCE_BLOCKS_PHASE < 2 )
	// eslint-disable-next-line jest/no-focused-tests
	test.only( `skipping ${ block.name } tests`, () => {} );

describe( `${ block.name } Block`, () => {
	beforeAll( async () => {
		await switchUserToAdmin();
	} );

	it( 'Shows the freshest cart data when using browser navigation buttons', async () => {
		const cartBlockPermalink = await getBlockPagePermalink(
			`${ block.name } Block`
		);
		await visitPostOfType( 'Woo Single #1', 'product' );
		const productPermalink = await getNormalPagePermalink();
		await page.goto( productPermalink );
		await shopper.addToCart();
		await page.goto( cartBlockPermalink );
		await page.waitForFunction( () => {
			const wcCartStore = wp.data.select( 'wc/store/cart' );
			return (
				! wcCartStore.isResolving( 'getCartData' ) &&
				wcCartStore.hasFinishedResolution( 'getCartData', [] )
			);
		} );
		await page.click(
			'.wc-block-cart__main .wc-block-components-quantity-selector__button--plus'
		);
		const selectedValue = parseInt(
			await page.$eval(
				'.wc-block-cart__main .wc-block-components-quantity-selector__input',
				( el ) => el.value
			)
		);

		// This is to ensure we've clicked the right cart button.
		expect( selectedValue ).toBeGreaterThan( 1 );

		await page.click( '.wc-block-cart__submit-button' );
		await page.waitForSelector( '.wc-block-checkout' );
		await page.goBack();

		// We need this to check if the block is done loading.
		await page.waitForFunction( () => {
			const wcCartStore = wp.data.select( 'wc/store/cart' );
			return (
				! wcCartStore.isResolving( 'getCartData' ) &&
				wcCartStore.hasFinishedResolution( 'getCartData', [] )
			);
		} );

		// Then we check to ensure the stale cart action has been emitted, so it'll fetch the cart from the API.
		await page.waitForFunction( () => {
			const wcCartStore = wp.data.select( 'wc/store/cart' );
			return wcCartStore.isCartDataStale() === true;
		} );

		const value = parseInt(
			await page.$eval(
				'.wc-block-components-quantity-selector__input',
				( el ) => el.value
			)
		);
		expect( value ).toBe( selectedValue );
	} );
} );

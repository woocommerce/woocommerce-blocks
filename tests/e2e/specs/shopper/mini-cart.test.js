/**
 * External dependencies
 */
import { setDefaultOptions, getDefaultOptions } from 'expect-puppeteer';
import { SHOP_PAGE } from '@woocommerce/e2e-utils';

/**
 * Internal dependencies
 */
import { shopper } from '../../../utils';

const block = {
	name: 'Mini Cart Block',
};

const options = getDefaultOptions();

const clickMiniCartButton = async () => {
	await page.hover( '.wc-block-mini-cart__button' );

	await page.waitForSelector( '.wc-block-mini-cart__drawer.is-loading', {
		hidden: true,
	} );

	await page.click( '.wc-block-mini-cart__button' );
};

if ( process.env.WOOCOMMERCE_BLOCKS_PHASE < 3 ) {
	// eslint-disable-next-line jest/no-focused-tests
	test.only( `skipping ${ block.name } tests`, () => {} );
}

describe( 'Shopper → Mini Cart', () => {
	beforeAll( async () => {
		/**
		 * Mini Cart takes time to open. Sometimes, on slow machines, 500ms
		 * is not enough. So, we increase the default timeout to 5 seconds.
		 */
		setDefaultOptions( { ...options, timeout: 5000 } );
	} );

	afterAll( async () => {
		// Reset default options.
		setDefaultOptions( options );
	} );

	beforeEach( async () => {
		await shopper.goToBlockPage( block.name );
	} );

	describe( 'Icon', () => {
		it( 'Shopper can see the Mini Cart icon and it badge on the front end', async () => {
			await expect( page ).toMatchElement( '.wc-block-mini-cart' );
			await expect( page ).toMatchElement(
				'.wc-block-mini-cart__button'
			);
			await expect( page ).toMatchElement(
				'.wc-block-mini-cart__quantity-badge'
			);

			// Make sure the initial quantity is 0.
			await expect( page ).toMatchElement(
				'.wc-block-mini-cart__amount',
				{
					text: '$0',
				}
			);
			await expect( page ).toMatchElement( '.wc-block-mini-cart__badge', {
				text: '0',
			} );
		} );
	} );

	describe( 'Drawer', () => {
		it( 'The drawer opens when shopper clicks on the mini cart icon', async () => {
			await clickMiniCartButton();

			await expect( page ).toMatchElement(
				'.wc-block-mini-cart__drawer',
				{
					text: 'Start shopping',
				}
			);
		} );

		it( 'The drawer closes when shopper clicks on the drawer close button', async () => {
			await clickMiniCartButton();

			await expect( page ).toMatchElement(
				'.wc-block-mini-cart__drawer',
				{
					text: 'Start shopping',
				}
			);

			// Wait for the drawer to fully open.
			await page.waitForTimeout( 500 );

			await page.click(
				'.wc-block-mini-cart__drawer .components-modal__header button'
			);

			await expect( page ).not.toMatchElement(
				'.wc-block-mini-cart__drawer',
				{
					text: 'Start shopping',
				}
			);
		} );

		it( 'The drawer closes when shopper clicks outside the drawer', async () => {
			await clickMiniCartButton();

			await expect( page ).toMatchElement(
				'.wc-block-mini-cart__drawer',
				{
					text: 'Start shopping',
				}
			);

			await page.mouse.click( 50, 200 );

			await expect( page ).not.toMatchElement(
				'.wc-block-mini-cart__drawer',
				{
					text: 'Start shopping',
				}
			);
		} );
	} );

	describe( 'Filled mini cart', () => {
		beforeAll( async () => {
			await shopper.emptyCart();
		} );

		afterEach( async () => {
			await shopper.emptyCart();
		} );

		it( 'The Mini Cart title shows correct amount', async () => {
			await page.click(
				'.wc-block-grid__product:first-child .add_to_cart_button'
			);

			await expect( page ).toMatchElement( '.wc-block-mini-cart__title', {
				text: 'Your cart (1 item)',
			} );

			await page.mouse.click( 50, 200 );

			await page.click(
				'.wc-block-grid__product:last-child .add_to_cart_button'
			);

			await expect( page ).toMatchElement( '.wc-block-mini-cart__title', {
				text: 'Your cart (2 items)',
			} );
		} );

		it( 'The Mini Cart products table show added products', async () => {
			const products = await page.$$(
				'.wc-block-all-products .wc-block-grid__product'
			);

			if ( products.length === 0 ) {
				throw new Error(
					'No products found on the Mini Cart Block page.'
				);
			}

			// Get a random product to better replicate human behavior.
			const product =
				products[ Math.floor( Math.random() * products.length ) ];
			const productTitleEl = await product.$(
				'.wc-block-components-product-name'
			);
			const productTitle = await productTitleEl.getProperty(
				'textContent'
			);
			const addToCartButton = await product.$( '.add_to_cart_button' );

			await addToCartButton.click();

			await expect( page ).toMatchElement(
				'.wc-block-mini-cart__products-table',
				{
					text: productTitle,
				}
			);
		} );

		it( 'Filled Mini Cart footer contains subtotal, view cart button, and go to checkout buttons', async () => {
			await page.click( '.add_to_cart_button' );

			await expect( page ).toMatchElement( '.wc-block-mini-cart__title', {
				text: 'Your cart',
			} );

			await expect( page ).toMatchElement(
				'.wc-block-mini-cart__footer',
				{
					text: 'Subtotal',
				}
			);

			await expect( page ).toMatchElement(
				'.wc-block-mini-cart__footer-cart',
				{
					text: 'View my cart',
				}
			);

			await expect( page ).toMatchElement(
				'.wc-block-mini-cart__footer-checkout',
				{
					text: 'Go to checkout',
				}
			);
		} );
	} );

	describe( 'Empty mini cart', () => {
		beforeAll( async () => {
			await shopper.emptyCart();
		} );

		it( 'When the cart is empty, the Mini Cart Drawer show empty cart message and start shopping button', async () => {
			await clickMiniCartButton();

			await expect( page ).toMatchElement(
				'.wc-block-mini-cart__drawer',
				{
					text: 'Your cart is currently empty!',
				}
			);

			await expect( page ).toMatchElement(
				'.wc-block-mini-cart__drawer',
				{
					text: 'Start shopping',
				}
			);

			const shopLink = await page.$eval(
				'.wc-block-mini-cart__shopping-button a',
				( el ) => el.href
			);

			expect( shopLink ).toMatch( SHOP_PAGE );
		} );
	} );
} );

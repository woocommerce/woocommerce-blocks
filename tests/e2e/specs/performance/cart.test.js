/**
 * Internal dependencies
 */
import { shopper, getLoadingDurations } from '../../../utils';
import { SIMPLE_PHYSICAL_PRODUCT_NAME } from '../../../utils/constants';
import { logPerformanceResult } from '../../utils';

describe( 'Cart performance', () => {
	beforeAll( async () => {
		await shopper.goToShop();
		await shopper.addToCartFromShopPage( SIMPLE_PHYSICAL_PRODUCT_NAME );
	} );

	it( 'Loading', async () => {
		await shopper.block.goToCart();

		const results = {
			serverResponse: [],
			firstPaint: [],
			domContentLoaded: [],
			loaded: [],
			firstContentfulPaint: [],
			firstBlock: [],
			type: [],
			focus: [],
			inserterOpen: [],
			inserterHover: [],
			inserterSearch: [],
			listViewOpen: [],
		};

		let i = 3;

		// Measuring loading time.
		while ( i-- ) {
			await page.reload();
			await page.waitForSelector( '.wc-block-cart', { timeout: 120000 } );
			const {
				serverResponse,
				firstPaint,
				domContentLoaded,
				loaded,
				firstContentfulPaint,
				firstBlock,
			} = await getLoadingDurations();

			results.serverResponse.push( serverResponse );
			results.firstPaint.push( firstPaint );
			results.domContentLoaded.push( domContentLoaded );
			results.loaded.push( loaded );
			results.firstContentfulPaint.push( firstContentfulPaint );
			results.firstBlock.push( firstBlock );
		}

		console.log( results );

		expect( true ).toBe( true );
	} );

	it.only( 'Quantity change', async () => {
		await shopper.block.goToCart();
		await page.waitForNetworkIdle( { idleTime: 2000 } );
		await page.waitForSelector(
			'button.wc-block-components-quantity-selector__button--plus'
		);
		let i = 10;

		const timesForResponse = [];
		while ( i-- ) {
			const start = performance.now();
			await expect( page ).toClick(
				'button.wc-block-components-quantity-selector__button--plus'
			);
			await page.waitForResponse(
				( response ) =>
					response.url().indexOf( '/wc/store/v1/batch' ) !== -1 &&
					response.status() === 207
			);
			const end = performance.now();
			timesForResponse.push( end - start );
		}
		logPerformanceResult(
			'Cart block: Change cart item quantity',
			timesForResponse
		);
	} );

	it.only( 'Coupon entry', async () => {
		await shopper.block.goToCart();
		await page.waitForNetworkIdle( { idleTime: 2000 } );
		await page.waitForSelector(
			'button.wc-block-components-quantity-selector__button--plus'
		);
		let i = 10;

		const timesForResponse = [];
		while ( i-- ) {
			const start = performance.now();
			await expect( page ).toClick( 'button', { text: 'Coupon code' } );
			await expect( page ).toFill(
				'aria-label["Enter code"]',
				'test_coupon'
			);
			await expect( page ).toClick( 'button', { text: 'Apply' } );
			await page.waitForResponse(
				( response ) =>
					response.url().indexOf( '/wc/store/v1/batch' ) !== -1 &&
					response.status() === 207
			);
			const end = performance.now();
			// Close the coupon panel.
			await expect( page ).toClick( 'button', { text: 'Coupon code' } );
			timesForResponse.push( end - start );
		}
		logPerformanceResult( 'Cart block: Coupon entry', timesForResponse );
	} );
} );

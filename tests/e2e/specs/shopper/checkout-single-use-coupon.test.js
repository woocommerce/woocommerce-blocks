/**
 * Internal dependencies
 */
import { shopper } from '../../../utils';
import { createCoupon } from '../../utils';
import { SIMPLE_PRODUCT_NAME } from '../../../utils/constants';
import { getOrderDetailsDiscountPathExpression } from '../../../utils/path-expressions';

if ( process.env.WOOCOMMERCE_BLOCKS_PHASE < 2 )
	// eslint-disable-next-line jest/no-focused-tests
	test.only( `Skipping checkout tests`, () => {} );

let couponCode;

beforeAll( async () => {
	couponCode = await createCoupon( { usageLimit: 1 } );
	await shopper.block.emptyCart();
} );

afterAll( async () => {
	await shopper.block.emptyCart();
} );

describe( 'Shopper → Checkout → Can apply single-use coupon once', () => {
	it( 'allows checkout to apply single-use coupon once', async () => {
		await shopper.goToShop();
		await shopper.addToCartFromShopPage( SIMPLE_PRODUCT_NAME );
		await shopper.block.goToCheckout();

		// Apply the single-use coupon.
		await shopper.block.applyCouponFromCheckout( couponCode );

		// Verify that the discount had been applied correctly on the checkout page.
		// Selectors
		const discountBlockSelector = '.wc-block-components-totals-discount';
		const discountAppliedCouponCodeSelector =
			'.wc-block-components-totals-discount__coupon-list-item span.wc-block-components-chip__text';
		const discountValueSelector =
			'.wc-block-components-totals-discount .wc-block-components-totals-item__value';

		await page.waitForSelector( discountBlockSelector );
		// Verify the applied discount amount
		await expect( page ).toMatchElement( discountValueSelector, {
			text: '-$5.00',
		} );
		// Verify the applied discount code
		await expect( page ).toMatchElement(
			discountAppliedCouponCodeSelector,
			{
				text: couponCode,
			}
		);

		await shopper.block.placeOrder();
		await expect( page ).toMatch( 'Your order has been received.' );

		// Verify that the discount had been applied correctly on the order confirmation page.
		const discountRowXPath = getOrderDetailsDiscountPathExpression(
			'5.00'
		);
		const [ discountRow ] = await page.$x( discountRowXPath );
		expect( discountRow ).toBeDefined();
	} );

	it( 'Prevents checkout applying single-use coupon twice', async () => {
		await shopper.goToShop();
		await shopper.addToCartFromShopPage( SIMPLE_PRODUCT_NAME );
		await shopper.block.goToCheckout();

		// Apply the same single-use coupon as in the first test case.
		await shopper.block.applyCouponFromCheckout( couponCode );

		// Verify that an error appears, showing that the coupon can no longer be used.
		await expect( page ).toMatch( 'Coupon usage limit has been reached.' );
	} );
} );

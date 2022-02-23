/**
 * Internal dependencies
 */
import { shopper } from '../../../utils';
import { sleep } from '../../utils';
import { Taxes, Products } from '../../fixtures/fixture-data';
import {
	getExpectedTaxes,
	getTaxesFromCurrentPage,
	getTaxesFromOrderSummaryPage,
	showTaxes,
} from '../../../utils/taxes';

const taxRates = Taxes();
const productWooSingle1 = Products().find(
	( prod ) => prod.name === 'Woo Single #1'
);

jest.setTimeout( 120000 );
describe( 'Tax', () => {
	beforeEach( async () => {
		jest.setTimeout( 120000 );
		await shopper.emptyCart();
	} );

	describe( '"Enable tax rate calculations" is unchecked in WC settings -> general', () => {
		jest.setTimeout( 120000 );
		it( 'Tax is not displayed', async () => {
			jest.setTimeout( 120000 );
			await showTaxes( false );
			await shopper.goToShop();
			await shopper.searchForProduct( productWooSingle1.name );
			await shopper.addToCart();
			await shopper.goToCartBlock();

			const cartTaxes = await getTaxesFromCurrentPage();
			expect( cartTaxes ).toEqual( [] );

			await shopper.goToCheckoutBlock();
			const checkoutTaxes = await getTaxesFromCurrentPage();
			expect( checkoutTaxes ).toEqual( [] );

			await shopper.fillInCheckoutWithTestData();
			await shopper.placeOrder();
			await page.waitForNavigation();
			await page.waitForSelector( 'h1.entry-title' );
			const orderSummaryTaxes = await getTaxesFromOrderSummaryPage(
				taxRates.filter( ( taxRate ) => taxRate.country === 'US' )
			);
			expect( orderSummaryTaxes ).toEqual( [] );
		} );
	} );

	describe( '"Enable tax rate calculations" is checked in WC settings -> general', () => {
		jest.setTimeout( 120000 );
		it( 'Tax is displayed correctly on Cart & Checkout ', async () => {
			jest.setTimeout( 120000 );
			await showTaxes( true );
			await shopper.goToShop();
			await shopper.searchForProduct( productWooSingle1.name );
			await shopper.addToCart();
			await shopper.goToCartBlock();

			const expectedTaxes = getExpectedTaxes( taxRates, 'US', [
				productWooSingle1,
			] );
			const cartTaxes = await getTaxesFromCurrentPage();
			expect( cartTaxes.sort() ).toEqual( expectedTaxes.sort() );

			await shopper.goToCheckoutBlock();
			const checkoutTaxes = await getTaxesFromCurrentPage();
			expect( checkoutTaxes.sort() ).toEqual( expectedTaxes.sort() );

			await shopper.fillInCheckoutWithTestData();
			await shopper.placeOrder();
			await page.waitForNavigation();
			await page.waitForSelector( 'h1.entry-title' );
			const orderSummaryTaxes = await getTaxesFromOrderSummaryPage(
				taxRates.filter( ( taxRate ) => taxRate.country === 'US' )
			);
			expect( orderSummaryTaxes.sort() ).toEqual( expectedTaxes.sort() );
		} );
	} );
} );

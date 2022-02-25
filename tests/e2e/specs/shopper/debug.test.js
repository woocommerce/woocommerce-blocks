import { sleep } from '../../utils';
import { shopper } from '../../../utils';
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

describe( 'debug', () => {
	it( 'debuging tests', async () => {
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
		await page.waitForSelector( 'h1.entry-title' );
		const orderSummaryTaxes = await getTaxesFromOrderSummaryPage(
			taxRates.filter( ( taxRate ) => taxRate.country === 'US' )
		);
		expect( orderSummaryTaxes ).toEqual( [] );
	} );
} );

/**
 * Internal dependencies
 */
import { shopper } from '../../../utils';
import { Taxes, Products } from '../../fixtures/fixture-data';
import {
	getExpectedTaxes,
	getTaxesFromCurrentPage,
	showTaxes,
} from '../../../utils/taxes';

const taxRates = Taxes();
const productWooSingle1 = Products().find(
	( prod ) => prod.name === 'Woo Single #1'
);

describe( 'Tax', () => {
	beforeEach( async () => {
		await shopper.emptyCart();
	} );
	describe( '"Enable tax rate calculations" is unchecked in WC settings -> general', () => {
		it( 'Tax is not displayed', async () => {
			await showTaxes( false );
			await shopper.goToShop();
			await shopper.searchForProduct( productWooSingle1.name );
			await shopper.addToCart();
			await shopper.goToCartBlock();

			const cartTaxes = await getTaxesFromCurrentPage();
			expect( cartTaxes ).toEqual( [] );
		} );
	} );

	describe( '"Enable tax rate calculations" is checked in WC settings -> general', () => {
		it( 'Tax is displayed correctly on Cart & Checkout ', async () => {
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
		} );
	} );
} );

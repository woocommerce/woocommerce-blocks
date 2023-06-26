/**
 * External dependencies
 */
import { test, expect } from '@woocommerce/e2e-playwright-utils';

const blockUrl = '/active-filters-block/';
const activeFilters: Record< string, string > = {
	filter_stock_status: 'instock',
	filter_color: 'blue',
	query_type_color: 'or',
	filter_size: 'large',
	query_type_size: 'or',
};

function getActiveFiltersUrl() {
	return `${ blockUrl }?${ Object.keys( activeFilters )
		.map( ( key ) => `${ key }=${ activeFilters[ key ] }` )
		.join( '&' ) }`;
}

test.describe( 'Active Filters block', () => {
	test( 'Shows selected filters', async ( { page } ) => {
		await page.goto( getActiveFiltersUrl() );
		await page.waitForLoadState( 'networkidle' );

		// Check if the page has loaded successfully by checking the page title.
		await expect( page.getByText( 'Active Filters block' ) ).toBeVisible();

		// Check that the block title is visible since we have applied active filters.
		await expect(
			page.getByRole( 'heading', { name: 'Active filters', exact: true } )
		).toBeVisible();

		// Check that the active filters are visible.
		await expect( page.getByText( 'Stock Status:' ) ).toBeVisible();
		await expect(
			page
				.locator( '.wc-block-active-filters__list' )
				.getByText( 'In stock' )
		).toBeVisible();
		await expect( page.getByText( 'Color:' ) ).toBeVisible();
		await expect(
			page.locator( '.wc-block-active-filters__list' ).getByText( 'Blue' )
		).toBeVisible();
		await expect( page.getByText( 'Size:' ) ).toBeVisible();
		await expect(
			page
				.locator( '.wc-block-active-filters__list' )
				.getByText( 'Large' )
		).toBeVisible();
	} );
} );

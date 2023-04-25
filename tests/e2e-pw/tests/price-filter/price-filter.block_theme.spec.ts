/**
 * External dependencies
 */
import { BlockData } from '@woocommerce/e2e-types';
import { test, expect } from '@woocommerce/e2e-playwright-utils';
import { BASE_URL, getBlockByName } from '@woocommerce/e2e-utils';

/**
 * Internal dependencies
 */
import { getMinMaxPriceInputs } from './utils';

const blockData: BlockData = {
	name: 'woocommerce/price-filter',
	mainClass: '.wc-block-price-filter',
	selectors: {
		frontend: {},
		editor: {},
	},
	urlSearchParamWhenFilterIsApplied: '?max_price=10',
};

test.describe( `${ blockData.name } Block - with All products Block`, () => {
	test.beforeEach( async ( { admin, page, editor } ) => {
		await admin.createNewPost();
		await editor.insertBlock( { name: 'woocommerce/all-products' } );
		await editor.insertBlock( {
			name: 'woocommerce/filter-wrapper',
			attributes: {
				filterType: 'price-filter',
				heading: 'Filter By Price',
			},
		} );
		await editor.publishPost();
		await page.waitForLoadState( 'networkidle' );
		const url = new URL( page.url() );
		const postId = url.searchParams.get( 'post' );
		await page.goto( `/?p=${ postId }`, { waitUntil: 'networkidle' } );
	} );

	test( 'should show all products', async ( { page } ) => {
		const allProductsBlock = await getBlockByName( {
			page,
			name: 'woocommerce/all-products',
		} );

		await page.waitForLoadState( 'networkidle' );

		const img = await allProductsBlock.locator( 'img' ).first();

		await expect( img ).not.toHaveAttribute(
			'src',
			`${ BASE_URL }/wp-content/plugins/woocommerce/assets/images/placeholder.png`
		);

		const products = await allProductsBlock.getByRole( 'listitem' ).all();

		expect( products ).toHaveLength( 9 );
	} );

	test( 'should show only products that match the filter', async ( {
		page,
		pageUtils,
	} ) => {
		const { maxPriceInput } = await getMinMaxPriceInputs( {
			page,
			blockName: 'woocommerce/filter-wrapper',
		} );

		await maxPriceInput.selectText();
		await maxPriceInput.type( '10' );
		await pageUtils.pressKeys( 'Tab' );
		await page.waitForResponse( ( response ) =>
			response.url().includes( 'max_price=1000' )
		);

		await page.waitForLoadState( 'networkidle' );

		const allProductsBlock = await getBlockByName( {
			page,
			name: 'woocommerce/all-products',
		} );

		const img = await allProductsBlock.locator( 'img' ).first();

		await expect( img ).not.toHaveAttribute(
			'src',
			`${ BASE_URL }/wp-content/plugins/woocommerce/assets/images/placeholder.png`
		);

		const products = await allProductsBlock.getByRole( 'listitem' ).all();

		expect( products ).toHaveLength( 1 );
		expect( page.url() ).toContain( 'max_price=10' );
	} );
} );

test.describe( `${ blockData.name } Block - with PHP classic template`, () => {
	test.beforeEach( async ( { admin, page, editor } ) => {
		await admin.visitSiteEditor( {
			postId: 'woocommerce/woocommerce//archive-product',
			postType: 'wp_template',
		} );

		await editor.canvas.click( 'body' );

		await editor.insertBlock( {
			name: 'woocommerce/filter-wrapper',
			attributes: {
				filterType: 'price-filter',
				heading: 'Filter By Price',
			},
		} );
		await editor.saveSiteEditorEntities();
		await page.goto( `/shop`, { waitUntil: 'networkidle' } );
	} );

	test.afterEach( async ( { templateRevertUtils } ) => {
		await templateRevertUtils.revertTemplate(
			'woocommerce/woocommerce//archive-product'
		);
	} );

	test( 'should show all products', async ( { page } ) => {
		const legacyTemplate = await getBlockByName( {
			page,
			name: 'woocommerce/legacy-template',
		} );

		await page.waitForLoadState( 'networkidle' );

		const products = await legacyTemplate
			.getByRole( 'list' )
			.locator( '.product' )
			.all();

		expect( products ).toHaveLength( 16 );
	} );

	test( 'should show only products that match the filter', async ( {
		page,
		pageUtils,
	} ) => {
		const { maxPriceInput } = await getMinMaxPriceInputs( {
			page,
			blockName: 'woocommerce/filter-wrapper',
		} );

		await maxPriceInput.selectText();
		await maxPriceInput.type( '10' );
		await pageUtils.pressKeys( 'Tab', {
			delay: 100,
		} );
		await page.waitForURL( ( url ) =>
			url.toString().includes( 'max_price=10' )
		);

		const legacyTemplate = await getBlockByName( {
			page,
			name: 'woocommerce/legacy-template',
		} );

		const products = await legacyTemplate
			.getByRole( 'list' )
			.locator( '.product' )
			.all();

		expect( products ).toHaveLength( 1 );
	} );
} );

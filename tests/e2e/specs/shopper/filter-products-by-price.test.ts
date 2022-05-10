import {
	canvas,
	createNewPost,
	deleteAllTemplates,
	insertBlock,
	switchUserToAdmin,
	publishPost,
} from '@wordpress/e2e-test-utils';
import { selectBlockByName } from '@woocommerce/blocks-test-utils';
import {
	BASE_URL,
	goToTemplateEditor,
	openBlockEditorSettings,
	saveTemplate,
	useTheme,
	waitForCanvas,
} from '../../utils';

const block = {
	name: 'Filter Products by Price',
	slug: 'woocommerce/price-filter',
	class: '.wc-block-price-filter',
	selectors: {
		editor: {
			filterButtonToggle: "//label[text()='Filter button']",
		},
		frontend: {
			priceMaxAmount: '.wc-block-price-filter__amount--max',
			productsList: '.wc-block-grid__products > li',
			classicProductsList: '.products.columns-3 > li',
			submitButton: '.wc-block-components-filter-submit-button',
		},
	},
	urlSearchParamWhenFilterIsApplied: '?max_price=1.99',
};

const waitForAllProductsBlockLoaded = () =>
	page.waitForSelector( selectors.frontend.productsList + '.is-loading', {
		hidden: true,
	} );

const goToShopPage = () =>
	page.goto( BASE_URL + '/shop', {
		waitUntil: 'networkidle0',
	} );

const { selectors } = block;

const setMaxPrice = async () => {
	await page.waitForSelector( selectors.frontend.priceMaxAmount );
	await page.focus( selectors.frontend.priceMaxAmount );
	await page.click( selectors.frontend.priceMaxAmount, {
		clickCount: 3,
	} );
	await page.type( selectors.frontend.priceMaxAmount, '1.99' );
	await page.$eval( selectors.frontend.priceMaxAmount, ( el ) =>
		( el as HTMLElement ).blur()
	);
};

describe( `${ block.name } Block`, () => {
	describe( 'with All Product Block', () => {
		let link = '';
		beforeAll( async () => {
			await switchUserToAdmin();
			await createNewPost( {
				postType: 'post',
				title: block.name,
			} );

			await insertBlock( block.name );
			await insertBlock( 'All Products' );
			await publishPost();

			link = await page.evaluate( () =>
				wp.data.select( 'core/editor' ).getPermalink()
			);
		} );

		it( 'should render', async () => {
			await page.goto( link );
			await waitForAllProductsBlockLoaded();
			const products = await page.$$( selectors.frontend.productsList );

			expect( products ).toHaveLength( 5 );
		} );

		it( 'should show only products that match the filter', async () => {
			const isRefreshed = jest.fn( () => void 0 );
			page.on( 'load', isRefreshed );
			await setMaxPrice();
			await waitForAllProductsBlockLoaded();
			const products = await page.$$( selectors.frontend.productsList );

			expect( isRefreshed ).not.toBeCalled();
			expect( products ).toHaveLength( 1 );
		} );
	} );

	describe( 'with PHP classic template ', () => {
		const productCatalogTemplateId =
			'woocommerce/woocommerce//archive-product';

		useTheme( 'emptytheme' );
		beforeAll( async () => {
			await deleteAllTemplates( 'wp_template' );
			await deleteAllTemplates( 'wp_template_part' );

			await goToTemplateEditor( {
				postId: productCatalogTemplateId,
			} );
			await insertBlock( block.name );
			await saveTemplate();
			await goToShopPage();
		} );

		afterAll( async () => {
			await deleteAllTemplates( 'wp_template' );
			await deleteAllTemplates( 'wp_template_part' );
		} );

		it( 'should render', async () => {
			const products = await page.$$(
				selectors.frontend.classicProductsList
			);

			expect( products ).toHaveLength( 5 );
		} );

		fit( 'should show only products that match the filter', async () => {
			const isRefreshed = jest.fn( () => void 0 );
			page.on( 'load', isRefreshed );

			await page.waitForSelector( block.class + '.is-loading', {
				hidden: true,
			} );

			await setMaxPrice();

			await page.waitForNavigation( {
				waitUntil: 'networkidle0',
			} );

			const products = await page.$$(
				selectors.frontend.classicProductsList
			);

			const pageURL = page.url();
			const parsedURL = new URL( pageURL );

			expect( isRefreshed ).toBeCalledTimes( 1 );
			expect( products ).toHaveLength( 1 );
			expect( parsedURL.search ).toEqual(
				block.urlSearchParamWhenFilterIsApplied
			);
		} );

		it( 'should refresh the page only if the user click on button', async () => {
			await goToTemplateEditor( {
				postId: productCatalogTemplateId,
			} );

			await selectBlockByName( block.slug );
			await openBlockEditorSettings();
			await page.waitForXPath(
				block.selectors.editor.filterButtonToggle
			);
			const [ filterButtonToggle ] = await page.$x(
				block.selectors.editor.filterButtonToggle
			);
			await filterButtonToggle.click();
			await saveTemplate();
			await goToShopPage();

			const isRefreshed = jest.fn( () => void 0 );
			page.on( 'load', isRefreshed );
			await page.waitForSelector( block.class + '.is-loading', {
				hidden: true,
			} );

			await setMaxPrice();

			await page.click( selectors.frontend.submitButton );
			await page.waitForNavigation( {
				waitUntil: 'networkidle0',
			} );

			const products = await page.$$(
				selectors.frontend.classicProductsList
			);
			const pageURL = page.url();
			const parsedURL = new URL( pageURL );

			expect( isRefreshed ).toBeCalledTimes( 1 );
			expect( products ).toHaveLength( 1 );
			expect( parsedURL.search ).toEqual(
				block.urlSearchParamWhenFilterIsApplied
			);
		} );
	} );
} );

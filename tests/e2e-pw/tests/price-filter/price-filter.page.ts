/**
 * External dependencies
 */
import { Page } from '@playwright/test';
import { Editor, Admin } from '@wordpress/e2e-test-utils-playwright';
import { BlockData } from '@woocommerce/e2e-types';
import {
	BASE_URL,
	TemplateApiUtils,
	getBlockByName,
} from '@woocommerce/e2e-utils';

const WOOCOMMERCE_ALL_PRODUCTS = 'woocommerce/all-products';
const WOOCOMMERCE_FILTER_WRAPPER = 'woocommerce/filter-wrapper';

export const blockData: BlockData< {
	placeholderUrl: string;
} > = {
	name: 'woocommerce/price-filter',
	mainClass: '.wc-block-price-filter',
	selectors: {
		frontend: {},
		editor: {},
	},
	placeholderUrl: `${ BASE_URL }/wp-content/plugins/woocommerce/assets/images/placeholder.png`,
};

class PriceFilterPage {
	private page: Page;
	private admin: Admin;
	private editor: Editor;
	private templateApiUtils: TemplateApiUtils;

	constructor( {
		page,
		admin,
		editor,
		templateApiUtils,
	}: {
		page: Page;
		admin: Admin;
		editor: Editor;
		templateApiUtils: TemplateApiUtils;
	} ) {
		this.page = page;
		this.admin = admin;
		this.editor = editor;
		this.templateApiUtils = templateApiUtils;
	}

	async addPriceFilterBlockToProductCatalogAndGoToShop() {
		await this.revertArchiveProductTemplate();

		await this.admin.visitSiteEditor( {
			postId: 'woocommerce/woocommerce//archive-product',
			postType: 'wp_template',
		} );

		await this.editor.canvas.click( 'body' );

		await this.editor.insertBlock( {
			name: WOOCOMMERCE_FILTER_WRAPPER,
			attributes: {
				filterType: 'price-filter',
				heading: 'Filter By Price',
			},
		} );

		await this.page.waitForLoadState( 'networkidle' );

		await this.editor.saveSiteEditorEntities();
		await this.page.goto( `/shop`, { waitUntil: 'networkidle' } );
	}

	async addPriceFilterBlockToNewPostAndGoToFrontend() {
		await this.admin.createNewPost();
		await this.editor.insertBlock( { name: WOOCOMMERCE_ALL_PRODUCTS } );
		await this.editor.insertBlock( {
			name: WOOCOMMERCE_FILTER_WRAPPER,
			attributes: {
				filterType: 'price-filter',
				heading: 'Filter By Price',
			},
		} );
		await this.editor.publishPost();
		await this.page.waitForLoadState( 'networkidle' );
		const url = new URL( this.page.url() );
		const postId = url.searchParams.get( 'post' );
		await this.page.goto( `/?p=${ postId }`, { waitUntil: 'networkidle' } );
	}

	async setPriceFilterRange(
		minPrice: number | null,
		maxPrice: number | null
	) {
		const priceFilterBlock = await this.page.locator( blockData.mainClass );
		const minPriceInput = await priceFilterBlock.getByRole( 'textbox', {
			name: 'Filter products by minimum price',
		} );
		const maxPriceInput = await priceFilterBlock.getByRole( 'textbox', {
			name: 'Filter products by maximum price',
		} );

		if ( minPrice !== null ) {
			await minPriceInput.click();
			await minPriceInput.fill( `${ minPrice }` );
		}
		if ( maxPrice !== null ) {
			await maxPriceInput.click();
			await maxPriceInput.fill( `${ maxPrice }` );
		}

		await this.page.click( 'body' );

		await this.page.waitForURL( ( url ) =>
			url
				.toString()
				.includes(
					this.generatePriceFilterQueryString( minPrice, maxPrice )
				)
		);
	}

	async revertArchiveProductTemplate() {
		await this.templateApiUtils.revertTemplate(
			'woocommerce/woocommerce//archive-product'
		);
	}

	/**
	 * Locators
	 */
	async locateFirstImage() {
		await this.page.waitForLoadState( 'networkidle' );
		const allProductsBlock = await getBlockByName( {
			page: this.page,
			name: WOOCOMMERCE_ALL_PRODUCTS,
		} );

		return await allProductsBlock.locator( 'img' ).first();
	}

	async locateAllProductsBlock() {
		return await getBlockByName( {
			page: this.page,
			name: WOOCOMMERCE_ALL_PRODUCTS,
		} );
	}

	async locateAllProducts() {
		const products = await this.page.locator(
			'.products-block-post-template .product'
		);
		return products;
	}

	/**
	 * Private functions to be used in this class
	 */
	private generatePriceFilterQueryString(
		minPrice: number | null,
		maxPrice: number | null
	) {
		let result = '';
		if ( minPrice ) {
			result += `min_price=${ minPrice }`;
		}
		if ( maxPrice ) {
			result += `&max_price=${ maxPrice }`;
		}
		return result;
	}
}

export default PriceFilterPage;

/**
 * External dependencies
 */
import { Locator, Page } from '@playwright/test';
import { Editor, Admin } from '@wordpress/e2e-test-utils-playwright';

class ProductCollectionPage {
	private page: Page;
	private admin: Admin;
	private editor: Editor;

	constructor( {
		page,
		admin,
		editor,
	}: {
		page: Page;
		admin: Admin;
		editor: Editor;
	} ) {
		this.page = page;
		this.admin = admin;
		this.editor = editor;
	}

	async createNewPostAndInsertBlock() {
		await this.admin.createNewPost();
		await this.editor.insertBlock( {
			name: 'woocommerce/product-collection',
		} );
		await this.page.waitForLoadState( 'networkidle' );
	}

	async publishAndGoToFrontend() {
		await this.editor.publishPost();
		const url = new URL( this.page.url() );
		const postId = url.searchParams.get( 'post' );
		await this.page.goto( `/?p=${ postId }`, { waitUntil: 'networkidle' } );
		await this.page.waitForLoadState( 'networkidle' );
	}

	async setNumberOfColumns( numberOfColumns: number ) {
		const inputField = await this.page.getByRole( 'spinbutton', {
			name: 'Columns',
		} );
		await inputField.fill( numberOfColumns.toString() );
	}

	/**
	 * Locators
	 */

	locateProductTemplate() {
		return this.page.locator( '.wc-block-product-template' );
	}

	async locateProductTitles() {
		const productTemplate = await this.locateProductTemplate();
		return productTemplate
			.locator( '.wp-block-post-title' )
			.locator( 'visible=true' );
	}

	async locateProductImages(): Promise< Locator > {
		return this.locator( {
			editorSelector: `[data-type="woocommerce/product-image"]`,
			frontendSelector: `[data-block-name="woocommerce/product-image"]`,
		} );
	}

	async locateProductPrices(): Promise< Locator > {
		return this.locator( {
			editorSelector: `[data-type="woocommerce/product-price"]`,
			frontendSelector: `[data-block-name="woocommerce/product-price"]`,
		} );
	}

	async locateAddToCartButtons(): Promise< Locator > {
		return this.locator( {
			editorSelector: `[data-type="woocommerce/product-button"]`,
			frontendSelector: `[data-block-name="woocommerce/product-button"]`,
		} );
	}

	private async locator( {
		editorSelector,
		frontendSelector,
	}: {
		editorSelector: string;
		frontendSelector: string;
	} ): Promise< Locator > {
		const productTemplate = await this.locateProductTemplate();
		const editor = await productTemplate
			.locator( editorSelector )
			.locator( 'visible=true' );
		const frontend = productTemplate
			.locator( frontendSelector )
			.locator( 'visible=true' );

		return editor.or( frontend );
	}
}

export default ProductCollectionPage;

/**
 * External dependencies
 */
import { Locator, Page } from '@playwright/test';
import { Editor, Admin } from '@wordpress/e2e-test-utils-playwright';

class ProductCollectionPage {
	private page: Page;
	private admin: Admin;
	private editor: Editor;
	productTemplate!: Locator;
	productImages!: Locator;
	productTitles!: Locator;
	productPrices!: Locator;
	addToCartButtons!: Locator;

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

		await this.initializeLocatorsForEditor();
	}

	async publishAndGoToFrontend() {
		await this.editor.publishPost();
		const url = new URL( this.page.url() );
		const postId = url.searchParams.get( 'post' );
		await this.page.goto( `/?p=${ postId }`, { waitUntil: 'networkidle' } );
		await this.page.waitForLoadState( 'networkidle' );

		await this.initializeLocatorsForFrontend();
	}

	async initializeLocatorsForEditor() {
		this.productTemplate = await this.page.locator(
			'.wc-block-product-template'
		);
		this.productImages = await this.productTemplate
			.locator( '[data-type="woocommerce/product-image"]' )
			.locator( 'visible=true' );
		this.productTitles = await this.productTemplate
			.locator( '.wp-block-post-title' )
			.locator( 'visible=true' );
		this.productPrices = await this.productTemplate
			.locator( '[data-type="woocommerce/product-price"]' )
			.locator( 'visible=true' );
		this.addToCartButtons = await this.productTemplate
			.locator( '[data-type="woocommerce/product-button"]' )
			.locator( 'visible=true' );
	}

	async initializeLocatorsForFrontend() {
		this.productTemplate = await this.page.locator(
			'.wc-block-product-template'
		);
		this.productImages = await this.productTemplate.locator(
			'[data-block-name="woocommerce/product-image"]'
		);
		this.productTitles = await this.productTemplate.locator(
			'.wp-block-post-title'
		);
		this.productPrices = await this.productTemplate.locator(
			'[data-block-name="woocommerce/product-price"]'
		);
		this.addToCartButtons = await this.productTemplate.locator(
			'[data-block-name="woocommerce/product-button"]'
		);
	}

	async setNumberOfColumns( numberOfColumns: number ) {
		const inputField = await this.page.getByRole( 'spinbutton', {
			name: 'Columns',
		} );
		await inputField.fill( numberOfColumns.toString() );
	}
}

export default ProductCollectionPage;

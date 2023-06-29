/**
 * External dependencies
 */

import { Page } from '@playwright/test';

/**
 * Internal dependencies
 */

export class FrontendUtils {
	page: Page;
	constructor( page: Page ) {
		this.page = page;
	}

	async getBlockByName( name: string ) {
		return this.page.locator( `[data-block-name="${ name }"]` );
	}

	async addToCart() {
		await this.page.locator( 'text=Add to cart' ).click();
		await this.page.waitForLoadState( 'networkidle' );
	}

	async goToShop() {
		await this.page.goto( '/shop', {
			waitUntil: 'networkidle',
		} );
	}
}

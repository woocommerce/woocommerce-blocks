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

	async getBlockByClassWithParent( blockClass: string, parentName: string ) {
		const parentBlock = await this.getBlockByName( parentName );
		if ( ! parentBlock ) {
			throw new Error( `Parent block "${ parentName }" not found.` );
		}
		const block = await parentBlock.locator( `.${ blockClass }` );
		return block;
	}

	async addToCart() {
		await this.page.click( 'text=Add to cart' );
		await this.page.waitForLoadState( 'networkidle' );
	}

	async goToShop() {
		await this.page.goto( '/shop', {
			waitUntil: 'networkidle',
		} );
	}
}

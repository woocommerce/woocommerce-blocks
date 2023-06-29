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
		return this.page.locator( `[data-type="${ name }"]` );
	}
}

/**
 * External dependencies
 */
import { Page } from '@playwright/test';
import { Editor } from '@wordpress/e2e-test-utils-playwright';
import { MIN_TIMEOUT } from '@woocommerce/e2e-utils';
/**
 * Internal dependencies
 */

export class EditorUtils {
	editor: Editor;
	page: Page;
	constructor( editor: Editor, page: Page ) {
		this.editor = editor;
		this.page = page;
	}

	async getBlockByName( name: string ) {
		return this.editor.canvas.locator( `[data-type="${ name }"]` );
	}

	/**
	 * Inserts a block via the inserter.
	 *
	 * @param  blockName - The block name to insert.
	 *
	 * @deprecated This method is very flaky. Please, if you can, use {@link EditorUtils#insertBlockViaInserter} instead.
	 */
	async insertBlockViaInserter( blockName: string ) {
		await this.page
			.locator( '[aria-label="Toggle block inserter"]' )
			.click();
		await this.page.getByPlaceholder( 'Search' ).type( blockName );
		await this.page.waitForTimeout( MIN_TIMEOUT );
		await this.page
			.getByRole( 'listbox' )
			.locator( 'button[tabindex="0"]' )
			.click();

		await this.page.waitForTimeout( MIN_TIMEOUT );
	}
}

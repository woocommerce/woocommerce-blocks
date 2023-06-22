/**
 * External dependencies
 */
import { Page } from '@playwright/test';
import { Editor } from '@wordpress/e2e-test-utils-playwright';
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

	async insertBlockViaInserter( blockName: string ) {
		await this.page
			.locator( '[aria-label="Toggle block inserter"]' )
			.click();
		await this.page.getByPlaceholder( 'Search' ).fill( blockName );
		await this.page.waitForTimeout( 2000 );
		await this.page.getByRole( 'listbox' ).getByText( blockName ).click();
	}
}

/**
 * External dependencies
 */
import { Editor } from '@wordpress/e2e-test-utils-playwright';

export class EditorUtils {
	editor: Editor;
	constructor( editor: Editor ) {
		this.editor = editor;
	}

	async getBlockByName( name: string ) {
		return this.editor.canvas.locator( `[data-type="${ name }"]` );
	}

	async enterEditMode() {
		await this.editor.page.waitForSelector(
			'.edit-site-visual-editor__editor-canvas[role="button"]',
			{ timeout: 3000 }
		);
		await this.editor.canvas.click( 'body' );
	}
}

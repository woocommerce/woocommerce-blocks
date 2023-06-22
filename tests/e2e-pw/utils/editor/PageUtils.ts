/**
 * External dependencies
 */
import { Editor } from '@wordpress/e2e-test-utils-playwright';
import { Page } from '@playwright/test';

export class PageUtils {
	editor: Editor;
	page: Page;
	constructor( editor: Editor, page: Page ) {
		this.editor = editor;
		this.page = page;
	}
	async revertTemplate( page: Page ) {
		await this.editor.openDocumentSettingsSidebar();
		const isTemplateTabVisible = await page
			.locator(
				'role=region[name="Editor settings"i] >> role=button[name="Template"i]'
			)
			.isVisible();
		if ( isTemplateTabVisible ) {
			await page.click(
				'role=region[name="Editor settings"i] >> role=button[name="Template"i]'
			);
		}
		await page.click(
			'role=region[name="Editor settings"i] >> role=button[name="Actions"i]'
		);
		await page.click( 'role=menuitem[name=/Clear customizations/i]' );
		await page.waitForSelector(
			'role=button[name="Dismiss this notice"i] >> text="Template reverted."'
		);
	}
}

/**
 * External dependencies
 */
import {
	Page,
	PlaywrightTestArgs,
	PlaywrightTestOptions,
} from '@playwright/test';
import {
	Admin,
	Editor,
	PageUtils,
} from '@wordpress/e2e-test-utils-playwright/build-types';

export class BasePageObject {
	protected page: Page;
	protected admin: Admin;
	protected editor: Editor;
	constructor(
		args: PlaywrightTestArgs &
			PlaywrightTestOptions & {
				admin: Admin;
				editor: Editor;
				pageUtils: PageUtils;
			}
	) {
		this.page = args.page;
		this.admin = args.admin;
		this.editor = args.editor;
	}

	async insertBlock( blockName: string ) {
		await this.editor.insertBlock( {
			name: blockName,
		} );
	}

	async navigateToPost( postId: number ) {
		await this.page.goto( `/?p=${ postId }`, { waitUntil: 'commit' } );
	}

	async publishPost() {
		const postId = await this.editor.publishPost();

		if ( ! postId ) {
			throw new Error( 'Post not published' );
		}

		return postId;
	}
}

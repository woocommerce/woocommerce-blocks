/**
 * External dependencies
 */
import { Page, Locator } from '@playwright/test';
import { RequestUtils } from '@wordpress/e2e-test-utils-playwright';
import { expect } from '@woocommerce/e2e-playwright-utils';

/**
 * Internal dependencies
 */
import { customer } from '../../test-data/data/data';

export class FrontendUtils {
	page: Page;
	requestUtils: RequestUtils;

	constructor( page: Page, requestUtils: RequestUtils ) {
		this.page = page;
		this.requestUtils = requestUtils;
	}

	async getBlockByName( name: string ) {
		return this.page.locator( `[data-block-name="${ name }"]` );
	}

	async getBlockByClassWithParent( blockClass: string, parentName: string ) {
		const parentBlock = await this.getBlockByName( parentName );
		if ( ! parentBlock ) {
			throw new Error( `Parent block "${ parentName }" not found.` );
		}
		const block = parentBlock.locator( `.${ blockClass }` );
		return block;
	}

	async addToCart( itemName = '' ) {
		await this.page.waitForLoadState( 'domcontentloaded' );
		if ( itemName !== '' ) {
			await this.page
				.getByRole( 'button', {
					name: `Add “${ itemName }” to your cart`,
				} )
				.click();
		} else {
			await this.page.click( 'text=Add to cart' );
		}

		await this.page.waitForResponse( ( request ) => {
			const url = request.url();
			return url.includes( 'add_to_cart' ) || url.includes( 'batch' );
		} );
	}

	async goToCheckout() {
		await this.page.goto( '/checkout', {
			waitUntil: 'domcontentloaded',
		} );
	}

	async goToCart() {
		await this.page.goto( '/cart', {
			waitUntil: 'commit',
		} );
	}

	async goToShop() {
		await this.page.goto( '/shop', {
			waitUntil: 'commit',
		} );
	}

	async emptyCart() {
		const cartResponse = await this.requestUtils.request.get(
			'/wp-json/wc/store/cart'
		);
		const nonce = cartResponse.headers()?.nonce;
		if ( ! nonce ) {
			throw new Error( 'Could not get cart nonce.' );
		}
		const res = await this.requestUtils.request.delete(
			'/wp-json/wc/store/v1/cart/items',
			{ headers: { nonce } }
		);
		if ( ! res.ok() ) {
			throw new Error(
				`Got an error response when trying to empty cart. Status code: ${ res.status() }`
			);
		}
	}

	async isBlockEarlierThan< T >(
		containerBlock: T,
		firstBlock: string,
		secondBlock: string
	) {
		const container =
			containerBlock instanceof Function
				? await containerBlock()
				: containerBlock;

		if ( ! container ) {
			throw new Error( 'Container block not found.' );
		}

		const childBlocks = container.locator( '[data-block-name]' );

		let firstBlockIndex = -1;
		let secondBlockIndex = -1;

		for ( let i = 0; i < ( await childBlocks.count() ); i++ ) {
			const blockName = await childBlocks
				.nth( i )
				.getAttribute( 'data-block-name' );

			if ( blockName === firstBlock ) {
				firstBlockIndex = i;
			}

			if ( blockName === secondBlock ) {
				secondBlockIndex = i;
			}

			if ( firstBlockIndex !== -1 && secondBlockIndex !== -1 ) {
				break;
			}
		}

		if ( firstBlockIndex === -1 || secondBlockIndex === -1 ) {
			throw new Error( 'Both blocks must exist within the editor' );
		}

		return firstBlockIndex < secondBlockIndex;
	}

	async isBlockEarlierThanGroupBlock(
		containerBlock: Locator,
		firstBlock: string
	) {
		if ( ! containerBlock ) {
			throw new Error( 'Container block not found.' );
		}

		const childBlocks: Locator = containerBlock.locator( '> div' );

		let firstBlockIndex = -1;
		let secondBlockIndex = -1;

		for ( let i = 0; i < ( await childBlocks.count() ); i++ ) {
			const blockName = await childBlocks
				.nth( i )
				.getAttribute( 'data-block-name' );
			const isGroupBlock = await childBlocks
				.nth( i )
				.evaluate( ( node ) =>
					node.classList.contains( 'wp-block-group' )
				);

			if ( blockName === firstBlock ) {
				firstBlockIndex = i;
			}

			if ( isGroupBlock ) {
				secondBlockIndex = i;
			}

			if ( firstBlockIndex !== -1 && secondBlockIndex !== -1 ) {
				break;
			}
		}

		if ( firstBlockIndex === -1 || secondBlockIndex === -1 ) {
			throw new Error( 'Both blocks must exist within the editor' );
		}

		return firstBlockIndex < secondBlockIndex;
	}

	/**
	 * Playwright selectText causes flaky tests when running on local
	 * development machine. This method is more reliable on both environments.
	 */
	async selectTextInput( locator: Locator ) {
		await locator.click();
		await locator.press( 'End' );
		await locator.press( 'Shift+Home' );
	}

	async gotoMyAccount() {
		await this.page.goto( '/my-account', {
			waitUntil: 'commit',
		} );
	}

	async isLoggedIn() {
		await this.gotoMyAccount();
		await expect(
			this.page.getByRole( 'heading', { name: 'My account' } )
		).toBeVisible();
		const loginForm = this.page.locator( 'form.woocommerce-form-login' );

		return ! loginForm;
	}

	async login() {
		await this.gotoMyAccount();
		await expect( this.page ).toHaveTitle( /My account/ );
		await this.page
			.locator( 'input[name="username"]' )
			.fill( customer.username );
		await this.page
			.locator( 'input[name="password"]' )
			.fill( customer.password );
		await this.page.locator( 'text=Log In' ).click();
		// eslint-disable-next-line playwright/no-networkidle
		await this.page.waitForLoadState( 'networkidle' );
	}

	async logout() {
		await this.gotoMyAccount();
		await expect( this.page ).toHaveTitle( /My account/ );
		await this.page.locator( 'text=Log out' ).click();
	}
}

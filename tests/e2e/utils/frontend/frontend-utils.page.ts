/**
 * External dependencies
 */

import { Page } from '@playwright/test';

/**
 * Internal dependencies
 */
import { BASE_URL } from '../constants';

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
		const block = parentBlock.locator( `.${ blockClass }` );
		return block;
	}

	async addToCart( itemName = '' ) {
		if ( itemName !== '' ) {
			await this.page
				.getByLabel( `Add “${ itemName }” to your cart` )
				.click();
			await this.page.waitForResponse( /add_to_cart/ );
			return;
		}
		await this.page.click( 'text=Add to cart' );
	}

	async goToCheckout() {
		await this.page.goto( '/checkout', {
			waitUntil: 'networkidle',
		} );
	}

	async goToShop() {
		await this.page.goto( '/shop', {
			waitUntil: 'commit',
		} );
	}

	async emptyCart() {
		this.page.goto( BASE_URL );
		await this.page.evaluate( () => {
			const store = window.wp.data.select( 'wc/store/cart' );
			if ( ! store ) {
				return new Error(
					'You must be on a page with data stores before using frontendUtils.emptyCart.'
				);
			}
			const cartData = store.getCartData();
			if ( ! Array.isArray( cartData?.items ) ) {
				return new Error(
					'cartData.items must be an array. If it is not'
				);
			}
			const { removeItemFromCart } =
				window.wp.data.dispatch( 'wc/store/cart' );
			cartData.items.forEach( ( item ) =>
				removeItemFromCart( item.key )
			);
		} );
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
}

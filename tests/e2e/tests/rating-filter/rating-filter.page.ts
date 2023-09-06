/**
 * Internal dependencies
 */
import { BasePageObject } from '../base-page-object';

export class ProductRatingPage extends BasePageObject {
	async goToShopPage() {
		await this.page.goto( '/shop' );
	}

	/**
	 * Create a new post with the product rating block, publish it, and navigate to it.
	 */
	async publishPostWithBlockThenView() {
		await this.admin.createNewPost( { legacyCanvas: true } );
		await this.insertBlock( 'woocommerce/product-rating' );
		const postId = await this.publishPost();
		await this.navigateToPost( postId );
	}
}

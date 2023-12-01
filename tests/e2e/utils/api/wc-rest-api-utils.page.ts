/**
 * External dependencies
 */
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

/**
 * Internal dependencies
 */
import { BASE_URL } from '../constants';

export class WCRestApiUtils {
	api: WooCommerceRestApi;
	constructor() {
		if (
			typeof process.env.CONSUMER_KEY !== 'string' ||
			process.env.CONSUMER_KEY === ''
		) {
			throw new Error( 'CONSUMER_KEY is not set.' );
		}
		if (
			typeof process.env.CONSUMER_SECRET !== 'string' ||
			process.env.CONSUMER_SECRET === ''
		) {
			throw new Error( 'CONSUMER_SECRET is not set.' );
		}
		this.api = new WooCommerceRestApi( {
			url: BASE_URL || '',
			consumerKey: process.env.CONSUMER_KEY || '',
			consumerSecret: process.env.CONSUMER_SECRET || '',
			version: 'wc/v3',
		} );
	}

	async createProduct(
		productDetails: object,
		callback: ( response: { data: { id: number } } ) => void
	) {
		await this.api.post( 'products', productDetails ).then( callback );
	}

	async createProductCategory(
		categoryDetails: object,
		callback: ( response: { data: { id: number } } ) => void
	) {
		await this.api
			.post( 'products/categories', categoryDetails )
			.then( callback );
	}

	async createProductReview(
		reviewDetails: object,
		callback: ( response: { data: { id: number } } ) => void
	) {
		await this.api
			.post( 'products/reviews', reviewDetails )
			.then( callback );
	}

	async deleteProduct( productId: number ) {
		await this.api.delete( `products/${ productId }`, {
			force: true,
		} );
	}

	async deleteProductCategory( categoryId: number ) {
		await this.api.delete( `products/categories/${ categoryId }`, {
			force: true,
		} );
	}

	async deleteProductReview( reviewId: number ) {
		await this.api.delete( `products/reviews/${ reviewId }`, {
			force: true,
		} );
	}
}

/**
 * External dependencies
 */
import { switchUserToAdmin } from '@wordpress/e2e-test-utils';
import { shopper } from '@woocommerce/e2e-utils';

/**
 * Internal dependencies
 */
import {
	getBlockPagePermalink,
	getNormalPagePermalink,
	visitPostOfType,
	scrollTo,
} from '../../../utils';

const block = {
	name: 'Cart',
	slug: 'woocommerce/cart',
	class: '.wc-block-cart',
};

if ( process.env.WOOCOMMERCE_BLOCKS_PHASE < 2 )
	// eslint-disable-next-line jest/no-focused-tests
	test.only( `skipping ${ block.name } tests`, () => {} );

describe( `${ block.name } Block (frontend)`, () => {
	let cartBlockPermalink;
	let productPermalink;

	beforeAll( async () => {
		await page.evaluate( () => window.localStorage.clear() );
		await page.evaluate( () => {
			localStorage.setItem(
				'wc-blocks_dismissed_compatibility_notices',
				'["checkout","cart"]'
			);
		} );
		await switchUserToAdmin();
		cartBlockPermalink = await getBlockPagePermalink(
			`${ block.name } Block`
		);
		await visitPostOfType( 'Woo Single #1', 'product' );
		productPermalink = await getNormalPagePermalink();
		await page.goto( productPermalink );
		await shopper.addToCart();
	} );
	afterAll( async () => {
		// empty cart from shortcode page
		await shopper.goToCart();
		await shopper.removeFromCart( 'Woo Single #1' );
		await page.evaluate( () => {
			localStorage.removeItem(
				'wc-blocks_dismissed_compatibility_notices'
			);
		} );
	} );
} );

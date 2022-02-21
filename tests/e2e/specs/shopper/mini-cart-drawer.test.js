/**
 * Internal dependencies
 */
import { getBlockPagePermalink } from '../../../utils';

const block = {
	name: 'Mini Cart Block',
};

if ( process.env.WOOCOMMERCE_BLOCKS_PHASE < 3 )
	// eslint-disable-next-line jest/no-focused-tests
	test.only( `skipping ${ block.name } tests`, () => {} );

describe( 'Shopper → Mini Cart → Can open/close the drawer', () => {
	it( 'The drawer opens when shopper clicks on the mini cart icon', async () => {
		await page.goto( await getBlockPagePermalink( block.name ), {
			waitUntil: 'networkidle0',
		} );
		await expect( page ).toMatchElement( 'h1', { text: block.name } );

		await page.hover( '.wc-block-mini-cart__button' );

		await expect( page ).toClick( '.wc-block-mini-cart__button' );

		await expect( page ).toMatchElement( '.wc-block-mini-cart__drawer', {
			text: 'Start shopping',
			timeout: 30000,
		} );
	} );

	it( 'The drawer closes when shopper clicks on the drawer close button', async () => {
		await page.goto( await getBlockPagePermalink( block.name ), {
			waitUntil: 'networkidle0',
		} );
		await expect( page ).toMatchElement( 'h1', { text: block.name } );

		await page.hover( '.wc-block-mini-cart__button' );

		await expect( page ).toClick( '.wc-block-mini-cart__button' );

		await expect( page ).toMatchElement( '.wc-block-mini-cart__drawer', {
			text: 'Start shopping',
			timeout: 30000,
		} );

		await expect( page ).toClick(
			'.wc-block-mini-cart__drawer .components-modal__header button'
		);

		await expect( page ).not.toMatchElement(
			'.wc-block-mini-cart__drawer',
			{
				text: 'Start shopping',
				timeout: 30000,
			}
		);
	} );

	it( 'The drawer closes when shopper clicks outside the drawer', async () => {
		await page.goto( await getBlockPagePermalink( block.name ), {
			waitUntil: 'networkidle0',
		} );
		await expect( page ).toMatchElement( 'h1', { text: block.name } );

		await page.hover( '.wc-block-mini-cart__button' );

		await expect( page ).toClick( '.wc-block-mini-cart__button' );

		await expect( page ).toMatchElement( '.wc-block-mini-cart__drawer', {
			text: 'Start shopping',
			timeout: 30000,
		} );

		await page.mouse.click( 100, 100 );

		await expect( page ).not.toMatchElement(
			'.wc-block-mini-cart__drawer',
			{
				text: 'Start shopping',
				timeout: 30000,
			}
		);
	} );
} );

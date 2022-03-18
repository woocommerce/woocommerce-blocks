/**
 * External dependencies
 */
import { getByLabelText } from '@testing-library/react';

/**
 * Internal dependencies
 */
import { shopper, getLoadingDurations } from '../../../utils';
import { SIMPLE_PHYSICAL_PRODUCT_NAME } from '../../../utils/constants';
import { getClickEventDurations } from '../../../../../gutenberg/packages/e2e-tests/specs/performance/utils';

describe( 'Cart performance tests', () => {
	beforeAll(async () => {
		await shopper.goToShop();
		await shopper.addToCartFromShopPage( SIMPLE_PHYSICAL_PRODUCT_NAME );
	} );

	it( 'Loading', async () => {
		await shopper.block.goToCart();

		const results = {
			serverResponse: [],
			firstPaint: [],
			domContentLoaded: [],
			loaded: [],
			firstContentfulPaint: [],
			firstBlock: [],
			type: [],
			focus: [],
			inserterOpen: [],
			inserterHover: [],
			inserterSearch: [],
			listViewOpen: [],
		};

		let i = 3;

		// Measuring loading time.
		while ( i-- ) {
			await page.reload();
			await page.waitForSelector( '.wc-block-cart', { timeout: 120000 } );
			const {
				serverResponse,
				firstPaint,
				domContentLoaded,
				loaded,
				firstContentfulPaint,
				firstBlock,
			} = await getLoadingDurations();

			results.serverResponse.push( serverResponse );
			results.firstPaint.push( firstPaint );
			results.domContentLoaded.push( domContentLoaded );
			results.loaded.push( loaded );
			results.firstContentfulPaint.push( firstContentfulPaint );
			results.firstBlock.push( firstBlock );
		}

		console.log(results);

		expect( true ).toBe( true );
	} );

	it('Quantity change performance', async () => {
		await shopper.block.goToCart();

		const traceFile = __dirname + '/trace.json';
		await page.tracing.start( {
			path: traceFile,
			screenshots: false,
			categories: [ 'devtools.timeline' ],
		} );
		let i = 98;
		while ( i-- ) {
			await expect( page ).toClick( 'button.wc-block-components-quantity-selector__button--plus' );
		}
		await page.tracing.stop();
		const traceResults = JSON.parse( readFile( traceFile ) );
		const [
			keyDownEvents,
			keyPressEvents,
			keyUpEvents,
		] = getClickEventDurations( traceResults );
		//
		// for ( let j = 0; j < keyDownEvents.length; j++ ) {
		// 	results.type.push(
		// 		keyDownEvents[ j ] + keyPressEvents[ j ] + keyUpEvents[ j ]
		// 	);
		// }
		//
		// const resultsFilename = basename( __filename, '.js' ) + '.results.json';
		//
		// writeFileSync(
		// 	join( __dirname, resultsFilename ),
		// 	JSON.stringify( results, null, 2 )
		// );
		//
		// deleteFile( traceFile );
	});
} );

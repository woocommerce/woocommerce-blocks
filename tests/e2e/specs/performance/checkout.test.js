/**
 * Internal dependencies
 */
import { shopper, getLoadingDurations } from '../../../utils';

describe( 'Checkout performance tests', () => {
	it( 'test', async () => {
		await shopper.block.goToCheckout();
		const x = await getLoadingDurations();
		console.log(x);
	} );
} );

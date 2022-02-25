import { sleep } from '../../utils';
import { showTaxes } from '../../../utils/taxes';
import { shopper } from '../../../utils/shopper';

describe( 'debug', () => {
	it( 'debuging tests', async () => {
		await showTaxes( false );
		await shopper.goToShop();
		await sleep( 60 );
	} );
} );

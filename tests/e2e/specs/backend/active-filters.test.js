/**
 * External dependencies
 */
import {
	getAllBlocks,
	switchUserToAdmin,
	getEditedPostContent,
} from '@wordpress/e2e-test-utils';
import { clearAndFillInput } from '@woocommerce/e2e-utils';
import { insertBlockDontWaitForInsertClose } from '../../utils.js';
import { visitBlockPage } from '@woocommerce/blocks-test-utils';

const block = {
	name: 'Active Product Filters',
	slug: 'woocommerce/active-filters',
	class: '.wc-block-active-filters',
};

describe( `${ block.name } Block`, () => {
	beforeAll( async () => {
		await switchUserToAdmin();
		await visitBlockPage( `${ block.name } Block` );
	} );

	it( 'can be inserted once', async () => {
		await insertBlockDontWaitForInsertClose( block.name );
		expect( await getAllBlocks() ).toHaveLength( 1 );
	} );

	it( 'renders without crashing', async () => {
		await expect( page ).toRenderBlock( block );
	} );

	it( 'can change title label in editor', async () => {
		await expect( page ).toFill(
			'.wc-block-active-filters__title > textarea',
			'Current filters'
		);

		await clearAndFillInput(
			'.wc-block-active-filters__title > textarea',
			'Active filters'
		);

		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );
} );

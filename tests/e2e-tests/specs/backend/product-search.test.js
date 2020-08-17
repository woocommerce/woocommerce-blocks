/**
 * External dependencies
 */
import {
	switchUserToAdmin,
	getEditedPostContent,
	openDocumentSettingsSidebar,
} from '@wordpress/e2e-test-utils';
import { clearAndFillInput } from '@woocommerce/e2e-tests/utils';
import {
	findToggleWithLabel,
	visitBlockPage,
} from '@woocommerce/blocks-test-utils';

const block = {
	name: 'Product Search',
	slug: 'woocommerce/product-search',
	class: '.wc-block-product-search',
};

describe( `${ block.name } Block`, () => {
	beforeAll( async () => {
		await switchUserToAdmin();
		await visitBlockPage( `${ block.name } Block` );
	} );

	it( 'renders without crashing', async () => {
		await expect( page ).toRenderBlock( block );
	} );

	it( 'can toggle field label', async () => {
		await openDocumentSettingsSidebar();
		// we focus on the block
		await page.click( block.class );
		const toggle = await findToggleWithLabel( 'Show search field label' );
		await toggle.click();
		await expect( page ).not.toMatchElement(
			`${ block.class } .wc-block-product-search__label`
		);
		await toggle.click();
		await expect( page ).toMatchElement(
			`${ block.class } .wc-block-product-search__label`
		);
	} );

	it( 'can change field labels in editor', async () => {
		await expect( page ).toFill(
			'.wc-block-product-search__label input',
			'I am a new label'
		);

		await expect( page ).toFill(
			'.wc-block-product-search__field input',
			'I am a new placeholder'
		);

		await clearAndFillInput(
			'.wc-block-product-search__label input',
			'The Label'
		);
		await clearAndFillInput(
			'.wc-block-product-search__field input',
			'The Placeholder'
		);

		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );
} );

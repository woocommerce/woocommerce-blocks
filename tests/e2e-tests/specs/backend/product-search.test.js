/**
 * External dependencies
 */
import {
	switchUserToAdmin,
	getEditedPostContent,
	openDocumentSettingsSidebar,
} from '@wordpress/e2e-test-utils';
import { clearAndFillInput } from '@woocommerce/e2e-tests/utils';
import { visitBlockPage } from '@woocommerce/blocks-test-utils';

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
		// Gutenberg error
		expect(
			( await page.content() ).match(
				/Your site doesn’t include support for/gi
			)
		).toBeNull();
		// Our ErrorBoundary
		expect(
			( await page.content() ).match(
				/There was an error whilst rendering/gi
			)
		).toBeNull();
		// Validation Error
		expect(
			( await page.content() ).match(
				/This block contains unexpected or invalid content/gi
			)
		).toBeNull();

<<<<<<< HEAD
		await expect( page ).toMatchElement( block.class );
=======
		expect( await getEditedPostContent() ).toMatchSnapshot( snapshotTag );
>>>>>>> tag snapshots
	} );

	it( 'can toggle field label', async () => {
		await openDocumentSettingsSidebar();
		// we focus on the block
		await page.click( block.class );
		await page.click( '.components-form-toggle__input' );
		await expect( page ).not.toMatchElement(
			`${ block.class } .wc-block-product-search__label`
		);
		await page.click( '.components-form-toggle__input' );
		await expect( page ).toMatchElement(
			`${ block.class } .wc-block-product-search__label`
		);
	} );

	it( 'can change field labels in editor', async () => {
		await expect( page ).toFill(
			'textarea.wc-block-product-search__label',
			'I am a new label'
		);

		await expect( page ).toFill(
			'textarea.wc-block-product-search__field',
			'I am a new placeholder'
		);

		await clearAndFillInput(
			'textarea.wc-block-product-search__label',
			'The Label'
		);
		await clearAndFillInput(
			'textarea.wc-block-product-search__field',
			'The Placeholder'
		);

		expect( await getEditedPostContent() ).toMatchSnapshot( snapshotTag );
	} );
} );

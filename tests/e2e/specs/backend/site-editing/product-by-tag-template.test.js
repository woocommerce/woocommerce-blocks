/* eslint-disable jest/no-conditional-expect */
/**
 * External dependencies
 */
import { URL } from 'url';
import {
	canvas,
	deleteAllTemplates,
	getCurrentSiteEditorContent,
	insertBlock,
} from '@wordpress/e2e-test-utils';
import {
	getNormalPagePermalink,
	visitPostOfType,
} from '@woocommerce/blocks-test-utils';

/**
 * Internal dependencies
 */
import {
	BASE_URL,
	DEFAULT_TIMEOUT,
	filterCurrentBlocks,
	getAllTemplates,
	goToTemplateEditor,
	goToTemplatesList,
	saveTemplate,
	useTheme,
} from '../../../utils';

import {
	BLOCK_DATA,
	CUSTOMIZED_STRING,
	defaultTemplateProps,
	SELECTORS,
	visitTemplateAndAddCustomParagraph,
	WOOCOMMERCE_PARSED_ID,
} from './utils';

describe( 'Products by Tag block template', () => {
	useTheme( 'emptytheme' );
	beforeAll( async () => {
		await deleteAllTemplates( 'wp_template' );
		await deleteAllTemplates( 'wp_template_part' );
	} );

	it( 'default template from WooCommerce Blocks is available on an FSE theme', async () => {
		const EXPECTED_TEMPLATE = defaultTemplateProps( 'Products by Tag' );

		await goToTemplatesList();

		const templates = await getAllTemplates();

		try {
			expect( templates ).toContainEqual( EXPECTED_TEMPLATE );
		} catch ( ok ) {
			// Depending on the speed of the execution and whether Chrome is headless or not
			// the id might be parsed or not

			expect( templates ).toContainEqual( {
				...EXPECTED_TEMPLATE,
				addedBy: WOOCOMMERCE_PARSED_ID,
			} );
		}
	} );

	it( 'should contain the "WooCommerce Product Taxonomy Block" classic template', async () => {
		await goToTemplateEditor( {
			postId: 'woocommerce/woocommerce//taxonomy-product_tag',
		} );

		const [ classicBlock ] = await filterCurrentBlocks(
			( block ) =>
				block.name === BLOCK_DATA[ 'taxonomy-product_tag' ].name
		);

		expect( classicBlock.attributes.template ).toBe(
			BLOCK_DATA[ 'taxonomy-product_tag' ].attributes.template
		);
		expect( await getCurrentSiteEditorContent() ).toMatchSnapshot();
	} );

	it( 'should show the action menu if the template has been customized by the user', async () => {
		const EXPECTED_TEMPLATE = {
			...defaultTemplateProps( 'Products by Tag' ),
			hasActions: true,
		};

		await visitTemplateAndAddCustomParagraph( 'taxonomy-product_tag' );

		await goToTemplatesList( { waitFor: 'actions' } );

		const templates = await getAllTemplates();

		try {
			expect( templates ).toContainEqual( EXPECTED_TEMPLATE );
		} catch ( ok ) {
			// Depending on the speed of the execution and whether Chrome is headless or not
			// the id might be parsed or not

			expect( templates ).toContainEqual( {
				...EXPECTED_TEMPLATE,
				addedBy: WOOCOMMERCE_PARSED_ID,
			} );
		}
	} );

	it( 'should preserve and correctly show the user customization on the back-end', async () => {
		await goToTemplateEditor( {
			postId: 'woocommerce/woocommerce//taxonomy-product_tag',
		} );

		await expect( canvas() ).toMatchElement( SELECTORS.blocks.paragraph, {
			text: CUSTOMIZED_STRING,
			timeout: DEFAULT_TIMEOUT,
		} );
	} );

	it( 'should show the user customization on the front-end', async () => {
		await page.goto( new URL( '/product-tag/newest', BASE_URL ) );

		await expect( page ).toMatchElement( 'p', {
			text: CUSTOMIZED_STRING,
			timeout: DEFAULT_TIMEOUT,
		} );
	} );
} );

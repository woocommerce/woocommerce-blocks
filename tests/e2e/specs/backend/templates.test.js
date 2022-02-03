import {
	activateTheme,
	canvas,
	getCurrentSiteEditorContent,
	insertBlock,
	trashAllPosts,
} from '@wordpress/e2e-test-utils';
import { addQueryArgs } from '@wordpress/url';
import {
	getNormalPagePermalink,
	visitPostOfType,
} from '@woocommerce/blocks-test-utils';
import {
	elementExists,
	getTextContent,
	goToSiteEditor,
	saveTemplate,
} from '../../utils';

function legacyBlockSelector( title ) {
	return `[data-type="woocommerce/legacy-template"][data-title="${ title }"]`;
}

const SELECTORS = {
	blocks: {
		singleProduct: legacyBlockSelector(
			'WooCommerce Single Product Block'
		),
	},
	templatesListTable: {
		actionsContainer: '.edit-site-list-table__actions',
		cells: '.edit-site-list-table-column',
		headings: 'thead th.edit-site-list-table-column',
		root: '.edit-site-list-table',
		rows: '.edit-site-list-table-row',
		templateTitle: '[data-wp-component="Heading"]',
	},
};

const CUSTOMIZED_STRING = 'My awesome customization';

async function getAllTemplates() {
	const { templatesListTable } = SELECTORS;

	const table = await page.$( templatesListTable.root );

	if ( ! table ) throw new Error( 'Templates table not found' );

	const rows = await table.$$( templatesListTable.rows );
	console.log( { rows } );

	return Promise.all(
		rows.map( async ( row ) => ( {
			addedBy: (
				await getTextContent( templatesListTable.cells, row )
			 )[ 1 ],
			hasActions: await elementExists(
				templatesListTable.actionsContainer,
				row
			),
			templateTitle: (
				await getTextContent( templatesListTable.templateTitle, row )
			 )[ 0 ],
		} ) )
	);
}

describe( 'Store Editing Templates', () => {
	beforeAll( async () => {
		await activateTheme( 'emptytheme' );
		await trashAllPosts( 'wp_template' );
		await trashAllPosts( 'wp_template_part' );
	} );

	afterAll( async () => {
		await activateTheme( 'twentytwentyone' );
	} );

	describe( 'Single Product block template', () => {
		it( 'default template from WooCommerce Blocks is available on an FSE theme', async () => {
			const EXPECTED_TEMPLATE = {
				addedBy: 'WooCommerce',
				hasActions: false,
				templateTitle: 'Single Product',
			};

			await goToSiteEditor( 'postType=wp_template' );
			await page.waitForSelector( SELECTORS.templatesListTable.root );

			expect( await getAllTemplates() ).toContainEqual(
				EXPECTED_TEMPLATE
			);
		} );

		it( 'should contain the "WooCommerce Single Product Block" legacy template', async () => {
			const templateQuery = addQueryArgs( '', {
				postId: 'woocommerce/woocommerce//single-product',
				postType: 'wp_template',
			} );

			await goToSiteEditor( templateQuery );
			await expect( canvas() ).toMatchElement(
				SELECTORS.blocks.singleProduct
			);
			expect( await getCurrentSiteEditorContent() ).toMatchSnapshot();
		} );

		it( 'should show the action menu if the template has been customized by the user', async () => {
			const EXPECTED_TEMPLATE = {
				addedBy: 'WooCommerce',
				hasActions: true,
				templateTitle: 'Single Product',
			};

			const templateQuery = addQueryArgs( '', {
				postId: 'woocommerce/woocommerce//single-product',
				postType: 'wp_template',
			} );

			await goToSiteEditor( templateQuery );
			await insertBlock( 'Paragraph' );
			await page.keyboard.type( CUSTOMIZED_STRING );
			await saveTemplate();

			await goToSiteEditor( 'postType=wp_template' );
			expect( await getAllTemplates() ).toContainEqual(
				EXPECTED_TEMPLATE
			);
		} );

		it( 'should show the user customization on the front-end', async () => {
			const exampleProductName = 'Woo Single #1';

			await visitPostOfType( exampleProductName, 'product' );
			const permalink = await getNormalPagePermalink();

			await page.goto( permalink );

			await expect( page ).toMatchElement( 'p', {
				text: CUSTOMIZED_STRING,
			} );
		} );
	} );
} );

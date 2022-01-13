/**
 * Internal dependencies
 */
import { beginsWith, getMatchingTemplateData } from '../utils';

export const TEMPLATES = {
	'single-product': {
		title: 'WooCommerce Single Product Block',
		placeholder: 'single-product',
	},
	'archive-product': {
		title: 'WooCommerce Product Grid Block',
		placeholder: 'archive-product',
	},
	'taxonomy-product_cat': {
		title: 'WooCommerce Product Taxonomy Block',
		placeholder: 'archive-product',
	},
	'taxonomy-product_tag': {
		title: 'WooCommerce Product Tag Block',
		placeholder: 'archive-product',
	},
};

describe( 'beginsWith', () => {
	it( 'should return true for matching first part of a given string', () => {
		expect(
			beginsWith(
				'taxonomy-product_tag',
				'taxonomy-product_tag-clothing'
			)
		).toBe( true );
		expect(
			beginsWith(
				'taxonomy-product_cat',
				'taxonomy-product_cat-winter-collection'
			)
		).toBe( true );
	} );

	it( 'should return false if first part of a given string does not match', () => {
		expect(
			beginsWith(
				'taxonomy-product_tag',
				'taxonomies-product_tag-clothing'
			)
		).toBe( false );
		expect(
			beginsWith(
				'taxonomy-product_cat',
				'taxonomy-products_cat-winter-collection'
			)
		).toBe( false );
		expect(
			beginsWith(
				'taxonomy-product_tag',
				'taxonomy-product_cat-winter-collection'
			)
		).toBe( false );
	} );
} );

describe( 'getMatchingTemplateData', () => {
	it( 'should return template data if a correct match has been found', () => {
		expect(
			getMatchingTemplateData(
				TEMPLATES,
				'taxonomy-product_cat-winter-collection'
			)
		).toBe( TEMPLATES[ 'taxonomy-product_cat' ] );

		expect( getMatchingTemplateData( TEMPLATES, 'single-product' ) ).toBe(
			TEMPLATES[ 'single-product' ]
		);

		expect(
			getMatchingTemplateData( TEMPLATES, 'taxonomy-product_tag' )
		).toBe( TEMPLATES[ 'taxonomy-product_tag' ] );
	} );

	it( 'should return null if given template slug does not match any of the expected options', () => {
		expect(
			getMatchingTemplateData( TEMPLATES, 'slug-does-not-match' )
		).toBe( null );
	} );
} );

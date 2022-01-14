/**
 * Internal dependencies
 */
import { getMatchingTemplateData } from '../utils';

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

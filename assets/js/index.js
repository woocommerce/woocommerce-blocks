/**
 * External dependencies
 */
import { getCategories, setCategories } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { woo as Icon } from '@woocommerce/icons';

/**
 * Internal dependencies
 */
import '../css/editor.scss';
import '../css/style.scss';
import './filters/block-list-block';
import './filters/get-block-attributes';

/**
 * @todo This is a test of some todos:
 *
 * - Todo one
 * - Todo two
 * - Todo Three
 *
 * And that's it!
 */

// @todo This is another todo comment test
// with a sentence ending on the next line.
//
// Let's see if this one works okay.

// @todo Another test.

setCategories( [
	...getCategories().filter( ( { slug } ) => slug !== 'woocommerce' ),
	// Add a WooCommerce block category
	{
		slug: 'woocommerce',
		title: __( 'WooCommerce', 'woo-gutenberg-products-block' ),
		icon: <Icon />,
	},
] );

/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Block from './block';
import withProductSelector from '../shared/with-product-selector';
import { BLOCK_TITLE, BLOCK_ICON } from './constants';

const Edit = ( { attributes } ) => {
	return <Block { ...attributes } />;
};
export default withProductSelector( {
	icon: BLOCK_ICON,
	label: BLOCK_TITLE,
	description: __(
		"Choose a product to display it's rating.",
		'woo-gutenberg-products-block'
	),
} )( Edit );

/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'woocommerce/simple-price-filter', {
	edit: () => <div>Simple price filter</div>,
	save: () => null,
} );

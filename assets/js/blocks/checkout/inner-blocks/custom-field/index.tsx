/**
 * External dependencies
 */
import { registerBlockType, createBlock } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import attributes from './attributes';
import { Edit, Save } from './edit';

registerBlockType( 'woocommerce/checkout-custom-field', {
	edit: Edit,
	save: Save,
	attributes,
} );

/**
 * External dependencies
 */
import { Icon } from '@wordpress/icons';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { filledCart } from '~/icons';
import { Edit, Save } from './edit';

registerBlockType( 'woocommerce/filled-cart-block', {
	icon: {
		src: (
			<Icon
				icon={ filledCart }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	edit: Edit,
	save: Save,
} );

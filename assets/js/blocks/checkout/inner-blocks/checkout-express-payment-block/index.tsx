/**
 * External dependencies
 */
import { Icon } from '@wordpress/icons';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import expressIcon from './icon';
import { Edit, Save } from './edit';

registerBlockType( 'woocommerce/checkout-express-payment-block', {
	icon: {
		src: (
			<Icon
				style={ { fill: 'none' } }
				icon={ expressIcon }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	edit: Edit,
	save: Save,
} );

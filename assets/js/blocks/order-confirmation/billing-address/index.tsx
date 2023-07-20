/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { Icon } from '@wordpress/icons';
import { totals } from '@woocommerce/icons';

/**
 * Internal dependencies
 */
import edit from './edit';
import './style.scss';

registerBlockType( 'woocommerce/order-confirmation-billing-address', {
	icon: {
		src: (
			<Icon
				icon={ totals }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	edit,
	save() {
		return null;
	},
} );

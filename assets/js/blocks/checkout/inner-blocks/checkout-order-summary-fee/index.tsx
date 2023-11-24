/**
 * External dependencies
 */
import { Icon } from '@wordpress/icons';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { totals } from '~/icons';
import { Edit, Save } from './edit';

registerBlockType( 'woocommerce/checkout-order-summary-fee-block', {
	icon: {
		src: (
			<Icon
				icon={ totals }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	edit: Edit,
	save: Save,
} );

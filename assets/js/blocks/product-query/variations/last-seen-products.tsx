/**
 * External dependencies
 */
import { isExperimentalBuild } from '@woocommerce/block-settings';
import { registerBlockVariation } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { Icon, pin } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import {
	INNER_BLOCKS_TEMPLATE,
	QUERY_DEFAULT_ATTRIBUTES,
	QUERY_LOOP_ID,
	DEFAULT_ALLOWED_CONTROLS,
} from '../constants';

const VARIATION_NAME = 'woocommerce/last-seen-products';
const LAST_SEEN_PRODUCTS_ATTRIBUTES = {
	...QUERY_DEFAULT_ATTRIBUTES,
	allowedControls: DEFAULT_ALLOWED_CONTROLS,
	query: {
		...QUERY_DEFAULT_ATTRIBUTES.query,
		__woocommerceStockStatus: 'instock',
	},
};
const allowedInnerBlocks = [ ...INNER_BLOCKS_TEMPLATE[ 0 ] ];
if ( isExperimentalBuild() ) {
	registerBlockVariation( QUERY_LOOP_ID, {
		name: VARIATION_NAME,
		title: __( 'Last Seen Products', 'woo-gutenberg-products-block' ),
		isActive: ( blockAttributes ) =>
			blockAttributes.namespace === VARIATION_NAME,
		icon: {
			src: (
				<Icon
					icon={ pin }
					className="wc-block-editor-components-block-icon wc-block-editor-components-block-icon--percent"
				/>
			),
		},
		attributes: {
			...LAST_SEEN_PRODUCTS_ATTRIBUTES,
			namespace: VARIATION_NAME,
		},
		// Gutenberg doesn't support this type yet, discussion here:
		// https://github.com/WordPress/gutenberg/pull/43632
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		allowedControls: [],
		innerBlocks: [ allowedInnerBlocks ],
		scope: [ 'block', 'inserter' ],
	} );
}

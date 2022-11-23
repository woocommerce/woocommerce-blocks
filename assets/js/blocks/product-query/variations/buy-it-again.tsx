/**
 * External dependencies
 */
import { isExperimentalBuild } from '@woocommerce/block-settings';
import { registerBlockVariation } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { Icon, plusCircle } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import {
	//	DEFAULT_ALLOWED_CONTROLS,
	INNER_BLOCKS_TEMPLATE,
	QUERY_DEFAULT_ATTRIBUTES,
	QUERY_LOOP_ID,
} from '../constants';
//import { ArrayXOR } from '../utils';

const VARIATION_NAME = 'woocommerce/query-buy-it-again';

if ( isExperimentalBuild() ) {
	registerBlockVariation( QUERY_LOOP_ID, {
		name: VARIATION_NAME,
		title: __( 'Buy it Again', 'woo-gutenberg-products-block' ),
		isActive: ( blockAttributes ) =>
			blockAttributes.namespace === VARIATION_NAME,
		icon: {
			src: (
				<Icon
					icon={ plusCircle }
					className="wc-block-editor-components-block-icon wc-block-editor-components-block-icon--percent"
				/>
			),
		},
		attributes: {
			...QUERY_DEFAULT_ATTRIBUTES,
			namespace: VARIATION_NAME,
			query: {
				...QUERY_DEFAULT_ATTRIBUTES.query,
			},
		},
		// Gutenberg doesn't support this type yet, discussion here:
		// https://github.com/WordPress/gutenberg/pull/43632
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		//allowedControls: ArrayXOR( DEFAULT_ALLOWED_CONTROLS ),
		innerBlocks: [
			...INNER_BLOCKS_TEMPLATE,
			[ 'woocommerce/product-add-to-cart' ],
		],
		scope: [ 'block', 'inserter' ],
	} );
}

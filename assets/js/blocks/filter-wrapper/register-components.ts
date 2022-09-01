/**
 * External dependencies
 */
import { registerBlockComponent } from '@woocommerce/blocks-registry';
import { lazy } from '@wordpress/element';

registerBlockComponent( {
	blockName: 'woocommerce/active-filters',
	component: lazy( () => import( '../active-filters/block' ) ),
} );

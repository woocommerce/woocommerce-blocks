/**
 * External dependencies
 */
import { registerBlockComponent } from '@woocommerce/blocks-registry';
import { lazy } from '@wordpress/element';

registerBlockComponent( {
	blockName: 'woocommerce/active-filters',
	component: lazy( () => import( '../active-filters/block' ) ),
} );

registerBlockComponent( {
	blockName: 'woocommerce/price-filter',
	component: lazy( () => import( '../price-filter/block' ) ),
} );

registerBlockComponent( {
	blockName: 'woocommerce/stock-filter',
	component: lazy( () => import( '../stock-filter/block' ) ),
} );

registerBlockComponent( {
	blockName: 'woocommerce/attribute-filter',
	component: lazy( () => import( '../attribute-filter/block-wrapper' ) ),
} );

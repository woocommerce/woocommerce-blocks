/**
 * External dependencies
 */
import { registerBlockComponent } from '@woocommerce/blocks-registry';
import { lazy } from '@wordpress/element';

registerBlockComponent( {
	blockName: 'woocommerce/active-filters',
	component: lazy( () => import( '../active-filters/block-wrapper' ) ),
} );

registerBlockComponent( {
	blockName: 'woocommerce/price-filter',
	component: lazy( () => import( '../price-filter/block-wrapper' ) ),
} );

registerBlockComponent( {
	blockName: 'woocommerce/stock-filter',
	component: lazy( () => import( '../stock-filter/block-wrapper' ) ),
} );

registerBlockComponent( {
	blockName: 'woocommerce/attribute-filter',
	component: lazy( () => import( '../attribute-filter/block-wrapper' ) ),
} );

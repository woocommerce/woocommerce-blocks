/**
 * External dependencies
 */
import { getRegisteredBlockComponents } from '@woocommerce/blocks-registry';

/**
 * Internal dependencies
 */
import { renderParentBlock } from '~/atomic/utils';
import Block from './block';

renderParentBlock( {
	blockName: 'woocommerce/filter-wrapper',
	selector: '.wp-block-woocommerce-filter-wrapper',
	Block,
	blockMap: getRegisteredBlockComponents( 'woocommerce/filter-wrapper' ),
} );

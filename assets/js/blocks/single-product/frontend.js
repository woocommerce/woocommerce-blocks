/**
 * External dependencies
 */
import { StoreNoticesProvider } from '@woocommerce/base-context';
import { getBlockMap } from '@woocommerce/atomic-utils';
import {
	getValidBlockAttributes,
	renderFrontend,
} from '@woocommerce/base-utils';

/**
 * Internal dependencies
 */
import Block from './block';
import blockAttributes from './attributes';

/**
 * Wrapper component to supply the notice provider.
 *
 * @param {*} props
 */
const FrontendBlock = ( props ) => {
	return (
		<StoreNoticesProvider context="woocommerce/single-product">
			<Block { ...props } />
		</StoreNoticesProvider>
	);
};

const getProps = ( el ) => {
	return {
		attributes: getValidBlockAttributes( blockAttributes, el.dataset ),
	};
};

renderFrontend( {
	selector: '.wp-block-woocommerce-single-product',
	Block: FrontendBlock,
	getProps,
	blockMap: getBlockMap( 'woocommerce/single-product' ),
} );

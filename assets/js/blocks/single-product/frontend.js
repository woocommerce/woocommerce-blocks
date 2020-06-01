/**
 * External dependencies
 */
import { StoreNoticesProvider } from '@woocommerce/base-context';
import {
	renderFrontend,
	getValidBlockAttributes,
} from '@woocommerce/base-utils';

/**
 * Internal dependencies
 */
import Block from './block';
import blockAttributes from './attributes';
import { BLOCK_NAME } from './constants';

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
	Block: FrontendBlock,
	blockName: BLOCK_NAME,
	selector: '.wp-block-woocommerce-single-product',
	getProps,
} );

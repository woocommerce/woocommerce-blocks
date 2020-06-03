/**
 * External dependencies
 */
import { StoreNoticesProvider } from '@woocommerce/base-context';
import { getValidBlockAttributes } from '@woocommerce/base-utils';
import { renderParentBlock } from '@woocommerce/atomic-utils';
import BlockErrorBoundary from '@woocommerce/base-components/block-error-boundary';

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
		<BlockErrorBoundary>
			<StoreNoticesProvider context="woocommerce/single-product">
				<Block { ...props } />
			</StoreNoticesProvider>
		</BlockErrorBoundary>
	);
};

const getProps = ( el ) => {
	return {
		attributes: getValidBlockAttributes( blockAttributes, el.dataset ),
	};
};

renderParentBlock( {
	Block: FrontendBlock,
	blockName: BLOCK_NAME,
	selector: '.wp-block-woocommerce-single-product',
	getProps,
} );

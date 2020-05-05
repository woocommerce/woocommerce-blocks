/**
 * External dependencies
 */
import { StoreNoticesProvider } from '@woocommerce/base-context';

/**
 * Internal dependencies
 */
import Block from './block';
import blockAttributes from './attributes';
import {
	getAttributesFromDataset,
	renderFrontend,
} from '../../utils/render-frontend.js';

/**
 * Wrapper component to supply the notice provider.
 *
 * @param {*} props
 */
const FrontendBlock = ( props ) => {
	return (
		<StoreNoticesProvider context="wc/single-product">
			<Block { ...props } />
		</StoreNoticesProvider>
	);
};

const getProps = ( el ) => {
	return {
		attributes: getAttributesFromDataset( blockAttributes, el.dataset ),
	};
};

renderFrontend(
	'.wp-block-woocommerce-single-product',
	FrontendBlock,
	getProps
);

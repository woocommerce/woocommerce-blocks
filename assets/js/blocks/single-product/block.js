/**
 * External dependencies
 */
import {
	InnerBlockLayoutContextProvider,
	ProductDataContextProvider,
	useProductDataContext,
} from '@woocommerce/shared-context';

/**
 * Internal dependencies
 */
import { BLOCK_NAME } from './constants';

/**
 * The Single Product Block.
 */
const Block = ( { attributes, children } ) => {
	return (
		<ProductDataContextProvider productId={ attributes.productId }>
			<Layout children={ children } />
		</ProductDataContextProvider>
	);
};

const Layout = ( { children } ) => {
	const className = 'wc-block-single-product';
	const { isLoading } = useProductDataContext();

	return (
		<InnerBlockLayoutContextProvider
			parentName={ BLOCK_NAME }
			parentClassName={ className }
			isLoading={ isLoading }
		>
			<div className={ className }>{ children }</div>
		</InnerBlockLayoutContextProvider>
	);
};

export default Block;

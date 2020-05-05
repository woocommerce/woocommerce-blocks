/**
 * External dependencies
 */
import {
	InnerBlockConfigurationProvider,
	ProductLayoutContextProvider,
} from '@woocommerce/base-context';
import SingleProduct from '@woocommerce/base-components/single-product';
import { withProduct } from '@woocommerce/block-hocs';

const layoutContextConfig = {
	layoutStyleClassPrefix: 'wc-block-single-product',
};

const parentBlockConfig = { parentName: 'woocommerce/single-product' };

/**
 * The Single Product Block.
 */
const Block = ( { attributes, isLoading, product } ) => {
	if ( isLoading || ! product ) {
		return <>TODO</>;
	}

	return (
		<InnerBlockConfigurationProvider value={ parentBlockConfig }>
			<ProductLayoutContextProvider value={ layoutContextConfig }>
				<SingleProduct product={ product } attributes={ attributes } />
			</ProductLayoutContextProvider>
		</InnerBlockConfigurationProvider>
	);
};

export default withProduct( Block );

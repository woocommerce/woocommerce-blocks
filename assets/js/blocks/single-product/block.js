/**
 * External dependencies
 */
import { InnerBlockConfigurationProvider } from '@woocommerce/base-context';
import SingleProduct from '@woocommerce/base-components/single-product';
import { withProduct } from '@woocommerce/block-hocs';

/**
 * Internal dependencies
 */
import { INNER_BLOCK_CONTEXT_CONFIG } from './constants';
import './style.scss';

/**
 * The Single Product Block.
 */
const Block = ( { attributes, isLoading, product } ) => {
	if ( isLoading || ! product ) {
		return <>TODO</>;
	}

	return (
		<InnerBlockConfigurationProvider value={ INNER_BLOCK_CONTEXT_CONFIG }>
			<SingleProduct product={ product } attributes={ attributes } />
		</InnerBlockConfigurationProvider>
	);
};

export default withProduct( Block );

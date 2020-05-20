/**
 * External dependencies
 */
import { InnerBlockConfigurationProvider } from '@woocommerce/shared-context';
import SingleProduct from '@woocommerce/base-components/single-product';
import { withProduct } from '@woocommerce/block-hocs';

/**
 * Internal dependencies
 */
import { BLOCK_NAME } from './constants';
import './style.scss';

/**
 * The Single Product Block.
 */
const Block = ( { attributes, isLoading, product } ) => {
	if ( isLoading || ! product ) {
		return <>TODO</>;
	}

	return (
		<InnerBlockConfigurationProvider
			parentName={ BLOCK_NAME }
			layoutStyleClassPrefix="wc-block-single-product"
		>
			<SingleProduct product={ product } attributes={ attributes } />
		</InnerBlockConfigurationProvider>
	);
};

export default withProduct( Block );

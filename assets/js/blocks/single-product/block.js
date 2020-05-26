/**
 * External dependencies
 */
import {
	InnerBlockConfigurationProvider,
	ProductDataContextProvider,
} from '@woocommerce/shared-context';
import { withProduct } from '@woocommerce/block-hocs';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { BLOCK_NAME } from './constants';
import './style.scss';

/**
 * The Single Product Block.
 */
const Block = ( { isLoading, product, children } ) => {
	const baseClassName = 'wc-block-single-product';

	return (
		<InnerBlockConfigurationProvider
			parentName={ BLOCK_NAME }
			layoutStyleClassPrefix={ baseClassName }
		>
			<ProductDataContextProvider product={ product }>
				<div
					className={ classnames( baseClassName, {
						'is-loading': isLoading,
					} ) }
				>
					{ children }
				</div>
			</ProductDataContextProvider>
		</InnerBlockConfigurationProvider>
	);
};

export default withProduct( Block );

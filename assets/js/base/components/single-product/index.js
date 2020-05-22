/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
	useInnerBlockConfigurationContext,
	ProductDataContextProvider,
} from '@woocommerce/shared-context';

const SingleProduct = ( { product, children } ) => {
	const { layoutStyleClassPrefix } = useInnerBlockConfigurationContext();
	const isLoading = Object.keys( product ).length === 0;
	const classes = classnames( `${ layoutStyleClassPrefix }__product`, {
		'is-loading': isLoading,
	} );

	return (
		<div className={ classes } aria-hidden={ isLoading }>
			<ProductDataContextProvider product={ product }>
				{ children }
			</ProductDataContextProvider>
		</div>
	);
};

SingleProduct.propTypes = {
	attributes: PropTypes.object.isRequired,
	product: PropTypes.object,
};

export default SingleProduct;

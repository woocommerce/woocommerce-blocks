/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useProductLayoutContext } from '@woocommerce/base-context';
import Summary from '@woocommerce/base-components/summary';

const ProductSummary = ( { className, product } ) => {
	const { layoutStyleClassPrefix } = useProductLayoutContext();

	if ( ! product.short_description && ! product.description ) {
		return null;
	}

	return (
		<Summary
			className={ classnames(
				className,
				`${ layoutStyleClassPrefix }__product-summary`
			) }
			source={
				product.short_description
					? product.short_description
					: product.description
			}
			maxWords={ 150 }
		/>
	);
};

ProductSummary.propTypes = {
	className: PropTypes.string,
	product: PropTypes.object.isRequired,
};

export default ProductSummary;

/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import Summary from '@woocommerce/base-components/summary';

/**
 * Internal dependencies
 */
import ProductVariationData from '../product-variation-data';
import './style.scss';

const ProductMetadata = ( { summary, variation } ) => {
	return (
		<div className="wc-block-product-metadata">
			{ summary && <Summary source={ summary } maxWords={ 15 } /> }
			{ variation && <ProductVariationData variation={ variation } /> }
		</div>
	);
};

ProductMetadata.propTypes = {
	summary: PropTypes.string,
	variation: PropTypes.array,
};

export default ProductMetadata;

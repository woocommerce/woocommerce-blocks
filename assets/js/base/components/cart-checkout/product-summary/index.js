/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import Summary from '@woocommerce/base-components/summary';
import { getSetting } from '@woocommerce/settings';

/**
 * Returns an element containing a summary of the product.
 */
const ProductSummary = ( { shortDescription = '', fullDescription = '' } ) => {
	const source = shortDescription ? shortDescription : fullDescription;

	if ( ! source ) {
		return null;
	}

	const countType = getSetting( 'wordCountType', 'words' );

	return (
		<Summary source={ source } maxLength={ 15 } countType={ countType } />
	);
};

ProductSummary.propTypes = {
	shortDescription: PropTypes.string,
	fullDescription: PropTypes.string,
};

export default ProductSummary;

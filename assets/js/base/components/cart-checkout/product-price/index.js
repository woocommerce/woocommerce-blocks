/**
 * External dependencies
 */
import FormattedMonetaryAmount from '@woocommerce/base-components/formatted-monetary-amount';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import './style.scss';

const ProductPrice = ( { currency, regularValue, value } ) => {
	return (
		<>
			{ Number.isFinite( regularValue ) && regularValue !== value && (
				<FormattedMonetaryAmount
					className="wc-block-product-price--regular"
					currency={ currency }
					value={ regularValue }
				/>
			) }
			<FormattedMonetaryAmount
				className="wc-block-product-price"
				currency={ currency }
				value={ value }
			/>
		</>
	);
};

ProductPrice.propTypes = {
	currency: PropTypes.object.isRequired,
	value: PropTypes.number.isRequired,
	regularValue: PropTypes.number,
};

export default ProductPrice;

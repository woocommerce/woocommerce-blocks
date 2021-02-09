/**
 * External dependencies
 */
import { createInterpolateElement } from 'wordpress-element';
import { __ } from '@wordpress/i18n';
import FormattedMonetaryAmount from '@woocommerce/base-components/formatted-monetary-amount';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import ProductBadge from '../product-badge';

/**
 * ProductSaleBadge
 *
 * @param {Object} props            Incoming props.
 * @param {Object} props.currency   Currency object.
 * @param {number} props.saleAmount Discounted amount.
 * @param {string} [props.suffix]   String to add after price. Will be separated from the price by a space.
 * @return {*} The component.
 */
const ProductSaleBadge = ( { currency, saleAmount, suffix = '' } ) => {
	if ( ! saleAmount || saleAmount <= 0 ) {
		return null;
	}
	return (
		<ProductBadge className="wc-block-components-sale-badge">
			{ createInterpolateElement(
				/* translators: <price/> will be replaced by the discount amount */
				__( 'Save <price/>', 'woo-gutenberg-products-block' ),
				{
					price: (
						<FormattedMonetaryAmount
							currency={ currency }
							value={ saleAmount }
						/>
					),
				}
			) }
			{ suffix && ' ' }
			{ suffix }
		</ProductBadge>
	);
};

ProductSaleBadge.propTypes = {
	currency: PropTypes.object,
	saleAmount: PropTypes.number,
	suffix: PropTypes.string,
};

export default ProductSaleBadge;

/**
 * External dependencies
 */
import { useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import QuantitySelector from '@woocommerce/base-components/quantity-selector';
import FormattedMonetaryAmount from '@woocommerce/base-components/formatted-monetary-amount';
import { getCurrency, formatPrice } from '@woocommerce/base-utils';

/**
 * Return the difference between two price amounts, e.g. a discount.
 *
 * @param {string} subtotal Currency value in minor unit, e.g. cents.
 * @param {string} total Currency value in minor unit, e.g. cents.
 * @return {number} The difference (discount).
 */
const calcPriceDifference = ( subtotal, total ) => {
	const subtotalValue = parseInt( subtotal, 10 );
	const totalValue = parseInt( total, 10 );

	return subtotalValue - totalValue;
};

const CartLineItemRow = ( { lineItem } ) => {
	const { name, images, quantity, totals } = lineItem;
	const { line_total: total, line_subtotal: subtotal } = totals;

	const imageProps = {};
	if ( images && images.length ) {
		imageProps.src = lineItem.images[ 0 ].src || '';
		imageProps.alt = lineItem.images[ 0 ].alt || '';
		imageProps.srcSet = lineItem.images[ 0 ].srcset || '';
		imageProps.sizes = lineItem.images[ 0 ].sizes || '';
	}

	const [ lineQuantity, setLineQuantity ] = useState( quantity );
	const currency = getCurrency();

	const discountAmount = calcPriceDifference( subtotal, total );
	let fullPrice = null,
		discountBadge = null;
	if ( discountAmount > 0 ) {
		fullPrice = (
			<div className="wc-block-cart-item__full-price">
				<FormattedMonetaryAmount
					currency={ currency }
					value={ subtotal }
				/>
			</div>
		);
		discountBadge = (
			<div className="wc-block-cart-item__discount-badge">
				{ sprintf(
					/* translators: %s discount amount */
					__( 'Save %s!', 'woo-gutenberg-products-block' ),
					formatPrice( discountAmount, currency )
				) }
			</div>
		);
	}

	// We use this in two places so we can stack the quantity selector under
	// product info on smaller screens.
	const quantitySelector = ( className ) => {
		return (
			<QuantitySelector
				className={ className }
				quantity={ lineQuantity }
				onChange={ setLineQuantity }
			/>
		);
	};

	return (
		<tr>
			<td className="wc-block-cart-item__product">
				<div className="wc-block-cart-item__product-wrapper">
					<img { ...imageProps } alt={ imageProps.alt } />
					<div className="wc-block-cart-item__product-details">
						{ name }
						{ quantitySelector(
							'wc-block-cart-item__quantity-stacked'
						) }
					</div>
				</div>
			</td>
			<td className="wc-block-cart-item__quantity">
				<div>
					{ quantitySelector() }
					<div className="wc-block-cart-item__remove-link">
						{ __( 'Remove item', 'woo-gutenberg-products-block' ) }
					</div>
				</div>
			</td>
			<td className="wc-block-cart-item__total">
				{ fullPrice }
				<div className="wc-block-cart-item__line-total">
					<FormattedMonetaryAmount
						currency={ currency }
						value={ total }
					/>
				</div>
				{ discountBadge }
			</td>
		</tr>
	);
};

CartLineItemRow.propTypes = {
	lineItem: PropTypes.shape( {
		name: PropTypes.string.isRequired,
		images: PropTypes.array.isRequired,
		quantity: PropTypes.number.isRequired,
		totals: PropTypes.shape( {
			line_subtotal: PropTypes.string.isRequired,
			line_total: PropTypes.string.isRequired,
		} ).isRequired,
	} ),
};

export default CartLineItemRow;

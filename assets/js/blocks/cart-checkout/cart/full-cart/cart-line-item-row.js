/**
 * External dependencies
 */
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import QuantitySelector from '@woocommerce/base-components/quantity-selector';
import FormattedMonetaryAmount from '@woocommerce/base-components/formatted-monetary-amount';
import { getCurrency } from '@woocommerce/base-utils';

const CartLineItemRow = ( { lineItem } ) => {
	const { name, images, quantity, totals } = lineItem;
	const { line_total: total, line_subtotal: subtotal } = totals;

	const image = images.length ? images[ 0 ] : {};
	const imageAltText = image.alt || '';

	const [ lineQuantity, setLineQuantity ] = useState( quantity );
	const currency = getCurrency();

	const isDiscounted = subtotal !== total;
	const fullPrice = isDiscounted ? (
		<div className="wc-block-cart__table-full-price">
			<FormattedMonetaryAmount currency={ currency } value={ subtotal } />
		</div>
	) : (
		undefined
	);

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
		<tr className="wc-block-cart__table-item">
			<td className="wc-block-cart__table-image">
				<img { ...image } alt={ imageAltText } />
			</td>
			<td className="wc-block-cart__table-product">
				<div>{ name }</div>
				{ quantitySelector( 'wc-block-cart__table-quantity-stacked' ) }
			</td>
			<td className="wc-block-cart__table-quantity-column">
				<div>
					{ quantitySelector() }
					<div className="wc-block-cart__table-remove-link">
						{ __( 'Remove item', 'woo-gutenberg-products-block' ) }
					</div>
				</div>
			</td>
			<td className="wc-block-cart__table-total">
				<div>
					{ fullPrice }
					<div>
						<FormattedMonetaryAmount
							currency={ currency }
							value={ total }
						/>
					</div>
				</div>
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

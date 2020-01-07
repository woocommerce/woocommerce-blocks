/**
 * External dependencies
 */
import { useState } from '@wordpress/element';
import PropTypes from 'prop-types';
import QuantitySelector from '@woocommerce/base-components/cart/quantity-selector';
import FormattedMonetaryAmount from '@woocommerce/base-components/formatted-monetary-amount';
import { getCurrency } from '@woocommerce/base-utils';

const CartProductsTableItem = ( {
	name,
	imageUrl,
	imageAltText,
	quantity,
	subtotal,
	total,
} ) => {
	const [ lineQuantity, setLineQuantity ] = useState( quantity );
	const currency = getCurrency();

	const discounted = subtotal !== total;
	const fullPrice = discounted ? (
		<div className="wc-block-cart__items-full-price">
			<FormattedMonetaryAmount currency={ currency } value={ subtotal } />
		</div>
	) : (
		undefined
	);

	return (
		<tr>
			<td className="wc-block-cart__items-image">
				<img src={ imageUrl } alt={ imageAltText } />
			</td>
			<td>{ name }</td>
			<td>
				<QuantitySelector
					quantity={ lineQuantity }
					onChange={ setLineQuantity }
				/>
			</td>
			<td>
				{ fullPrice }
				<div>
					<FormattedMonetaryAmount
						currency={ currency }
						value={ total }
					/>
				</div>
			</td>
		</tr>
	);
};

CartProductsTableItem.propTypes = {
	name: PropTypes.string,
	imageUrl: PropTypes.string,
	imageAltText: PropTypes.string,
	quantity: PropTypes.number,
	subtotal: PropTypes.string,
	total: PropTypes.string,
};

export default CartProductsTableItem;

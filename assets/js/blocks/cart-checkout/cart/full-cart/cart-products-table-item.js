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
	total,
} ) => {
	const [ lineQuantity, setLineQuantity ] = useState( quantity );
	const currency = getCurrency();

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
				<FormattedMonetaryAmount
					currency={ currency }
					value={ total }
				/>
			</td>
		</tr>
	);
};

CartProductsTableItem.propTypes = {
	name: PropTypes.string,
	imageUrl: PropTypes.string,
	imageAltText: PropTypes.string,
	quantity: PropTypes.number,
	total: PropTypes.string,
};

export default CartProductsTableItem;

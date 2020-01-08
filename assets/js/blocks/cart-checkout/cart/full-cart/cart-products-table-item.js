/**
 * External dependencies
 */
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
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
		<div className="wc-block-cart__table-full-price">
			<FormattedMonetaryAmount currency={ currency } value={ subtotal } />
		</div>
	) : (
		undefined
	);

	return (
		<div className="wc-block-cart__table-item">
			<div className="wc-block-cart__table-product">
				<div className="wc-block-cart__table-image">
					<img src={ imageUrl } alt={ imageAltText } />
				</div>
				<div>{ name }</div>
			</div>
			<div className="wc-block-cart__table-quantity">
				<div>
					<QuantitySelector
						quantity={ lineQuantity }
						onChange={ setLineQuantity }
					/>
					<div className="wc-block-cart__table-remove-link" href="#">
						{ __( 'Remove item', 'woo-gutenberg-products-block' ) }
					</div>
				</div>
			</div>
			<div className="wc-block-cart__table-total">
				<div>
					{ fullPrice }
					<div>
						<FormattedMonetaryAmount
							currency={ currency }
							value={ total }
						/>
					</div>
				</div>
			</div>
		</div>
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

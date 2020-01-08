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

	// We use this in two places so we can stack the quantity selector under
	// product info on smaller screens.
	const quantitySelector = ( classes ) => {
		return (
			<QuantitySelector
				className={ classes }
				quantity={ lineQuantity }
				onChange={ setLineQuantity }
			/>
		);
	};

	return (
		<div className="wc-block-cart__table-item">
			<div className="wc-block-cart__table-image">
				<img src={ imageUrl } alt={ imageAltText } />
			</div>
			<div className="wc-block-cart__table-product">
				<div>{ name }</div>
				{ quantitySelector( 'wc-block-cart__table-quantity-stacked' ) }
			</div>
			<div className="wc-block-cart__table-quantity-column">
				<div>
					{ quantitySelector() }
					<div className="wc-block-cart__table-remove-link">
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

/**
 * External dependencies
 */
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import QuantitySelector from '@woocommerce/base-components/quantity-selector';
import FormattedMonetaryAmount from '@woocommerce/base-components/formatted-monetary-amount';
import { getCurrency } from '@woocommerce/base-utils';

const CartProductsTableItem = ( {
	name,
	imageUrl,
	imageAltText,
	imageSrcSet,
	imageSizes,
	quantity,
	subtotal,
	total,
} ) => {
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
				<img
					src={ imageUrl }
					alt={ imageAltText }
					srcSet={ imageSrcSet }
					sizes={ imageSizes }
				/>
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

CartProductsTableItem.propTypes = {
	name: PropTypes.string,
	imageUrl: PropTypes.string,
	imageAltText: PropTypes.string,
	quantity: PropTypes.number,
	subtotal: PropTypes.string,
	total: PropTypes.string,
};

export default CartProductsTableItem;

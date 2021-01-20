/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { DISPLAY_CART_PRICES_INCLUDING_TAX } from '@woocommerce/block-settings';
import PropTypes from 'prop-types';
import { TotalsItem } from '@woocommerce/blocks-checkout';

const Subtotal = ( { currency, values } ) => {
	const { total_items: totalItems, total_items_tax: totalItemsTax } = values;
	const itemsValue = parseInt( totalItems, 10 );
	const itemsTaxValue = parseInt( totalItemsTax, 10 );

	return (
		<TotalsItem
			currency={ currency }
			label={ __( 'Subtotal', 'woo-gutenberg-products-block' ) }
			value={
				DISPLAY_CART_PRICES_INCLUDING_TAX
					? itemsValue + itemsTaxValue
					: itemsValue
			}
		/>
	);
};

Subtotal.propTypes = {
	currency: PropTypes.object.isRequired,
	values: PropTypes.shape( {
		total_items: PropTypes.string,
		total_items_tax: PropTypes.string,
	} ).isRequired,
};

export default Subtotal;

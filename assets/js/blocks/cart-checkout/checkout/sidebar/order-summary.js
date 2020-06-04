/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import { useContainerWidthContext } from '@woocommerce/base-context';
import DisclosureWidget from '@woocommerce/base-components/disclosure-widget';

/**
 * Internal dependencies
 */
import CheckoutOrderSummaryItem from './order-summary-item.js';

const CheckoutOrderSummary = ( { cartItems = [] } ) => {
	const { isLarge, hasContainerWidth } = useContainerWidthContext();

	if ( ! hasContainerWidth ) {
		return null;
	}

	return (
		<DisclosureWidget
			className="wc-block-order-summary"
			initialOpen={ isLarge }
			title={
				<span className="wc-block-order-summary__button-text">
					{ __( 'Order summary', 'woo-gutenberg-products-block' ) }
				</span>
			}
			titleTag="h2"
		>
			<div className="wc-block-order-summary__content">
				{ cartItems.map( ( cartItem ) => {
					return (
						<CheckoutOrderSummaryItem
							key={ cartItem.key }
							cartItem={ cartItem }
						/>
					);
				} ) }
			</div>
		</DisclosureWidget>
	);
};

CheckoutOrderSummary.propTypes = {
	cartItems: PropTypes.arrayOf(
		PropTypes.shape( { key: PropTypes.string.isRequired } )
	),
};

export default CheckoutOrderSummary;

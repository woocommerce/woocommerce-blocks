/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Card, CardBody, PanelBody, PanelRow } from 'wordpress-components';
import { Icon, cart } from '@woocommerce/icons';
import PropTypes from 'prop-types';
import { useContainerQueryContext } from '@woocommerce/base-context';

/**
 * Internal dependencies
 */
import CheckoutOrderSummaryItem from './order-summary-item.js';

const CheckoutOrderSummary = ( { cartItems = [] } ) => {
	const { isLarge, isLoading } = useContainerQueryContext();

	if ( isLoading ) {
		return null;
	}

	return (
		<Card isElevated={ true }>
			<CardBody>
				<PanelBody
					className="wc-block-order-summary"
					title={
						<>
							<Icon
								className="wc-block-order-summary__button-icon"
								srcElement={ cart }
							/>
							<span className="wc-block-order-summary__button-text">
								{ __(
									'Order summary',
									'woo-gutenberg-products-block'
								) }
							</span>
						</>
					}
					initialOpen={ isLarge }
				>
					<PanelRow className="wc-block-order-summary__row">
						{ cartItems.map( ( cartItem ) => {
							return (
								<CheckoutOrderSummaryItem
									key={ cartItem.key }
									cartItem={ cartItem }
								/>
							);
						} ) }
					</PanelRow>
				</PanelBody>
			</CardBody>
		</Card>
	);
};

CheckoutOrderSummary.propTypes = {
	cartItems: PropTypes.arrayOf(
		PropTypes.shape( { key: PropTypes.string.isRequired } )
	),
};

export default CheckoutOrderSummary;

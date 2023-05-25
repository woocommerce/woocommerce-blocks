/**
 * External dependencies
 */

import { __ } from '@wordpress/i18n';

const isConversionPossible = () => {
	return false;
};

const getDescription = () => {
	return __(
		'This block represents the <strong>thankyou.php</strong> classic template. The actual rendered template may appear different from this placeholder.',
		'woo-gutenberg-products-block'
	);
};

const getSkeleton = () => {
	return (
		<div className="woocommerce-page">
			<div className="woocommerce-order">
				<h2 style={ { marginTop: 0 } }>Order received</h2>
				<p className="woocommerce-notice woocommerce-notice--success woocommerce-thankyou-order-received">
					Thank you. Your order has been received.
				</p>
				<ul className="woocommerce-order-overview woocommerce-thankyou-order-details order_details">
					<li className="woocommerce-order-overview__order order">
						Order number: <strong>123</strong>
					</li>
					<li className="woocommerce-order-overview__date date">
						Date: <strong>May 25, 2023</strong>
					</li>
					<li className="woocommerce-order-overview__email email">
						Email: <strong>shopper@woo.com</strong>
					</li>
					<li className="woocommerce-order-overview__total total">
						Total: <strong>$20</strong>
					</li>
					<li className="woocommerce-order-overview__payment-method method">
						Payment method: <strong>Credit Card</strong>
					</li>
				</ul>

				<section className="woocommerce-order-details">
					<h2 className="woocommerce-order-details__title">
						Order details
					</h2>
					<table className="woocommerce-table woocommerce-table--order-details shop_table order_details">
						<thead>
							<tr>
								<th className="woocommerce-table__product-name product-name">
									Product
								</th>
								<th className="woocommerce-table__product-table product-total">
									Total
								</th>
							</tr>
						</thead>
						<tbody>
							<tr className="woocommerce-table__line-item order_item">
								<td className="woocommerce-table__product-name product-name">
									Product{ ' ' }
									<strong className="product-quantity">
										×&nbsp;2
									</strong>{ ' ' }
								</td>

								<td className="woocommerce-table__product-total product-total">
									$20.00
								</td>
							</tr>
						</tbody>
						<tfoot>
							<tr>
								<th scope="row">Subtotal:</th>
								<td>$20.00</td>
							</tr>
							<tr>
								<th scope="row">Total:</th>
								<td>$20.00</td>
							</tr>
						</tfoot>
					</table>
				</section>

				<section className="woocommerce-customer-details">
					<section className="woocommerce-columns woocommerce-columns--2 woocommerce-columns--addresses col2-set addresses">
						<div className="woocommerce-column woocommerce-column--1 woocommerce-column--billing-address col-1">
							<h2 className="woocommerce-column__title">
								Billing address
							</h2>
							<address>
								123 Main St
								<br />
								New York, NY 10001
								<br />
								United States (US)
							</address>
						</div>

						<div className="woocommerce-column woocommerce-column--2 woocommerce-column--shipping-address col-2">
							<h2 className="woocommerce-column__title">
								Shipping address
							</h2>
							<address>
								123 Main St
								<br />
								New York, NY 10001
								<br />
								United States (US)
							</address>
						</div>
					</section>
				</section>
			</div>
		</div>
	);
};

export { isConversionPossible, getDescription, getSkeleton };

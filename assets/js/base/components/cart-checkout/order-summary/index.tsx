/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import { useContainerWidthContext } from '@woocommerce/base-context';
import { Panel } from '@woocommerce/blocks-checkout';
import type { CartItem } from '@woocommerce/types';

/**
 * Internal dependencies
 */
import OrderSummaryItem from './order-summary-item';
import './style.scss';

interface OrderSummaryProps {
	className: string;
	cartItems: CartItem[];
}

const OrderSummary = ( {
	className = '',
	cartItems = [],
}: OrderSummaryProps ): null | JSX.Element => {
	const { isLarge, hasContainerWidth } = useContainerWidthContext();

	if ( ! hasContainerWidth ) {
		return null;
	}

	return (
		<Panel
			className={ classnames(
				'wc-block-components-order-summary',
				className
			) }
			initialOpen={ isLarge }
			hasBorder={ false }
			title={
				<span className="wc-block-components-order-summary__button-text">
					{ __( 'Order summary', 'woo-gutenberg-products-block' ) }
				</span>
			}
			titleTag="h2"
		>
			<div className="wc-block-components-order-summary__content">
				{ cartItems.map( ( cartItem ) => {
					return (
						<OrderSummaryItem
							key={ cartItem.key }
							cartItem={ cartItem }
						/>
					);
				} ) }
			</div>
		</Panel>
	);
};

export default OrderSummary;

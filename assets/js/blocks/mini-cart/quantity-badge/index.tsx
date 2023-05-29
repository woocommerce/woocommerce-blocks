/**
 * External dependencies
 */
import { miniCart } from '@woocommerce/icons';
import { Icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import './style.scss';

interface Props {
	count: number;
	colorClassNames?: string;
	iconColor?: string;
	productCountColor?: string;
}

const QuantityBadge = ( {
	count,
	iconColor,
	productCountColor,
}: Props ): JSX.Element => {
	console.log( productCountColor );
	return (
		<span className="wc-block-mini-cart__quantity-badge">
			<Icon
				className="wc-block-mini-cart__icon"
				color={ iconColor }
				size={ 20 }
				icon={ miniCart }
			/>
			<span
				className="wc-block-mini-cart__badge"
				color={ productCountColor }
			>
				{ count > 0 ? count : '' }
			</span>
		</span>
	);
};

export default QuantityBadge;

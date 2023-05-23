/**
 * External dependencies
 */
import { cartOutline, bag, bagAlt } from '@woocommerce/icons';
import { Icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import './style.scss';

interface Props {
	count: number;
	colorClassNames?: string;
	icon?: '' | 'cart' | 'bag' | 'bag-alt';
}

const QuantityBadge = ( { count, icon }: Props ): JSX.Element => {
	let miniCartIcon = cartOutline;
	if ( icon === 'bag' ) {
		miniCartIcon = bag;
	} else if ( icon === 'bag-alt' ) {
		miniCartIcon = bagAlt;
	}

	return (
		<span className="wc-block-mini-cart__quantity-badge">
			<Icon
				className="wc-block-mini-cart__icon"
				size={ 20 }
				icon={ miniCartIcon }
			/>
			<span className="wc-block-mini-cart__badge">
				{ count > 0 ? count : '' }
			</span>
		</span>
	);
};

export default QuantityBadge;

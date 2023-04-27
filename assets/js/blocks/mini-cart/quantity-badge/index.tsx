/**
 * External dependencies
 */
import { miniCart, miniCartWithBadge } from '@woocommerce/icons';
import { Icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import './style.scss';

interface Props {
	count: number;
	colorClassNames?: string;
}

const QuantityBadge = ( { count }: Props ): JSX.Element => {
	return (
		<span className="wc-block-mini-cart__quantity-badge">
			{ count > 0 ? (
				<>
					<Icon
						className="wc-block-mini-cart__icon"
						size={ 20 }
						icon={ miniCartWithBadge }
					/>
					<span className="wc-block-mini-cart__badge">{ count }</span>
				</>
			) : (
				<Icon
					className="wc-block-mini-cart__icon"
					size={ 20 }
					icon={ miniCart }
				/>
			) }
		</span>
	);
};

export default QuantityBadge;

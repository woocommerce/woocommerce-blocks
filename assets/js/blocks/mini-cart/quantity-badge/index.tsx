/**
 * External dependencies
 */
import { miniCart, miniCartBag, miniCartBasket } from '@woocommerce/icons';
import { Icon } from '@wordpress/icons';
import { getSettingWithCoercion } from '@woocommerce/settings';
import { isString } from '@woocommerce/types';

/**
 * Internal dependencies
 */
import './style.scss';

interface Props {
	count: number;
	colorClassNames?: string;
	style?: Record< string, string | undefined >;
}

const getIconSetting: string = getSettingWithCoercion(
	'miniCartIcon',
	'default',
	isString
);

const iconSettings: { [ key: string ]: JSX.Element } = {
	default: miniCart,
	miniCart,
	miniCartBasket,
	miniCartBag,
};

const QuantityBadge = ( {
	count,
	colorClassNames,
	style,
}: Props ): JSX.Element => {
	return (
		<span className="wc-block-mini-cart__quantity-badge">
			<Icon
				className="wc-block-mini-cart__icon"
				size={ 20 }
				icon={ iconSettings[ getIconSetting ] }
			/>
			<span
				className={ `wc-block-mini-cart__badge ${ colorClassNames }` }
				style={ style }
			>
				{ count }
			</span>
		</span>
	);
};

export default QuantityBadge;

/**
 * External dependencies
 */
import { Icon, miniCart } from '@woocommerce/icons';
import classnames from 'classnames';
import { getColorClassName } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import './style.scss';

interface Props {
	count: number;
	backgroundColor?: string;
	textColor?: string;
}

const isColorValue = ( color?: string ) => {
	if ( ! color ) return false;
	return (
		color.startsWith( 'rgb(' ) ||
		color.startsWith( 'rgba(' ) ||
		color.startsWith( '#' ) ||
		color.startsWith( 'hsl(' )
	);
};

const QuantityBadge = ( {
	count,
	backgroundColor,
	textColor,
}: Props ): JSX.Element => {
	const colorClass = getColorClassName( 'color', textColor );
	const backgroundClass = getColorClassName(
		'background-color',
		backgroundColor
	);
	return (
		<span className="wc-block-mini-cart__quantity-badge">
			<Icon
				className="wc-block-mini-cart__icon"
				size={ 20 }
				srcElement={ miniCart }
			/>
			<span
				className={ classnames( 'wc-block-mini-cart__badge', {
					[ colorClass ]: colorClass,
					[ backgroundClass ]: backgroundClass,
					'has-background': backgroundClass,
				} ) }
				style={ {
					backgroundColor: isColorValue( backgroundColor )
						? backgroundColor
						: undefined,
					color: isColorValue( textColor ) ? textColor : undefined,
				} }
			>
				{ count }
			</span>
		</span>
	);
};

export default QuantityBadge;

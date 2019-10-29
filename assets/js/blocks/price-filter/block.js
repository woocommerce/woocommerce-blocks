/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import PriceSlider from '../../base/components/price-slider';
import { CURRENCY } from '@woocommerce/settings';

/**
 * Component displaying a price filter.
 */
const PriceFilterBlock = ( { attributes } ) => {
	const { showInputFields, showFilterButton } = attributes;
	const classes = classnames( 'wc-block-price-slider' );
	return (
		<div className={ classes }>
			<PriceSlider
				min={ 0 }
				max={ 200 }
				step={ 10 }
				currencySymbol={ CURRENCY.symbol }
				priceFormat={ CURRENCY.price_format }
				showInputFields={ showInputFields }
				showFilterButton={ showFilterButton }
				onChange={ () => {} }
			/>
		</div>
	);
};

export default PriceFilterBlock;

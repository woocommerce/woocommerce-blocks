/**
 * External dependencies
 */
import { Component } from 'react';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import PriceSlider from '../../frontend-components/price-slider';
import { currency } from '@woocommerce/settings';

/**
 * Component displaying a price filter.
 */
class PriceFilterBlock extends Component {
	render() {
		const { attributes } = this.props;
		const { showInputFields } = attributes;
		const classes = classnames(
			'wc-block-price-slider',
		);
		return (
			<div className={ classes }>
				<PriceSlider
					min={ 0 }
					max={ 200 }
					step={ 10 }
					currencySymbol={ currency.symbol }
					priceFormat={ currency.price_format }
					showInputFields={ showInputFields }
				/>
			</div>
		);
	}
}

export default PriceFilterBlock;

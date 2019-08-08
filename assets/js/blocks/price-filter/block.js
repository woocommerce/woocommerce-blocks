/**
 * External dependencies
 */
import { Component } from 'react';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import PriceSlider from '../../frontend-components/price-slider';
import { currency } from '../../data';

/**
 * Component displaying a price filter.
 */
class PriceFilterBlock extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			min: 0,
			max: 200,
		};
		this.onChange = this.onChange.bind( this );
	}

	onChange( values ) {
		// This is probably temporary - to test the values can be pulled from the PriceSlider component.
		this.setState( {
			min: values.min,
			max: values.max,
		} );
	}

	render() {
		const classes = classnames(
			'wc-block-price-slider',
		);
		const { min, max } = this.state;

		return (
			<div className={ classes }>
				<p>Current Min: { min }</p>
				<p>Current Max: { max }</p>
				<PriceSlider
					min={ 0 }
					max={ 200 }
					step={ 10 }
					onChange={ this.onChange }
					currencySymbol={ currency.symbol }
					priceFormat={ currency.price_format }
				/>
			</div>
		);
	}
}

export default PriceFilterBlock;

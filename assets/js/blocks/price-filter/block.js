/**
 * External dependencies
 */
import { Component } from 'react';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import PriceSlider from '../../frontend-components/price-slider';

/**
 * Component displaying a price filter.
 */
class PriceFilterBlock extends Component {
	render() {
		const classes = classnames(
			'wc-block-price-slider',
		);

		return (
			<div className={ classes }>
				<PriceSlider />
			</div>
		);
	}
}

export default PriceFilterBlock;

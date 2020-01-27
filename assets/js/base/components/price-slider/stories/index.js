/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import PriceSlider from '../';

export default {
	title: 'WooCommerce Blocks/base/PriceSlider',
	component: PriceSlider,
};

export const Default = () => (
	<div>
		<PriceSlider
			onChange={ () => {} }
			minConstraint={ 0 }
			maxConstraint={ 1000 }
			minPrice={ 0 }
			maxPrice={ 1000 }
			currency={ {
				code: 'nzd',
				symbol: '$',
				thousandSeparator: ' ',
				decimalSeparator: '.',
				minorUnit: 2,
				prefix: '$',
				suffix: '',
			} }
		/>
	</div>
);

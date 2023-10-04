/**
 * External dependencies
 */
import { Disabled } from '@wordpress/components';
import FilterResetButton from '@woocommerce/base-components/filter-reset-button';

/**
 * Internal dependencies
 */
import { BlockProps } from './types';
import { PriceSlider } from './price-slider';

const Block = ( props: BlockProps ) => {
	return (
		<Disabled>
			<div className="controls">
				<PriceSlider { ...props } />
			</div>
			<div className="actions">
				<FilterResetButton onClick={ () => false } />
			</div>
		</Disabled>
	);
};

export default Block;

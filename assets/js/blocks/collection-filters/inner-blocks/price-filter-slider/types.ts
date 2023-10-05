/**
 * External dependencies
 */
import { BlockEditProps } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { PriceFilterState } from '../price-filter/types';

export type BlockAttributes = {
	showInputFields: boolean;
	inlineInput: boolean;
};

export type EditProps = BlockEditProps< BlockAttributes > & {
	context: {
		filterData: Partial< PriceFilterState >;
	};
};

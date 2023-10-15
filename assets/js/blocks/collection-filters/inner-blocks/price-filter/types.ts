/**
 * External dependencies
 */
import { BlockEditProps } from '@wordpress/blocks';
import { PriceFilterState } from '@woocommerce/blocks/collection-filters/types';

export type BlockAttributes = {
	showInputFields: boolean;
	inlineInput: boolean;
};

export interface EditProps extends BlockEditProps< BlockAttributes > {
	context: {
		filterData: Partial< PriceFilterState >;
	};
}

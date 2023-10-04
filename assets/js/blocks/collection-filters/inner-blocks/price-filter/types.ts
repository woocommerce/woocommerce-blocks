/**
 * External dependencies
 */
import { HTMLElementEvent } from '@woocommerce/types';
import { BlockEditProps } from '@wordpress/blocks';

export interface PriceFilterState {
	filters: {
		minPrice: number;
		maxPrice: number;
		minRange: number;
		maxRange: number;
		rangeStyle: string;
		isMinActive: boolean;
		isMaxActive: boolean;
	};
}

export interface InputActionProps {
	state: PriceFilterState;
	event: HTMLElementEvent< HTMLInputElement >;
}

export interface BlockAttributes {
	showInputFields: boolean;
	inlineInput: boolean;
}

export type EditProps = BlockEditProps< BlockAttributes >;

export type BlockProps = Partial< PriceFilterState[ 'filters' ] > &
	BlockAttributes & {
		displayedMinPrice: string;
		displayedMaxPrice: string;
	};

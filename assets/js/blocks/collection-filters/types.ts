/**
 * External dependencies
 */
import { HTMLElementEvent } from '@woocommerce/types';

export type PriceFilterState = {
	minPrice: number;
	maxPrice: number;
	minRange: number;
	maxRange: number;
	formattedMinPrice: string;
	formattedMaxPrice: string;
};

export type StateProps = {
	state: {
		filters: PriceFilterState;
	};
};

export interface ActionProps extends StateProps {
	event: HTMLElementEvent< HTMLInputElement >;
}

export type BlockAttributes = {
	filterData: Partial< PriceFilterState >;
};

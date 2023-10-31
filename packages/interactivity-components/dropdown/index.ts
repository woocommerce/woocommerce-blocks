/**
 * External dependencies
 */
import { store as interactivityStore } from '@woocommerce/interactivity';

// TODO - import scss

type Context = {
	woocommerceDropdown: {
		selectedItem: {
			label: string;
			value: string;
		};
		isOpen: boolean;
	};
};

type Store = {
	context: Context;
	// @ts-ignore
	selectors: any;
	ref: HTMLElement;
};

interactivityStore( {
	state: {
		woocommerceDropdown: {
			selectedItem: {
				label: '',
				value: '',
			},
			isOpen: false,
		},
	},
	selectors: {
		woocommerceDropdown: {
			isSelected: ( { state, context } ) => {
				const { value } = context;

				return state.woocommerceDropdown.selectedItem.value === value;
			},
		},
	},
	actions: {
		woocommerceDropdown: {
			toggleIsOpen: ( store: Store ) => {
				const {
					context: { woocommerceDropdown },
				} = store;

				woocommerceDropdown.isOpen = ! woocommerceDropdown.isOpen;
			},
			selectStockStatus: ( { state, context } ) => {
				const { label, value } = context;
				state.woocommerceDropdown.selectedItem.label = label;
				state.woocommerceDropdown.selectedItem.value = value;
			},
		},
	},
} );

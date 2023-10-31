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
	actions: {
		woocommerceDropdown: {
			toggleIsOpen: ( store: Store ) => {
				const {
					context: { woocommerceDropdown },
				} = store;

				woocommerceDropdown.isOpen = ! woocommerceDropdown.isOpen;
			},
		},
	},
} );

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
	selectors: {
		woocommerceDropdown: {
			isSelected: ( { context } ) => {
				const { value } = context;

				return context.woocommerceDropdown.selectedItem.value === value;
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
			selectStockStatus: ( { context } ) => {
				const { label, value } = context;

				context.woocommerceDropdown.selectedItem = { label, value };
			},
			addHoverClass: ( { ref } ) => {
				ref.classList.add( 'is-selected' );
			},
			removeHoverClass: ( { ref, context } ) => {
				if (
					context.value !==
					context.woocommerceDropdown.selectedItem.value
				) {
					ref.classList.remove( 'is-selected' );
				}
			},
		},
	},
} );

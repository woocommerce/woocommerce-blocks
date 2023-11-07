/**
 * External dependencies
 */
import { store as interactivityStore } from '@woocommerce/interactivity';

// TODO - import scss

export type DropdownContext = {
	woocommerceDropdown: {
		currentItem: {
			label: string;
			value: string;
		};
		selectedItem: {
			label: string | null;
			value: string | null;
		};
		hoveredItem: {
			label: string | null;
			value: string | null;
		};
		isOpen: boolean;
	};
};

type Store = {
	context: DropdownContext;
	selectors: unknown;
	ref: HTMLElement;
};

interactivityStore( {
	state: {},
	selectors: {
		woocommerceDropdown: {
			isSelected: ( { context }: { context: DropdownContext } ) => {
				const {
					woocommerceDropdown: {
						currentItem: { value },
					},
				} = context;

				return (
					context.woocommerceDropdown.selectedItem.value === value ||
					context.woocommerceDropdown.hoveredItem.value === value
				);
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
			selectDropdownItem: ( {
				context,
			}: {
				context: DropdownContext;
			} ) => {
				const {
					woocommerceDropdown: {
						currentItem: { label, value },
					},
				} = context;

				context.woocommerceDropdown.selectedItem = { label, value };
			},
			addHoverClass: ( { context }: { context: DropdownContext } ) => {
				const {
					woocommerceDropdown: {
						currentItem: { label, value },
					},
				} = context;

				context.woocommerceDropdown.hoveredItem = { label, value };
			},
			removeHoverClass: ( { context }: { context: DropdownContext } ) => {
				context.woocommerceDropdown.hoveredItem = {
					label: null,
					value: null,
				};
			},
		},
	},
} );

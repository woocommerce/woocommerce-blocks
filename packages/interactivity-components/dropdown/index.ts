/**
 * External dependencies
 */
import { store as interactivityStore } from '@woocommerce/interactivity';

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

interactivityStore( {
	state: {},
	selectors: {
		woocommerceDropdown: {
			placeholderText: ( { context }: { context: DropdownContext } ) => {
				const {
					woocommerceDropdown: { selectedItem },
				} = context;

				return selectedItem.label || 'Select an option';
			},
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
			toggleIsOpen: ( { context }: { context: DropdownContext } ) => {
				context.woocommerceDropdown.isOpen =
					! context.woocommerceDropdown.isOpen;
			},
			selectDropdownItem: ( {
				context,
				event,
			}: {
				context: DropdownContext;
				event: MouseEvent;
			} ) => {
				const {
					woocommerceDropdown: {
						currentItem: { label, value },
					},
				} = context;

				const { selectedItem } = context.woocommerceDropdown;

				if (
					selectedItem.value === value &&
					selectedItem.label === label
				) {
					context.woocommerceDropdown.selectedItem = {
						label: null,
						value: null,
					};
				} else {
					context.woocommerceDropdown.selectedItem = { label, value };
				}

				context.woocommerceDropdown.isOpen = false;

				event.stopPropagation();
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

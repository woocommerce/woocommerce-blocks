/**
 * External dependencies
 */
import { store as interactivityStore } from '@woocommerce/interactivity';
import { arrayDifferenceBy } from '../../../assets/js/utils';

export type DropdownContext = {
	woocommerceDropdown: {
		currentItem: {
			label: string;
			value: string;
		};
		selectedItems: {
			label: string | null;
			value: string | null;
		}[];
		hoveredItem: {
			label: string | null;
			value: string | null;
		};
		isOpen: boolean;
		isMultiSelect: boolean;
	};
};

interactivityStore( 'wc-dropdown', {
	state: {},
	selectors: {
		woocommerceDropdown: {
			placeholderText: ( { context }: { context: DropdownContext } ) => {
				const {
					woocommerceDropdown: { selectedItems },
				} = context;

				// @TODO - What should we render for multiple selected items?
				return selectedItems[ 0 ].label || 'Select an option';
			},
			isSelected: ( { context }: { context: DropdownContext } ) => {
				const {
					woocommerceDropdown: {
						currentItem: { value },
					},
				} = context;

				const isHovered =
					context.woocommerceDropdown.hoveredItem.value === value;
				const isSelected =
					context.woocommerceDropdown.selectedItems.some(
						( item ) => item.value === value
					);

				return isHovered || isSelected;
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

				const { selectedItems } = context.woocommerceDropdown;

				const currentItemIsSelected = selectedItems.some( ( item ) => {
					return item.value === value && item.label === label;
				} );

				if ( currentItemIsSelected ) {
					// deselect it from the array
					context.woocommerceDropdown.selectedItems =
						arrayDifferenceBy(
							selectedItems,
							[ { label, value } ],
							'value'
						);
				} else {
					// add it to the array
					context.woocommerceDropdown.selectedItems = [
						...selectedItems,
						{ label, value },
					];
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

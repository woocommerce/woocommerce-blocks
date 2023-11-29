/**
 * External dependencies
 */
import { store } from '@woocommerce/interactivity';

/**
 * Internal dependencies
 */
import './style.scss';

export type CheckboxListContext = {
	// currentItem: {
	// 	label: string;
	// 	value: string;
	// };
	// selectedItem: {
	// 	label: string | null;
	// 	value: string | null;
	// };
	// hoveredItem: {
	// 	label: string | null;
	// 	value: string | null;
	// };
	// isOpen: boolean;
};

store( 'woocommerce/interactivity-checkbox-list', {
	state: {},
	selectors: {
		placeholderText: () => {
			// const context = getContext< CheckboxListContext >();
			// const { selectedItem } = context;
			// return selectedItem.label || 'Select an option';
		},
		isSelected: () => {
			// const context = getContext< CheckboxListContext >();
			// const {
			// 	currentItem: { value },
			// } = context;
			// return (
			// 	context.selectedItem.value === value ||
			// 	context.hoveredItem.value === value
			// );
		},
	},
	actions: {
		selectCheckboxItem: () => {
			// const context = getContext< CheckboxListContext >();
			// const {
			// 	currentItem: { label, value },
			// } = context;
			// const { selectedItem } = context;
			// if (
			// 	selectedItem.value === value &&
			// 	selectedItem.label === label
			// ) {
			// 	context.selectedItem = {
			// 		label: null,
			// 		value: null,
			// 	};
			// } else {
			// 	context.selectedItem = { label, value };
			// }
			// context.isOpen = false;
			// event.stopPropagation();
		},
	},
} );

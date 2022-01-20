/**
 * External dependencies
 */

import { Callback } from 'downshift';
import { MouseEventHandler, RefObject } from 'react';

export interface DropdownSelectorProps {
	attributeLabel?: string;
	checked?: string[];
	className?: string;
	inputLabel?: string;
	isDisabled?: boolean;
	isLoading?: boolean;
	limit?: number;
	multiple?: boolean;
	onChange?: ( selectedItem: string | null ) => void;
	options?: Array< { label: React.ReactNode; value: string } >;
}

export interface DropdownSelectorInputProps {
	checked?: string[];
	getInputProps: () => null;
	inputRef: RefObject< HTMLDivElement >;
	isDisabled: boolean;
	onFocus: ( val: Callback | undefined ) => void;
	onRemoveItem: ( val: string | null ) => void;
	placeholder: string | null;
	tabIndex: string;
	value: string | null;
}

export interface DropdownSelectorInputWrapperProps {
	children: React.ReactNode | React.ReactNode[];
	onClick: MouseEventHandler;
}

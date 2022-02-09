/**
 * External dependencies
 */
import type { ReactElement } from 'react';

export interface RadioControlProps {
	// Class name for control.
	className?: string | undefined;
	// ID for the control.
	id?: string;
	// Selected should be passed if using this as a controlled component.
	selected?: string | undefined;
	// For uncontrolled components, this sets the default checked option.
	defaultChecked?: string | undefined;
	// Fired when an option is changed.
	onChange: ( value: string ) => void;
	// List of radio control options.
	options: RadioControlOption[];
}

export interface RadioControlOptionProps {
	checked?: boolean | undefined;
	defaultChecked?: boolean | undefined;
	name?: string;
	onChange: ( value: string ) => void;
	option: RadioControlOption;
}

export interface RadioControlOption {
	value: string;
	label: string;
	description?: string | ReactElement | undefined;
	secondaryLabel?: string | ReactElement | undefined;
	secondaryDescription?: string | undefined;
	onChange?: ( value: string ) => void;
}

export interface RadioControlOptionLayout {
	id?: string;
	label: string;
	description?: string | ReactElement | undefined;
	secondaryLabel?: string | ReactElement | undefined;
	secondaryDescription?: string | undefined;
	onChange?: ( value: string ) => void;
}

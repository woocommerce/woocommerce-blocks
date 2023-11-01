/**
 * External dependencies
 */
import type { StoryFn, Meta } from '@storybook/react';

/**
 * Internal dependencies
 */
import CheckboxList, { CheckboxListProps } from '..';

export default {
	title: 'External Components/CheckboxList',
	component: CheckboxList,
	args: {
		options: [
			{
				label: <span>Check me</span>,
				value: 'option-1',
			},
			{
				label: <span>Check me too</span>,
				value: 'option-2',
			},
			{
				label: <span>Check me three</span>,
				value: 'option-3',
			},
		],
	},
	argTypes: {
		options: {
			description: 'A list of options to display as checkboxes.',
			control: 'object',
		},
		onChange: {
			description:
				'Function called when an option is checked or unchecked.',
			disable: true,
		},
		className: {
			description:
				'Additional class name to give to the list of checkboxes',
			control: 'text',
		},
		checked: {
			description:
				'An array of option IDs which should be checked initially',
			control: 'array',
		},
		isLoading: {
			description: 'Whether the list of checkboxes is loading',
			control: 'boolean',
		},
		isDisabled: {
			description: 'Whether the list of checkboxes is disabled',
			control: 'boolean',
		},
		limit: {
			description:
				'Number of options to display before truncating the list',
			control: 'number',
		},
	},
} as Meta< CheckboxListProps >;

const Template: StoryFn< CheckboxListProps > = ( args ) => (
	<CheckboxList { ...args } />
);

export const Default = Template.bind( {} );
Default.args = {};

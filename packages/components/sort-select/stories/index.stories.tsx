/**
 * External dependencies
 */
import type { Meta, StoryFn } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

/**
 * Internal dependencies
 */
import SortSelect, { type SortSelectProps } from '..';

export default {
	title: 'Checkout Components/SortSelect',
	component: SortSelect,
	argTypes: {},
} as Meta< SortSelectProps >;

const Template: StoryFn< SortSelectProps > = ( args ) => {
	const [ { value }, updateArgs ] = useArgs();
	return (
		<SortSelect
			{ ...args }
			value={ value }
			onChange={ ( e ) => {
				updateArgs( { value: e.target.value } );
			} }
		/>
	);
};

export const Default = Template.bind( {} );
Default.args = {
	label: 'Choose one of the options',
	options: [
		{
			key: 'apple',
			label: '🍏 Apple',
		},
		{
			key: 'banana',
			label: '🍌 Banana',
		},
		{
			key: 'orange',
			label: '🍊 Orange',
		},
		{
			key: 'pear',
			label: '🍐 Pear',
		},
		{
			key: 'pineapple',
			label: '🍍 Pineapple',
		},
		{
			key: 'strawberry',
			label: '🍓 Strawberry',
		},
		{
			key: 'watermelon',
			label: '🍉 Watermelon',
		},
	],
	screenReaderLabel: 'Invisible text that is read by a screen-reader.',
	value: 'apple',
	readOnly: false,
};

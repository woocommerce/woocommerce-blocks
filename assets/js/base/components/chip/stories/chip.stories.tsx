/**
 * External dependencies
 */
import { Story, Meta } from '@storybook/react';

/**
 * Internal dependencies
 */
import Chip, { ChipProps } from '../chip';
const availableElements = [ 'li', 'div', 'span' ];
const availableRadius = [ 'none', 'small', 'medium', 'large' ];

export default {
	title: 'WooCommerce Blocks/@base-components/Chip',
	component: Chip,
	argTypes: {
		element: {
			control: 'select',
			options: availableElements,
		},
		className: {
			control: 'text',
		},
		radius: {
			control: 'select',
			options: availableRadius,
		},
		children: {
			control: 'text',
		},
	},
} as Meta< ChipProps >;

const Template: Story< ChipProps > = ( args ) => <Chip { ...args } />;

export const Default = Template.bind( {} );
Default.args = {
	text: 'Take me to the casino!',
	element: 'li',
	screenReaderText: "I'm a chip, me",
};

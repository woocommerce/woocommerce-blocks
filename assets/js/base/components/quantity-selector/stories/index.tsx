/**
 * External dependencies
 */
import { Story, Meta } from '@storybook/react';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import QuantitySelector, { QuantitySelectorProps } from '..';

export default {
	title: 'WooCommerce Blocks/@base-components/QuantitySelector',
	component: QuantitySelector,
	args: {
		itemName: 'widgets',
	},
	argTypes: {
		quantity: { control: { disable: true } },
	},
} as Meta< QuantitySelectorProps >;

const Template: Story< QuantitySelectorProps > = ( args ) => {
	const [ quantity, setQuantity ] = useState( 1 );

	const onChange = ( newVal: number ) => {
		args.onChange?.( newVal );
		setQuantity( newVal );
	};

	return (
		<QuantitySelector
			{ ...args }
			quantity={ quantity }
			onChange={ onChange }
		/>
	);
};

export const Default = Template.bind( {} );
Default.args = {};

export const Disabled = Template.bind( {} );
Disabled.args = {
	disabled: true,
};

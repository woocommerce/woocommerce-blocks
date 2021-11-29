/**
 * External dependencies
 */
import { Story, Meta } from '@storybook/react';
import { Currency } from '@woocommerce/types';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import PriceSlider, { PriceSliderProps } from '..';

const NZD: Currency = {
	code: 'nzd',
	symbol: '$',
	thousandSeparator: ' ',
	decimalSeparator: '.',
	minorUnit: 2,
	prefix: '$',
	suffix: '',
};

export default {
	title: 'WooCommerce Blocks/@base-components/PriceSlider',
	component: PriceSlider,
	args: {
		currency: NZD,
		maxPrice: 5000,
		maxConstraint: 5000,
		minConstraint: 1000,
		minPrice: 1000,
		step: 250,
	},
	argTypes: {
		maxPrice: { control: { disable: true } },
		minPrice: { control: { disable: true } },
	},
} as Meta< PriceSliderProps >;

const Template: Story< PriceSliderProps > = ( args ) => {
	const { maxPrice, minPrice, ...props } = args;
	// PriceSlider expects client to update min & max price, i.e. is a controlled component
	const [ min, setMin ] = useState( minPrice );
	const [ max, setMax ] = useState( maxPrice );

	return (
		<PriceSlider
			{ ...props }
			maxPrice={ max }
			minPrice={ min }
			onChange={ ( [ newMin, newMax ] ) => {
				setMin( newMin );
				setMax( newMax );
			} }
		/>
	);
};

export const Default = Template.bind( {} );

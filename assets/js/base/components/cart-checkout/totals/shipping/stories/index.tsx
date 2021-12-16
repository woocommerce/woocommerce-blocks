/**
 * External dependencies
 */
import { Story, Meta } from '@storybook/react';
import { currencyControl } from '@woocommerce/storybook-controls';

/**
 * Internal dependencies
 */
import Shipping, { TotalShippingProps } from '..';

export default {
	title: 'WooCommerce Blocks/Checkout Blocks/Shipping',
	component: Shipping,
	argTypes: {
		currency: currencyControl,
	},
	args: {
		values: {
			total_shipping: '1000',
			total_shipping_tax: '200',
		},
	},
} as Meta< TotalShippingProps >;

const Template: Story< TotalShippingProps > = ( args ) => (
	<Shipping { ...args } />
);

export const Default = Template.bind( {} );
Default.args = {};

// @todo Revise Storybook entry for `TotalsShipping` component

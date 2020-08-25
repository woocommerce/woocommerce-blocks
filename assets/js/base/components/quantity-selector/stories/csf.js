/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import QuantitySelector from '../';

export default {
	title: 'WooCommerce Blocks/@base-components/QuantitySelector',
	component: QuantitySelector,
};

const Template = ( args ) => <QuantitySelector { ...args } />;

export const Primary = Template.bind( {} );
Primary.args = {
	disabled: false,
	quantity: 1,
	itemName: 'widgets',
};
// Primary.argTypes = {
// 	disabled: { control: { type: 'boolean' } },
// };

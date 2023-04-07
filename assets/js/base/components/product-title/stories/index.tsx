/**
 * External dependencies
 */
import type { Story, Meta } from '@storybook/react';

/**
 * Internal dependencies
 */
import ProductTitle, { ProductTitleProps } from '..';

export default {
	title: 'WooCommerce Blocks/@base-components/ProductTitle',
	component: ProductTitle,
	args: {
		headingLevel: 2,
		showProductLink: true,
		product: {
			id: 1,
			name: 'Test Product',
			permalink: '#',
		},
	},
} as Meta< ProductTitleProps >;

const Template: Story< ProductTitleProps > = ( args ) => (
	<ProductTitle { ...args } />
);

export const Default = Template.bind( {} );
Default.args = {};

export const WithoutProductLink = Template.bind( {} );
WithoutProductLink.args = {
	showProductLink: false,
};

export const WithCustomClassName = Template.bind( {} );
WithCustomClassName.args = {
	className: 'custom-class-name',
};

export const WithHeadingLevel3 = Template.bind( {} );
WithHeadingLevel3.args = {
	headingLevel: 3,
};

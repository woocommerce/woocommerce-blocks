/**
 * External dependencies
 */
import { text } from '@storybook/addon-knobs';

/**
 * Internal dependencies
 */
import Subtotal from '../';
import currencyKnob from '../../../../../../../../storybook/currency-knob.js';

export default {
	title: 'WooCommerce Blocks/@base-components/cart-checkout/totals/Subtotal',
	component: Subtotal,
};

export const Default = () => {
	const currency = currencyKnob();
	const totalItems = text( 'Total items', '1000' );
	const totalItemsTax = text( 'Total items tax', '200' );

	return (
		<Subtotal
			currency={ currency }
			values={ {
				total_items: totalItems,
				total_items_tax: totalItemsTax,
			} }
		/>
	);
};

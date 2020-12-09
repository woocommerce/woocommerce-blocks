/**
 * External dependencies
 */
import { text } from '@storybook/addon-knobs';

/**
 * Internal dependencies
 */
import TotalsTaxes from '../';
import currencyKnob from '../../../../../../../../storybook/currency-knob.js';

export default {
	title:
		'WooCommerce Blocks/@base-components/cart-checkout/totals/TotalsTaxes',
	component: TotalsTaxes,
};

export const Default = () => {
	const currency = currencyKnob();
	const totalTaxes = text( 'Total taxes', '1000' );

	return (
		<TotalsTaxes
			currency={ currency }
			values={ {
				total_tax: totalTaxes,
			} }
		/>
	);
};

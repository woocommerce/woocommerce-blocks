/**
 * External dependencies
 */
import { text } from '@storybook/addon-knobs';

/**
 * Internal dependencies
 */
import TotalsFees from '../';
import currencyKnob from '../../../../../../../../storybook/currency-knob.js';

export default {
	title:
		'WooCommerce Blocks/@base-components/cart-checkout/totals/TotalsFees',
	component: TotalsFees,
};

export const Default = () => {
	const currency = currencyKnob();
	const totalFees = text( 'Total fees', '1000' );
	const totalFeesTax = text( 'Total fees tax', '200' );

	return (
		<TotalsFees
			currency={ currency }
			values={ {
				total_fees: totalFees,
				total_fees_tax: totalFeesTax,
			} }
		/>
	);
};

/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import formStepAttributes from '../../form-step/attributes';

export default {
	...formStepAttributes( {
		defaultTitle: __( 'Shipping address', 'woo-gutenberg-products-block' ),
		defaultDescription: __(
			'Enter the address where you want your order delivered.',
			'woo-gutenberg-products-block'
		),
	} ),
	showCompanyField: {
		type: 'boolean',
		default: false,
	},
	requireCompanyField: {
		type: 'boolean',
		default: false,
	},
	allowCreateAccount: {
		type: 'boolean',
		default: false,
	},
	showApartmentField: {
		type: 'boolean',
		default: true,
	},
	showPhoneField: {
		type: 'boolean',
		default: true,
	},
	requirePhoneField: {
		type: 'boolean',
		default: false,
	},
};

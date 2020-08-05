/**
 * External dependencies
 */
import { HAS_DARK_STYLES } from '@woocommerce/block-settings';

const blockAttributes = {
	isPreview: {
		type: 'boolean',
		default: false,
		save: false,
	},
	showCompanyField: {
		type: 'boolean',
		default: false,
	},
	requireCompanyField: {
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
	showOrderNotes: {
		type: 'boolean',
		default: true,
	},
	showPolicyLinks: {
		type: 'boolean',
		default: true,
	},
	showReturnToCart: {
		type: 'boolean',
		default: true,
	},
	cartPageId: {
		type: 'number',
		default: 0,
	},
	darkInputs: {
		type: 'boolean',
		default: HAS_DARK_STYLES,
	},
};

export default blockAttributes;

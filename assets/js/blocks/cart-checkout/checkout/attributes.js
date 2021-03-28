/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { HAS_DARK_EDITOR_STYLE_SUPPORT } from '@woocommerce/block-settings';
import { getSetting } from '@woocommerce/settings';

const termsAndConditionsTextFromDb = getSetting( 'termsAndConditionsText' );
let defaultTermsAndConditionsText = termsAndConditionsTextFromDb;

if ( ! termsAndConditionsTextFromDb ) {
	defaultTermsAndConditionsText = __(
		'I have read and agree to the website [terms].',
		'woocommerce'
	);
}

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
	hasDarkControls: {
		type: 'boolean',
		default: HAS_DARK_EDITOR_STYLE_SUPPORT,
	},
	requireTermsAndConditions: {
		type: 'boolean',
		default: false,
	},
	termsAndConditionsText: {
		type: 'string',
		// translators: [terms] is the link to the Terms and Conditions page.
		default: defaultTermsAndConditionsText,
	},
};

export default blockAttributes;

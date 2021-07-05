/**
 * External dependencies
 */
import {
	PRIVACY_URL,
	TERMS_URL,
	PRIVACY_PAGE_NAME,
	TERMS_PAGE_NAME,
} from '@woocommerce/block-settings';

export const termsConsentDefaultText = `By proceeding with your purchase you agree to our ${
	TERMS_URL
		? `<a href="${ TERMS_URL }">
			${ TERMS_PAGE_NAME || 'Terms and Conditions' }
		</a>`
		: 'Terms and Conditions'
} and ${
	PRIVACY_URL
		? `<a href="${ PRIVACY_URL }">
			${ PRIVACY_PAGE_NAME || 'Privacy Policy.' }
		</a>`
		: 'Privacy Policy.'
}`;

export const termsCheckboxDefaultText = `You must agree to our ${
	TERMS_URL
		? `<a href="${ TERMS_URL }">
			${ TERMS_PAGE_NAME || 'Terms and Conditions' }
		</a>`
		: 'Terms and Conditions'
} and ${
	PRIVACY_URL
		? `<a href="${ PRIVACY_URL }">
			${ PRIVACY_PAGE_NAME || 'Privacy Policy' }
		</a>`
		: 'Privacy Policy'
} to continue with your purchase`;

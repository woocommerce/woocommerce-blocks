/**
 * External dependencies
 */
import { findLabelWithText } from '@woocommerce/blocks-test-utils';

expect.extend( {
	async toToggleRequiredAttrOf( requiredCheckboxText, selector ) {
		if ( ! selector ) {
			return {
				message: () =>
					`a selector is required to test element's visibility`,
				pass: false,
			};
		}

		let isRequired = await page.$eval( selector, ( e ) => e.required );

		if ( isRequired ) {
			return {
				message: () =>
					`input is set to required before clicking the checkbox (${ requiredCheckboxText })`,
				pass: false,
			};
		}

		const checkboxLabel = await findLabelWithText( requiredCheckboxText );
		await checkboxLabel.click();

		isRequired = await page.$eval( selector, ( e ) => e.required );

		if ( ! isRequired ) {
			return {
				message: () =>
					`input is not set to required after clicking the checkbox (${ requiredCheckboxText })`,
				pass: false,
			};
		}

		return {
			message: () =>
				`input required attribute reacted to checkbox changes.`,
			pass: true,
		};
	},
} );

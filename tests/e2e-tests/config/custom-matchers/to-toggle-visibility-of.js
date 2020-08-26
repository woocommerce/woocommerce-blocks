/**
 * External dependencies
 */
import { findLabelWithText } from '@woocommerce/blocks-test-utils';

expect.extend( {
	async toToggleVisibilityOf( toggleText, selector ) {
		if ( ! selector ) {
			return {
				message: () =>
					`a selector is required to test element's visibility`,
				pass: false,
			};
		}
		const isElementVisible = async () => !! ( await page.$( selector ) );
		const isElementInitiallyVisible = await isElementVisible();
		const toggleLabel = await findLabelWithText( toggleText );

		if ( ! toggleLabel ) {
			return {
				message: () =>
					`no label could be found with text ${ toggleText }`,
				pass: false,
			};
		}

		await toggleLabel.click();

		if ( isElementInitiallyVisible && ( await isElementVisible() ) ) {
			return {
				message: () =>
					`element matching selector '${ selector }' found but none was expected after one click.`,
				pass: false,
			};
		} else if (
			! isElementInitiallyVisible &&
			! ( await isElementVisible() )
		) {
			return {
				message: () =>
					`element matching selector '${ selector }' not found but at least one was expected after one click.`,
				pass: false,
			};
		}

		await toggleLabel.click();

		if ( isElementInitiallyVisible && ! ( await isElementVisible() ) ) {
			return {
				message: () =>
					`element matching selector '${ selector }' not found but at least one was expected after two clicks.`,
				pass: false,
			};
		} else if (
			! isElementInitiallyVisible &&
			( await isElementVisible() )
		) {
			return {
				message: () =>
					`element matching selector '${ selector }' found but none was expected after two clicks.`,
				pass: false,
			};
		}

		return {
			message: () => `element visibility reacted to toggle changes.`,
			pass: true,
		};
	},
} );

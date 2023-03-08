/**
 * External dependencies
 */
import { merchant as wcMerchant } from '@woocommerce/e2e-utils';
import { visitAdminPage } from '@wordpress/e2e-test-utils';
import { findLabelWithText } from '@woocommerce/blocks-test-utils';

export const merchant = {
	...wcMerchant,
	changeLanguage: async ( language ) => {
		await visitAdminPage( 'options-general.php' );
		await page.select( 'select#WPLANG', language );
		await page.click( 'input[type="submit"]' );
		await page.waitForSelector( '#setting-error-settings_updated', {
			visible: true,
		} );
	},
	goToLocalPickupSettingsPage: async () => {
		await visitAdminPage(
			'admin.php',
			'page=wc-settings&tab=shipping&section=pickup_location'
		);
		await page.waitForSelector(
			'#wc-shipping-method-pickup-location-settings-container'
		);
	},
	saveLocalPickupSettingsPageWithRefresh: async () => {
		await expect( page ).toClick( 'button', {
			text: 'Save changes',
		} );
		await expect( page ).toMatchElement( '.components-snackbar__content', {
			text: 'Local Pickup settings have been saved.',
		} );
		await merchant.goToLocalPickupSettingsPage();
	},
	enableLocalPickup: async () => {
		const enabledLabel = await findLabelWithText( 'Enable local pickup' );
		const enabledChecked = await page.$eval(
			'#inspector-checkbox-control-1',
			( el ) => ( el as HTMLInputElement ).checked
		);
		if ( ! enabledChecked ) {
			await enabledLabel.click();
		}

		await expect( page ).toFill(
			'input[name="local_pickup_title"]',
			'Local Pickup'
		);
	},
	disableLocalPickup: async () => {
		const enabledLabel = await findLabelWithText( 'Enable local pickup' );
		const enabledChecked = await page.$eval(
			'#inspector-checkbox-control-1',
			( el ) => ( el as HTMLInputElement ).checked
		);
		if ( ! enabledChecked ) {
			await enabledLabel.click();
		}
	},
	removeCostForLocalPickup: async () => {
		const costLabel = await findLabelWithText(
			'Add a price for customers who choose local pickup'
		);
		const costChecked = await page.$eval(
			'#inspector-checkbox-control-1',
			( el ) => ( el as HTMLInputElement ).checked
		);
		if ( costChecked ) {
			await costLabel.click();
		}
	},
};

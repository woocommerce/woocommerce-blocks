<?php
namespace Automattic\WooCommerce\Blocks;

use Automattic\WooCommerce\Admin\Notes\Note;
use Automattic\WooCommerce\Admin\Notes\Notes;

/**
 * A class used to display inbox messages to merchants in the WooCommerce Admin dashboard.
 *
 * @package Automattic\WooCommerce\Blocks
 * @since x.x.x
 */
class InboxNotifications {

	const SURFACE_CART_CHECKOUT_NOTE_NAME          = 'surface_cart_checkout';
	const SURFACE_CART_CHECKOUT_PROBABILITY_OPTION = 'wc_blocks_surface_cart_checkout_probability';
	const PERCENT_USERS_TO_TARGET                  = 10;
	const INELIGIBLE_EXTENSIONS                    = [
		'automatewoo',
		'mailchimp-for-woocommerce',
		'mailpoet',
		// phpcs:ignore Squiz.PHP.CommentedOutCode.Found
		// 'woocommerce-gutenberg-products-block', // Disallow the notification if the store is using the feature plugin already.
		'woocommerce-bookings',
		'woocommerce-box-office',
		'woocommerce-cart-add-ons',
		'woocommerce-checkout-add-ons',
		'woocommerce-conditional-shipping-and-payments',
		'woocommerce-eu-vat-number',
		'woocommerce-gateway-amazon-payments-advanced',
		'woocommerce-memberships',
		'woocommerce-points-and-rewards',
		'woocommerce-pre-orders',
		'woocommerce-product-bundles',
		'woocommerce-shipping-fedex',
		'woocommerce-smart-coupons',
	];
	const ELIGIBLE_COUNTRIES                       = [
		'GB',
		'US',
	];

	/**
	 * Creates a notification letting merchants know about the Cart and Checkout Blocks.
	 */
	public static function create_surface_cart_checkout_blocks_notification() {
		// If this is the feature plugin, then we don't need to do this. This should only show when Blocks is bundled
		// with WooCommerce Core.
		if ( false && Package::feature()->is_feature_plugin_build() ) {
			return;
		}

		// Pick a random number between 1 and 100 and add this to the wp_options table. This can then be used to target
		// a percentage of users.
		$existing_probability = get_option( self::SURFACE_CART_CHECKOUT_PROBABILITY_OPTION );
		if ( false === $existing_probability ) {
			$existing_probability = wp_rand( 0, 100 );
			add_option( self::SURFACE_CART_CHECKOUT_PROBABILITY_OPTION, $existing_probability );
		}
		if ( ! class_exists( 'Automattic\WooCommerce\Admin\Notes\WC_Admin_Notes' ) ) {
			return;
		}

		if ( ! class_exists( 'WC_Data_Store' ) ) {
			return;
		}

		$data_store = \WC_Data_Store::load( 'admin-note' );
		$note_ids   = $data_store->get_notes_with_name( self::SURFACE_CART_CHECKOUT_NOTE_NAME );
		foreach ( (array) $note_ids as $note_id ) {
			$note         = Notes::get_note( $note_id );
			$content_data = $note->get_content_data();

			// Return now because the note already exists.
			if ( property_exists( $content_data, 'getting_started' ) ) {
				return;
			}
		}

		// Calculate store's eligibility to be shown the notice, starting with whether they have any plugins we know to
		// be incompatible with Blocks.
		foreach ( self::INELIGIBLE_EXTENSIONS as $extension ) {
			if ( is_plugin_active( $extension . '/' . $extension . '.php' ) ) {
				return;
			}
		}

		// Next check the store is located in one of the eligible countries.
		$raw_country = get_option( 'woocommerce_default_country' );
		$country     = explode( ':', $raw_country )[0];
		if ( ! in_array( $country, self::ELIGIBLE_COUNTRIES, true ) ) {
			return;
		}

		// Finally, check if the store's generated % chance is below the % of users we want to surface this to.
		if ( $existing_probability > self::PERCENT_USERS_TO_TARGET ) {
			return;
		}

		// At this point, the store meets all the criteria to be shown the notice! Woo!
		$note = new Note();
		$note->set_date_created( time() );
		$note->set_title(
			__(
				'Introducing the Cart and Checkout blocks!',
				'woo-gutenberg-products-block'
			)
		);
		$note->set_content(
			__(
				"Increase your store's revenue with the conversion optimized Cart & Checkout WooCommerce blocks available in the WooCommerce Blocks extension.",
				'woo-gutenberg-products-block'
			)
		);
		$note->set_content_data(
			(object) array(
				'getting_started' => true,
			)
		);
		$note->set_type( Note::E_WC_ADMIN_NOTE_INFORMATIONAL );
		$note->set_source( 'woo-gutenberg-products-block' );
		$note->set_name( self::SURFACE_CART_CHECKOUT_NOTE_NAME );
		$note->add_action(
			'learn_more',
			'Learn More',
			'https://woocommerce.com/woocommerce-checkout'
		);
		$note->save();

	}
}

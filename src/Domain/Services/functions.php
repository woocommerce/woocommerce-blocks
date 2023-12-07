<?php

use Automattic\WooCommerce\Blocks\Package;

if ( ! function_exists( 'woocommerce_blocks_register_checkout_field' ) && Package::feature()->is_experimental_build() ) {

	/**
	 * Register a checkout field.
	 *
	 * @param array $options Field arguments.
	 * @throws Exception If field registration fails.
	 */
	function woocommerce_blocks_register_checkout_field( $options ) {
		$checkout_fields = Package::container()->get( \Automattic\WooCommerce\Blocks\Domain\Services\CheckoutFields::class );
		$result          = $checkout_fields->register_checkout_field( $options );
		if ( is_wp_error( $result ) ) {
			throw new Exception( $result->get_error_message() );
		}
	}
}

/**
 * Example code to register a checkout field.
 */
woocommerce_blocks_register_checkout_field(
	array(
		'id'             => 'plugin/dialling-code',
		'label'          => __( 'Dialling code', 'woo-gutenberg-products-block' ),
		'optionalLabel'  => __( 'Dialling code (optional)', 'woo-gutenberg-products-block' ),
		'required'       => false,
		'hidden'         => true,
		'autocomplete'   => 'dialling-code',
		'autocapitalize' => 'characters',
		'location'       => 'address',
	)
);

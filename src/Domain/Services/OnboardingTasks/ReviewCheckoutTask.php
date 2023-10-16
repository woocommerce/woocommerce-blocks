<?php

namespace Automattic\WooCommerce\Blocks\Domain\Services\OnboardingTasks;

use Automattic\WooCommerce\Admin\Features\OnboardingTasks\Task;

/**
 * Review the cart/checkout Task
 */
class ReviewCheckoutTask extends Task {
	/**
	 * ID.
	 *
	 * @return string
	 */
	public function get_id() {
		return 'review-checkout-experience';
	}

	/**
	 * Title.
	 *
	 * @return string
	 */
	public function get_title() {
		return __( 'Review the shopper checkout experience', 'woo-gutenberg-products-block' );
	}

	/**
	 * Content.
	 *
	 * @return string
	 */
	public function get_content() {
		return __( 'Make sure cart and checkout flows are configured correctly for your shoppers.', 'woo-gutenberg-products-block' );
	}

	/**
	 * Time.
	 *
	 * @return string
	 */
	public function get_time() {
		return '';
	}

	/**
	 * Check if a task is dismissable.
	 *
	 * @return bool
	 */
	public function is_dismissable() {
		return false;
	}

	/**
	 * Task completion.
	 *
	 * @return bool
	 */
	public function is_complete() {
		return false;
	}

	/**
	 * Task visibility.
	 *
	 * @return bool
	 */
	public function can_view() {
		$checkout_page_id = wc_get_page_id( 'checkout' );

		return $checkout_page_id > 0;
	}

	/**
	 * Action URL.
	 *
	 * @return string
	 */
	public function get_action_url() {
		$checkout_page_id = wc_get_page_id( 'checkout' );

		return admin_url( 'site-editor.php?postType=page&postId=' . $checkout_page_id );
	}
}

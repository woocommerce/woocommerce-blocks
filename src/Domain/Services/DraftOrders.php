<?php
/**
 * Sets up all logic related to the Checkout Draft Orders service
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\Domain\Services;

use Automattic\WooCommerce\Blocks\Domain\Package;

/**
 * Service class for adding DraftOrder functionality to WooCommerce core.
 */
class DraftOrders {

	/**
	 * Holds the Package instance
	 *
	 * @var Package
	 */
	private $package;

	/**
	 * Constructor
	 *
	 * @param Package $package An instance of the package class.
	 */
	public function __construct( Package $package ) {
		$this->package = $package;
	}

	/**
	 * Set all hooks related to adding Checkout Draft order functionality to Woo Core.
	 */
	public function init() {
		if ( $this->package->is_feature_plugin_build() ) {
			add_filter( 'wc_order_statuses', [ __CLASS__, 'register_draft_order_status' ] );
			add_filter( 'woocommerce_register_shop_order_post_statuses', [ __CLASS__, 'register_draft_order_post_status' ] );
			add_filter( 'woocommerce_valid_order_statuses_for_payment', [ __CLASS__, 'append_draft_order_post_status' ] );
			add_action( 'woocommerce_cleanup_draft_orders', [ __CLASS__, 'delete_expired_draft_orders' ] );
			add_action( 'admin_init', [ $this, 'install' ] );
		} else {
			// Maybe remove existing cronjob if present because it shouldn't be needed in the environment.
			$this->maybe_remove_cronjobs();
		}
	}

	/**
	 * Installation related logic for Draft order functionality.
	 */
	public function install() {
		$this->maybe_create_cronjobs();
	}


	/**
	 * Remove cronjobs if they exist (but only from admin).
	 */
	protected function maybe_remove_cronjobs() {
		if ( ! is_admin() ) {
			return;
		}
		if ( function_exists( 'as_next_scheduled_action' ) && true === as_next_scheduled_action( 'woocommerce_cleanup_draft_orders' ) ) {
			as_unschedule_all_actions( 'woocommerce_cleanup_draft_orders' );
		}
	}

	/**
	 * Maybe create cron events.
	 */
	protected function maybe_create_cronjobs() {
		if ( function_exists( 'as_next_scheduled_action' ) && false === as_next_scheduled_action( 'woocommerce_cleanup_draft_orders' ) ) {
			as_schedule_recurring_action( strtotime( 'midnight tonight' ), DAY_IN_SECONDS, 'woocommerce_cleanup_draft_orders' );
		}
	}


	/**
	 * Register custom order status for orders created via the API during checkout.
	 *
	 * Draft order status is used before payment is attempted, during checkout, when a cart is converted to an order.
	 *
	 * @param array $statuses Array of statuses.
	 * @return array
	 */
	public static function register_draft_order_status( array $statuses ) {
		$statuses['wc-checkout-draft'] = _x( 'Draft', 'Order status', 'woo-gutenberg-products-block' );
		return $statuses;
	}

	/**
	 * Register custom order post status for orders created via the API during checkout.
	 *
	 * @param array $statuses Array of statuses.
	 * @return array
	 */
	public static function register_draft_order_post_status( array $statuses ) {
		$statuses['wc-checkout-draft'] = [
			'label'                     => _x( 'Draft', 'Order status', 'woo-gutenberg-products-block' ),
			'public'                    => false,
			'exclude_from_search'       => false,
			'show_in_admin_all_list'    => false,
			'show_in_admin_status_list' => true,
			/* translators: %s: number of orders */
			'label_count'               => _n_noop( 'Drafts <span class="count">(%s)</span>', 'Drafts <span class="count">(%s)</span>', 'woo-gutenberg-products-block' ),
		];
		return $statuses;
	}

	/**
	 * Append draft status to a list of statuses.
	 *
	 * @param array $statuses Array of statuses.
	 * @return array
	 */
	public static function append_draft_order_post_status( $statuses ) {
		$statuses[] = 'checkout-draft';
		return $statuses;
	}

	/**
	 * Delete draft orders older than a day in batches of 20.
	 *
	 * Ran on a daily cron schedule.
	 */
	public static function delete_expired_draft_orders() {
		$count      = 0;
		$batch_size = 20;
		$orders     = wc_get_orders(
			[
				'date_modified' => '<=' . strtotime( '-1 DAY' ),
				'limit'         => $batch_size,
				'status'        => 'wc-checkout-draft',
				'type'          => 'shop_order',
			]
		);

		if ( $orders ) {
			foreach ( $orders as $order ) {
				$order->delete( true );
				$count ++;
			}
		}

		if ( $batch_size === $count && function_exists( 'as_enqueue_async_action' ) ) {
			as_enqueue_async_action( 'woocommerce_cleanup_draft_orders' );
		}
	}

}

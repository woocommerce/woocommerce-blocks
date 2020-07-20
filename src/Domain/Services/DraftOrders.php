<?php
/**
 * Sets up all logic related to the Checkout Draft Orders service
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks\Domain\Services;

use Automattic\WooCommerce\Blocks\Domain\Package;
use Exception;
use WC_Order;

/**
 * Service class for adding DraftOrder functionality to WooCommerce core.
 */
class DraftOrders {

	const DB_STATUS = 'wc-checkout-draft';
	const STATUS    = 'checkout-draft';

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
			add_filter( 'wc_order_statuses', [ $this, 'register_draft_order_status' ] );
			add_filter( 'woocommerce_register_shop_order_post_statuses', [ $this, 'register_draft_order_post_status' ] );
			add_filter( 'woocommerce_valid_order_statuses_for_payment', [ $this, 'append_draft_order_post_status' ] );
			add_action( 'woocommerce_cleanup_draft_orders', [ $this, 'delete_expired_draft_orders' ] );
			add_action( 'admin_init', [ $this, 'install' ] );
		} else {
			// Maybe remove existing cronjob if present because it shouldn't be needed in the environment.
			add_action( 'admin_init', [ $this, 'uninstall' ] );
		}
	}

	/**
	 * Installation related logic for Draft order functionality.
	 *
	 * @internal
	 */
	public function install() {
		$this->maybe_create_cronjobs();
	}

	/**
	 * Remove cronjobs if they exist (but only from admin).
	 *
	 * @internal
	 */
	public function uninstall() {
		$this->maybe_remove_cronjobs();
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
	 * Unschedule cron jobs that are present.
	 */
	protected function maybe_remove_cronjobs() {
		if ( function_exists( 'as_next_scheduled_action' ) && as_next_scheduled_action( 'woocommerce_cleanup_draft_orders' ) ) {
			as_unschedule_all_actions( 'woocommerce_cleanup_draft_orders' );
		}
	}

	/**
	 * Register custom order status for orders created via the API during checkout.
	 *
	 * Draft order status is used before payment is attempted, during checkout, when a cart is converted to an order.
	 *
	 * @param array $statuses Array of statuses.
	 * @internal
	 * @return array
	 */
	public function register_draft_order_status( array $statuses ) {
		$statuses[ self::DB_STATUS ] = _x( 'Draft', 'Order status', 'woo-gutenberg-products-block' );
		return $statuses;
	}

	/**
	 * Register custom order post status for orders created via the API during checkout.
	 *
	 * @param array $statuses Array of statuses.
	 * @internal

	 * @return array
	 */
	public function register_draft_order_post_status( array $statuses ) {
		$statuses[ self::DB_STATUS ] = [
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
	 * @internal

	 * @return array
	 */
	public function append_draft_order_post_status( $statuses ) {
		$statuses[] = self::STATUS;
		return $statuses;
	}

	/**
	 * Delete draft orders older than a day in batches of 20.
	 *
	 * Ran on a daily cron schedule.
	 *
	 * @internal
	 */
	public function delete_expired_draft_orders() {
		$count      = 0;
		$batch_size = 20;
		$orders     = wc_get_orders(
			[
				'date_modified' => '<=' . strtotime( '-1 DAY' ),
				'limit'         => $batch_size,
				'status'        => self::DB_STATUS,
				'type'          => 'shop_order',
			]
		);

		// do we bail because the query results are unexpected?
		try {
			$this->assert_order_results( $orders, $batch_size );
			if ( $orders ) {
				foreach ( $orders as $order ) {
					$order->delete( true );
					$count ++;
				}
			}
			if ( $batch_size === $count && function_exists( 'as_enqueue_async_action' ) ) {
				as_enqueue_async_action( 'woocommerce_cleanup_draft_orders' );
			}
		} catch ( Exception $error ) {
			wc_caught_exception( $error, __METHOD__ );
		}
	}

	/**
	 * Asserts whether incoming order results are expected given the query
	 * this service class executes.
	 *
	 * @param WC_Order[] $order_results The order results being asserted.
	 * @param int        $expected_batch_size The expected batch size for the results.
	 * @throws Exception If any assertions fail, an exception is thrown.
	 */
	private function assert_order_results( $order_results, $expected_batch_size ) {
		// if not an array, then just return because it won't get handled
		// anyways.
		if ( ! is_array( $order_results ) ) {
			return;
		}

		$suffix = ' This is an indicator that something is filtering WooCommerce or WordPress queries and modifying the query parameters.';

		// if count is greater than our expected batch size, then that's a problem.
		if ( count( $order_results ) > 20 ) {
			throw new Exception( 'There are an unexpected number of results returned from the query.' . $suffix );
		}

		// if any of the returned orders are not draft (or not a WC_Order), then that's a problem.
		foreach ( $order_results as $order ) {
			if ( ! ( $order instanceof WC_Order ) ) {
				throw new Exception( 'The returned results contain a value that is not a WC_Order.' . $suffix );
			}
			if ( ! $order->has_status( self::STATUS ) ) {
				throw new Exception( 'The results contain an order that is not a `wc-checkout-draft` status in the results.' . $suffix );
			}
		}
	}
}

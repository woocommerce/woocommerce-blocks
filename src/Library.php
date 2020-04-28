<?php
/**
 * Initializes blocks in WordPress.
 *
 * @package WooCommerce/Blocks
 */

namespace Automattic\WooCommerce\Blocks;

defined( 'ABSPATH' ) || exit;

/**
 * Library class.
 */
class Library {

	/**
	 * Initialize block library features.
	 */
	public static function init() {
		add_action( 'init', array( __CLASS__, 'register_blocks' ) );
		add_action( 'init', array( __CLASS__, 'define_tables' ) );
		add_action( 'init', array( __CLASS__, 'maybe_create_tables' ) );
		add_action( 'init', array( __CLASS__, 'maybe_create_cronjobs' ) );
		add_filter( 'wc_order_statuses', array( __CLASS__, 'register_draft_order_status' ) );
		add_filter( 'woocommerce_register_shop_order_post_statuses', array( __CLASS__, 'register_draft_order_post_status' ) );
		add_filter( 'woocommerce_valid_order_statuses_for_payment', array( __CLASS__, 'append_draft_order_post_status' ) );
		add_action( 'woocommerce_cleanup_draft_orders', array( __CLASS__, 'delete_expired_draft_orders' ) );
	}

	/**
	 * Register custom tables within $wpdb object.
	 */
	public static function define_tables() {
		global $wpdb;

		// List of tables without prefixes.
		$tables = array(
			'wc_reserved_stock' => 'wc_reserved_stock',
		);

		foreach ( $tables as $name => $table ) {
			$wpdb->$name    = $wpdb->prefix . $table;
			$wpdb->tables[] = $table;
		}
	}

	/**
	 * Set up the database tables which the plugin needs to function.
	 */
	public static function maybe_create_tables() {
		global $wpdb;

		$schema_version    = 260;
		$db_schema_version = (int) get_option( 'wc_blocks_db_schema_version', 0 );

		if ( $db_schema_version > $schema_version ) {
			return;
		}

		$show_errors = $wpdb->hide_errors();
		$table_name  = $wpdb->prefix . 'wc_reserved_stock';
		$collate     = $wpdb->has_cap( 'collation' ) ? $wpdb->get_charset_collate() : '';
		$exists      = self::maybe_create_table(
			$wpdb->prefix . 'wc_reserved_stock',
			"
			CREATE TABLE {$wpdb->prefix}wc_reserved_stock (
				`order_id` bigint(20) NOT NULL,
				`product_id` bigint(20) NOT NULL,
				`stock_quantity` double NOT NULL DEFAULT 0,
				`timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
				`expires` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
				PRIMARY KEY  (`order_id`, `product_id`)
			) $collate;
			"
		);

		if ( $show_errors ) {
			$wpdb->show_errors();
		}

		if ( ! $exists ) {
			return self::add_create_table_notice( $table_name );
		}

		// Update succeeded. This is only updated when successful and validated.
		// $schema_version should be incremented when changes to schema are made within this method.
		update_option( 'wc_blocks_db_schema_version', $schema_version );
	}

	/**
	 * Create database table, if it doesn't already exist.
	 *
	 * Based on admin/install-helper.php maybe_create_table function.
	 *
	 * @param string $table_name Database table name.
	 * @param string $create_sql Create database table SQL.
	 * @return bool False on error, true if already exists or success.
	 */
	protected static function maybe_create_table( $table_name, $create_sql ) {
		global $wpdb;

		if ( in_array( $table_name, $wpdb->get_col( 'SHOW TABLES', 0 ), true ) ) {
			return true;
		}

		$wpdb->query( $create_sql ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared

		return in_array( $table_name, $wpdb->get_col( 'SHOW TABLES', 0 ), true );
	}

	/**
	 * Add a notice if table creation fails.
	 *
	 * @param string $table_name Name of the missing table.
	 */
	protected static function add_create_table_notice( $table_name ) {
		add_action(
			'admin_notices',
			function() use ( $table_name ) {
				echo '<div class="error"><p>';
				printf(
					/* Translators: %1$s table name, %2$s database user, %3$s database name. */
					esc_html__( 'WooCommerce %1$s table creation failed. Does the %2$s user have CREATE privileges on the %3$s database?', 'woo-gutenberg-products-block' ),
					'<code>' . esc_html( $table_name ) . '</code>',
					'<code>' . esc_html( DB_USER ) . '</code>',
					'<code>' . esc_html( DB_NAME ) . '</code>'
				);
				echo '</p></div>';
			}
		);
	}

	/**
	 * Maybe create cron events.
	 */
	public static function maybe_create_cronjobs() {
		if ( function_exists( 'as_next_scheduled_action' ) && false === as_next_scheduled_action( 'woocommerce_cleanup_draft_orders' ) ) {
			as_schedule_recurring_action( strtotime( 'midnight tonight' ), DAY_IN_SECONDS, 'woocommerce_cleanup_draft_orders' );
		}
	}

	/**
	 * Register blocks, hooking up assets and render functions as needed.
	 */
	public static function register_blocks() {
		global $wp_version;
		$blocks = [
			'AllReviews',
			'FeaturedCategory',
			'FeaturedProduct',
			'HandpickedProducts',
			'ProductBestSellers',
			'ProductCategories',
			'ProductCategory',
			'ProductNew',
			'ProductOnSale',
			'ProductsByAttribute',
			'ProductTopRated',
			'ReviewsByProduct',
			'ReviewsByCategory',
			'ProductSearch',
			'ProductTag',
		];
		// @todo after refactoring dynamic block registration, this will be moved
		// to block level config.
		if ( version_compare( $wp_version, '5.2', '>' ) ) {
			$blocks[] = 'AllProducts';
			$blocks[] = 'PriceFilter';
			$blocks[] = 'AttributeFilter';
			$blocks[] = 'ActiveFilters';
			$blocks[] = 'Checkout';
			$blocks[] = 'Cart';
		}
		foreach ( $blocks as $class ) {
			$class    = __NAMESPACE__ . '\\BlockTypes\\' . $class;
			$instance = new $class();
			$instance->register_block_type();
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
	 * Delete draft orders older than a day.
	 *
	 * Ran on a daily cron schedule.
	 */
	public static function delete_expired_draft_orders() {
		global $wpdb;

		$wpdb->query(
			"
			DELETE posts, term_relationships, postmeta
			FROM $wpdb->posts posts
			LEFT JOIN $wpdb->term_relationships term_relationships ON ( posts.ID = term_relationships.object_id )
			LEFT JOIN $wpdb->postmeta postmeta ON ( posts.ID = postmeta.post_id )
			WHERE posts.post_status = 'wc-checkout-draft'
			AND posts.post_modified <= ( NOW() - INTERVAL 1 DAY )
			"
		);
	}
}

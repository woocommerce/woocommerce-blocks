<?php
namespace Automattic\WooCommerce\Blocks\Templates;

/**
 * CheckoutTemplate class.
 *
 * @internal
 */
class CheckoutTemplate {

	const SLUG = 'checkout';

	/**
	 * Constructor.
	 *
	 * Templates require block themes support, so this will only init if a block theme is active.
	 */
	public function __construct() {
		if ( ! wc_current_theme_is_fse_theme() ) {
			return;
		}
		$this->init();
	}

	/**
	 * Initialization method.
	 */
	protected function init() {
		add_action( 'init', array( $this, 'add_endpoint' ) );
		add_filter( 'pre_get_document_title', array( $this, 'endpoint_title' ) );
		add_filter( 'woocommerce_is_checkout', array( $this, 'is_checkout' ) );
		add_filter( 'woocommerce_settings_pages', array( $this, 'update_settings_page' ) );
		add_action( 'woocommerce_admin_field_endpoint', array( $this, 'input_field' ) );

		// Todo flushes for the rewrite endpoint. Need to happen when settings change and when the theme changes.
		add_action( 'after_switch_theme', 'flush_rewrite_rules' );
		add_action( 'update_option_woocommerce_checkout_pay_endpoint', 'flush_rewrite_rules' );

		add_filter( 'page_template_hierarchy', array( $this, 'update_page_template_hierarchy' ), 1 );
		add_filter( 'frontpage_template_hierarchy', array( $this, 'update_page_template_hierarchy' ), 1 );
		add_action( 'current_screen', array( $this, 'template_editor_redirect' ) );
		add_filter( 'woocommerce_blocks_template_content', array( $this, 'default_template_content' ), 10, 3 );
	}

	/**
	 * Add a query var for the checkout. This will allow to to detect when the user is viewing the checkout.
	 *
	 * @todo setting to control `checkout`
	 */
	public function add_endpoint() {
		if ( wc_get_page_id( 'checkout' ) ) {
			$default_endpoint = get_post( wc_get_page_id( 'checkout' ) )->post_name ?: __( 'checkout', 'woo-gutenberg-products-block' );
		} else {
			$default_endpoint = __( 'checkout', 'woo-gutenberg-products-block' );
		}
		$endpoint   = get_option( 'woocommerce_checkout_page_endpoint', $default_endpoint );
		$query_vars = WC()->query->get_query_vars();

		add_rewrite_endpoint( $endpoint . '/' . $query_vars['order-received'], \EP_ROOT, $query_vars['order-received'] );
		add_rewrite_endpoint( $endpoint . '/' . $query_vars['order-pay'], \EP_ROOT, $query_vars['order-pay'] );
		add_rewrite_endpoint( $endpoint, \EP_ROOT, 'checkout' );
	}

	/**
	 * Returns true when the endpoint is showing.
	 *
	 * @return boolean
	 */
	protected function is_endpoint() {
		global $wp;
		return isset( $wp->query_vars['checkout'] );
	}

	/**
	 * Filters the page title when the endpoint is active.
	 *
	 * @param string $title Page title.
	 * @return string
	 */
	public function endpoint_title( $title ) {
		if ( $this->is_endpoint() ) {
			return __( 'Checkout', 'woo-gutenberg-products-block' );
		}
		return $title;
	}

	/**
	 * Filters the `is_checkout` function so we can return true when the endpoint is active.
	 *
	 * @param boolean $return True when on the checkout page.
	 * @return boolean
	 */
	public function is_checkout( $return ) {
		if ( $this->is_endpoint() ) {
			return true;
		}
		return $return;
	}

	public function update_settings_page( $settings ) {
		foreach ( $settings as $key => $setting ) {
			if ( 'woocommerce_checkout_page_id' === $setting['id'] ) {
				if ( wc_get_page_id( 'checkout' ) ) {
					$default = get_post( wc_get_page_id( 'checkout' ) )->post_name ?: __( 'checkout', 'woo-gutenberg-products-block' );
				} else {
					$default = __( 'checkout', 'woo-gutenberg-products-block' );
				}
				$settings[ $key ] = [
					'title'    => __( 'Checkout page', 'woo-gutenberg-products-block' ),
					'desc'     => __( 'Endpoint for the checkout page.', 'woo-gutenberg-products-block' ),
					'id'       => 'woocommerce_checkout_page_endpoint',
					'type'     => 'endpoint',
					'default'  => $default,
					'desc_tip' => true,
					'autoload' => false,
				];
			}
		}
		return $settings;
	}

	public function input_field( $value ) {
		$field_description = \WC_Admin_Settings::get_field_description( $value );
		$description       = $field_description['description'];
		$tooltip_html      = $field_description['tooltip_html'];
		?>
		<tr valign="top">
			<th scope="row" class="titledesc">
				<label for="<?php echo esc_attr( $value['id'] ); ?>"><?php echo esc_html( $value['title'] ); ?> <?php echo $tooltip_html; // WPCS: XSS ok. ?></label>
			</th>
			<td class="forminp forminp-text">
				<span class="code" style="width: 400px; display:flex; align-items:center; gap:10px;">
					<code class="permalink-custom" style="vertical-align: middle;">
						<?php echo esc_html( get_site_url( null, '/' ) ); ?>
					</code>
					<input
						name="<?php echo esc_attr( $value['field_name'] ); ?>"
						id="<?php echo esc_attr( $value['id'] ); ?>"
						type="text"
						style="vertical-align: middle;"
						value="<?php echo esc_attr( $value['value'] ); ?>"
						class="<?php echo esc_attr( $value['class'] ); ?>"
						placeholder="<?php echo esc_attr( $value['placeholder'] ); ?>"
						/><?php echo esc_html( $value['suffix'] ); ?> <?php echo $description; // WPCS: XSS ok. ?>
					</span>
			</td>
		</tr>
		<?php
	}

	/**
	 * When the page is displaying the checkout and a block theme is active, render the Checkout Template.
	 *
	 * This places the template name e.g. `checkout`, at the beginning of the template hierarchy array. The hook priority
	 * is 1 to ensure it runs first; other consumers e.g. extensions, could therefore inject their own template instead
	 * of this one when using the default priority of 10.
	 *
	 * @param array $templates Templates that match the pages_template_hierarchy.
	 */
	public function update_page_template_hierarchy( $templates ) {
		if ( is_checkout() ) {
			array_unshift( $templates, self::SLUG );
		}
		return $templates;
	}

	/**
	 * Redirect a page to the template editor if it's the checkout page and a block theme is active.
	 *
	 * @param \WP_Screen $current_screen Current screen information.
	 */
	public function template_editor_redirect( \WP_Screen $current_screen ) {
		$page_id      = wc_get_page_id( 'checkout' );
		$edit_page_id = 'page' === $current_screen->id && ! empty( $_GET['post'] ) ? absint( $_GET['post'] ) : 0; // phpcs:ignore WordPress.Security.NonceVerification.Recommended

		if ( $edit_page_id === $page_id ) {
			wp_safe_redirect( admin_url( 'site-editor.php?postType=wp_template&postId=woocommerce%2Fwoocommerce%2F%2Fcheckout' ) );
			exit;
		}
	}

	/**
	 * Migrates an existing page using blocks to the block templates.
	 *
	 * @param string $template_content The content of the template.
	 * @param object $template_file The template file object.
	 * @param string $template_type The type of template.
	 * @return string
	 */
	public function default_template_content( $template_content, $template_file, $template_type ) {
		if ( self::SLUG !== $template_file->slug ) {
			return $template_content;
		}

		$page_id = wc_get_page_id( 'checkout' );
		$page    = $page_id ? get_post( $page_id ) : false;

		if ( $page && ! empty( $page->post_content ) ) {
			$template_content = '
				<!-- wp:group {"layout":{"inherit":true}} -->
				<div class="wp-block-group">
					<!-- wp:heading {"level":1} -->
					<h1 class="wp-block-heading">' . wp_kses_post( $page->post_title ) . '</h1>
					<!-- /wp:heading -->
					' . wp_kses_post( $page->post_content ) . '
				</div>
				<!-- /wp:group -->
			';
		}

		return $template_content;
	}
}

<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

use Automattic\WooCommerce\Blocks\Package;
use Automattic\WooCommerce\Blocks\Assets;
use Automattic\WooCommerce\Blocks\Assets\AssetDataRegistry;
use Automattic\WooCommerce\Blocks\StoreApi\Utilities\CartController;

/**
 * MiniCart class.
 *
 * @internal
 */
class MiniCart extends AbstractBlock {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'mini-cart';

	/**
	 * Array of scripts that will be lazy loaded when interacting with the block.
	 *
	 * @var string[]
	 */
	protected $scripts_to_lazy_load = array();

	/**
	 * Get the editor script handle for this block type.
	 *
	 * @param string $key Data to get, or default to everything.
	 * @return array|string;
	 */
	protected function get_block_type_editor_script( $key = null ) {
		$script = [
			'handle'       => 'wc-' . $this->block_name . '-block',
			'path'         => $this->asset_api->get_block_asset_build_path( $this->block_name ),
			'dependencies' => [ 'wc-blocks' ],
		];
		return $key ? $script[ $key ] : $script;
	}

	/**
	 * Get the frontend script handle for this block type.
	 *
	 * @see $this->register_block_type()
	 * @param string $key Data to get, or default to everything.
	 * @return array|string
	 */
	protected function get_block_type_script( $key = null ) {
		$script = [
			'handle'       => 'wc-' . $this->block_name . '-block-frontend',
			'path'         => $this->asset_api->get_block_asset_build_path( $this->block_name . '-frontend' ),
			'dependencies' => [],
		];
		return $key ? $script[ $key ] : $script;
	}

	/**
	 * Extra data passed through from server to client for block.
	 *
	 * @param array $attributes  Any attributes that currently are available from the block.
	 *                           Note, this will be empty in the editor context when the block is
	 *                           not in the post content on editor load.
	 */
	protected function enqueue_data( array $attributes = [] ) {
		parent::enqueue_data( $attributes );

		// Hydrate the following data depending on admin or frontend context.
		if ( ! is_admin() && ! WC()->is_rest_api_request() ) {
			$this->hydrate_from_api();
		}

		$script_data = $this->asset_api->get_script_data( 'build/mini-cart-component-frontend.js' );

		$num_dependencies = count( $script_data['dependencies'] );
		$wp_scripts       = wp_scripts();

		for ( $i = 0; $i < $num_dependencies; $i++ ) {
			$dependency = $script_data['dependencies'][ $i ];

			foreach ( $wp_scripts->registered as $script ) {
				if ( $script->handle === $dependency ) {
					$this->append_script_and_deps_src( $script );
					break;
				}
			}
		}

		$this->scripts_to_lazy_load['wc-blocks-mini-cart-component-frontend'] = array(
			'src'     => $script_data['src'],
			'version' => $script_data['version'],
		);

		$this->asset_data_registry->add(
			'mini_cart_block_frontend_dependencies',
			$this->scripts_to_lazy_load,
			true
		);

		do_action( 'woocommerce_blocks_cart_enqueue_data' );
	}

	/**
	 * Hydrate the cart block with data from the API.
	 */
	protected function hydrate_from_api() {
		$this->asset_data_registry->hydrate_api_request( '/wc/store/cart' );
	}

	/**
	 * Returns the script data given its handle.
	 *
	 * @param string $handle Handle of the script.
	 *
	 * @return array Array containing the script data.
	 */
	protected function get_script_from_handle( $handle ) {
		$wp_scripts = wp_scripts();
		foreach ( $wp_scripts->registered as $script ) {
			if ( $script->handle === $handle ) {
				return $script;
			}
		}

		return '';
	}

	/**
	 * Recursively appends a scripts and its dependencies into the
	 * scripts_to_lazy_load array.
	 *
	 * @param string $script Array containing script data.
	 */
	protected function append_script_and_deps_src( $script ) {
		$wp_scripts = wp_scripts();
		// This script and its dependencies have already been appended.
		if ( array_key_exists( $script->handle, $this->scripts_to_lazy_load ) ) {
			return;
		}

		if ( count( $script->deps ) > 0 ) {
			foreach ( $script->deps as $dep ) {
				if ( ! array_key_exists( $dep, $this->scripts_to_lazy_load ) ) {
					$dep_script = $this->get_script_from_handle( $dep );
					$this->append_script_and_deps_src( $dep_script );
				}
			}
		}
		$this->scripts_to_lazy_load[ $script->handle ] = array(
			'src'          => $script->src,
			'version'      => $script->ver,
			'before'       => $wp_scripts->print_inline_script( $script->handle, 'before', false ),
			'after'        => $wp_scripts->print_inline_script( $script->handle, 'after', false ),
			'translations' => $wp_scripts->print_translations( $script->handle, false ),
		);
	}

	/**
	 * Append frontend scripts when rendering the MiniCart block.
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content    Block content.
	 * @return string Rendered block type output.
	 */
	protected function render( $attributes, $content ) {
		return $this->inject_html_data_attributes( $content . $this->get_markup(), $attributes );
	}

	/**
	 * Render the markup for the MiniCart block.
	 *
	 * @return string The HTML markup.
	 */
	protected function get_markup() {
		if ( is_admin() ) {
			// In the editor we will display the placeholder, so no need to load
			// real cart data and to print the markup.
			return '';
		}
		$cart_controller     = new CartController();
		$cart                = $cart_controller->get_cart_instance();
		$cart_contents_count = $cart->get_cart_contents_count();
		$cart_contents       = $cart->get_cart();

		// Force mobile styles.
		return '<div class="wc-blocks-mini-cart is-mobile">
			<button class="wc-blocks-mini-cart-button">' .
				sprintf(
					/* translators: %d is the number of products in the cart. */
					_n(
						'%d product',
						'%d products',
						$cart_contents_count,
						'woo-gutenberg-products-block'
					),
					$cart_contents_count
				) . '</button>
			<div class="wc-blocks-mini-cart-contents" hidden>' . $this->get_cart_contents_markup( $cart_contents ) . '</div>
		</div>';
	}

	/**
	 * Render the markup of the Cart contents.
	 *
	 * @param array $cart_contents Array of contents in the cart.
	 *
	 * @return string The HTML markup.
	 */
	protected function get_cart_contents_markup( $cart_contents ) {
		if ( count( $cart_contents ) > 0 ) {
			return '<table class="wc-block-cart-items">
				<thead>
					<tr class="wc-block-cart-items__header">
						<th class="wc-block-cart-items__header-image"><span>' . __( 'Product', 'woo-gutenberg-products-block' ) . '</span></th>
						<th class="wc-block-cart-items__header-product"><span>' . __( 'Details', 'woo-gutenberg-products-block' ) . '</span></th>
						<th class="wc-block-cart-items__header-total"><span>' . __( 'Total', 'woo-gutenberg-products-block' ) . '</span></th>
					</tr>
				</thead>
				<tbody>' . implode( array_map( array( $this, 'get_cart_item_markup' ), $cart_contents ) ) . '</tbody>
			</table>';
		}

		return __( 'Cart is empty', 'woo-gutenberg-products-block' );
	}

	/**
	 * Render the markup of a Cart item.
	 *
	 * @param array $cart_item Item in the cart.
	 *
	 * @return string The HTML markup.
	 */
	protected function get_cart_item_markup( $cart_item ) {
		$cart_controller = new CartController();
		$cart            = $cart_controller->get_cart_instance();

		return '<tr class="wc-block-cart-items__row">
			<td class="wc-block-cart-item__image" aria-hidden="true">
				<a href="' . esc_url( $cart_item['data']->get_permalink() ) . '" tabindex="-1"><img src="' . esc_url( wp_get_attachment_image_url( $cart_item['data']->get_image_id(), 'woocommerce_thumbnail' ) ) . '" alt=""></a>
			</td>
			<td class="wc-block-cart-item__product"><a class="wc-block-components-product-name" href="' . esc_url( $cart_item['data']->get_permalink() ) . '">' . wp_kses_post( $cart_item['data']->get_title() ) . '</a>
				<div class="wc-block-cart-item__prices"><span class="price wc-block-components-product-price">' . $cart->get_product_price( $cart_item['data'] ) . '</span>
				</div>
				<div class="wc-block-components-product-metadata">
					<div class="wc-block-components-product-metadata__description"><p>' . wp_kses_post( $cart_item['data']->get_short_description() ) . '</p></div>
				</div>
				<div class="wc-block-cart-item__quantity">
					<div class="wc-block-components-quantity-selector"><input disabled class="wc-block-components-quantity-selector__input" type="number" step="1" min="0" value="' . esc_attr( $cart_item['quantity'] ) . '"><button disabled aria-label="' . esc_attr__( 'Reduce quantity', 'woo-gutenberg-products-block' ) . '" class="wc-block-components-quantity-selector__button wc-block-components-quantity-selector__button--minus">－</button><button disabled aria-label="' . esc_attr__( 'Increase quantity', 'woo-gutenberg-products-block' ) . '" class="wc-block-components-quantity-selector__button wc-block-components-quantity-selector__button--plus">＋</button></div><button disabled class="wc-block-cart-item__remove-link">' . esc_attr__( 'Remove item', 'woo-gutenberg-products-block' ) . '</button></div>
			</td>
			<td class="wc-block-cart-item__total">
				<div class="wc-block-cart-item__total-price-and-sale-badge-wrapper"><span class="price wc-block-components-product-price"><span class="wc-block-formatted-money-amount wc-block-components-formatted-money-amount wc-block-components-product-price__value">' . $cart->get_product_subtotal( $cart_item['data'], $cart_item['quantity'] ) . '</span></span>
				</div>
			</td>
		</tr>';
	}
}
